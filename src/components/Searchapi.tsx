import SearchIcon from "@mui/icons-material/Search";
import { useRef, useState } from "react";
import { Searchdropdownbox } from "./Searchdropdownbox";
import { SerchapiGoogle } from "../service/Searchservice";
import { Igoogleitem, IgoogleSearch } from "../models/Igoogleitem";
import { useProducts } from "../hooks/useProducts";
import { IProduct } from "../models/Iproduct";
import { Box, InputBase, IconButton } from "@mui/material";
export const Searchapi = () => {
  const [searchinput, setSearchinput] = useState<string>("");
  const [searchItems, setSearchItems] = useState<Igoogleitem[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { products } = useProducts();
  const [isloading, setIsloading] = useState<boolean>(false);

  const extractCode = (text: string) => {
    if (text.toLowerCase().includes("milwaukee")) {
      const match = text.match(/M\d{2}\s[A-Z]+-\d+/);
      return match ? match[0] : null;
    } else {
      const match = text.match(/[A-Z0-9-]{3,}/);
      return match ? match[0] : null;
    }
  };

  const rightproducts: IProduct[] = searchItems
    .map((i) => {
      const apicode = extractCode(i.title);
      const matchedproduct = products.find((p) => {
        return apicode ? p.name.includes(apicode) : null;
      });
      return matchedproduct || null;
    })
    .filter((p) => p !== null);

  const handleNoresults = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleclick = async () => {
    if (!isFocused) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      setIsFocused(true);
    } else {
      if (!searchinput || searchinput.trim().length === 0) {
        return;
      }

      let response: IgoogleSearch | undefined;
      setSearchDropdown(true);
      try {
        setIsloading(true);
        if (!searchinput || searchinput.trim().length <= 3) return;
        console.log("jag körs");

        response = await SerchapiGoogle<IgoogleSearch>(searchinput, 1);
        if (response) {
          setSearchItems(response.items || []);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Ett okänt fel inträffade");
        }
      } finally {
        if (
          response &&
          Array.isArray(response.items) &&
          response.items.length > 0
        ) {
          setSearchinput("");
        }
        setIsloading(false);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget === buttonRef.current) {
      return;
    }
    setIsFocused(false);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        right: { xs: "unset", sm: "100px" },
        left: { xs: "10px", sm: "unset" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          width: "fit-content",
          height: "fit-content",
          margin: 0,
          padding: 0,
        }}
        onBlur={handleBlur}
        onSubmit={(e) => e.preventDefault()}
      >
        <InputBase
          inputRef={inputRef}
          placeholder={isFocused ? "Type to Search..." : ""}
          value={searchinput}
          onChange={(e) => setSearchinput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          sx={{
            position: "absolute",
            right: { xs: "unset", sm: "0" },
            left: { xs: "10px", sm: "unset" },
            zIndex: 1001,
            height: isFocused ? "50px" : "0px",
            width: isFocused ? { xs: "280px", sm: "300px" } : "0px",
            border: "none",
            padding: "10px",
            fontSize: "18px",
            letterSpacing: "2px",
            outline: "none",
            borderRadius: isFocused ? "25px" : "0px",
            transition: "all 0.5s ease-in-out",
            backgroundColor: isFocused ? "white" : "transparent",
            color: "#000000",
            paddingRight: {xs:"10px",sm:"40px"},
            paddingLeft:{xs:"40px",sm:"10px"} ,
            borderBottom: isFocused ? "1px solid rgba(255,255,255,.5)" : "none",
          }}
        />
        <IconButton
          ref={buttonRef}
          onClick={handleclick}
          sx={{
            zIndex: 1002,
            width: "48px",
            height: "48px",
            borderStyle: "none",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            borderRadius: "50%",
            position: "absolute",
            right: { xs: "unset", sm: "2px" },
            left: { xs: "10px", sm: "unset" },
            transform: "translateY(-50%)", 
            top:"50%",

            backgroundColor: isFocused ? {xs:"transparent",sm:"var(--accent-color)"} : "transparent",
          }}
        >
            <SearchIcon
              sx={{
                transition: "background-color 0.3s ease-in, 0.5s ease-out",
                fontSize: "2.3rem",
                color: isFocused
                  ? "var(--muted-text-color)"
                  : "var(--surface-color)",
                
              }}
            />
        </IconButton>
        <Searchdropdownbox
          isLoading={isloading}
          onClick={handleNoresults}
          isOpen={searchDropdown}
          onClose={() => {
            setSearchDropdown(false);
            setSearchItems([]);
          }}
          products={rightproducts}
        />
      </Box>
    </Box>
  );
};
