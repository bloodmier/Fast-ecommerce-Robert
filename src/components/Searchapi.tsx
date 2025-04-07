import SearchIcon from "@mui/icons-material/Search";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Searchdropdownbox } from "./Searchdropdownbox";
import { SerchapiGoogle } from "../service/Searchservice";
import { Igoogleitem, IgoogleSearch } from "../models/Igoogleitem";
import { useProducts } from "../hooks/useProducts";
import { IProduct } from "../models/Iproduct";
import { Loading } from "./Loading";
export const Searchapi = () => {
  const [searchinput, setSearchinput] = useState<string>("");
  const [searchItems, setSearchItems] = useState<Igoogleitem[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { products } = useProducts();
  const [isloading, setIsloading] = useState<boolean>(false);
  const rightproducts: IProduct[] = searchItems.map((i) => {
      const apicode = extractCode(i.title);
      const matchedproduct = products.find((p) => {
        return apicode ? p.name.includes(apicode) : null;
      });
      return matchedproduct || null;
    }).filter((p) => p !== null);

  

  useEffect(() => {
    if (!searchinput || searchinput.trim().length === 0) {
      setSearchDropdown(false);
    }
  }, [searchinput]);

  const extractCode = (text: string) => {
    if (text.toLowerCase().includes("milwaukee")) {
      const match = text.match(/M\d{2}\s[A-Z]+-\d+/);
      return match ? match[0] : null;
    } else {
      const match = text.match(/[A-Z0-9-]{3,}/);
      return match ? match[0] : null;
    }
  };


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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div style={{ position: "absolute", right: "100px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          width: "fit-content",
          height: "fit-content",
          margin: "0",
          padding: "0",
        }}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder={isFocused ? "Type to Search..." : ""}
          autoComplete="true"
          value={searchinput}
          style={{
            position: "absolute",
            right: "0",
            zIndex: "1001",
            height: isFocused ? "30px" : "0px",
            width: isFocused ? "300px" : "0px",
            border: "none",
            padding: "10px",
            fontSize: "18px",
            letterSpacing: "2px",
            outline: "none",
            borderRadius: !isFocused ? "0px" : "25px",
            transition: "all .5s ease-in-out",
            backgroundColor: !isFocused ? "transparent" : "white",
            paddingRight: "40px",
            color: "#000000",
            borderBottom: isFocused ? "1px solid rgba(255,255,255,.5)" : "none",
          }}
          onChange={(e) => setSearchinput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        />

        <button
          type="button"
          ref={buttonRef}
          style={{
            zIndex: "1002",
            width: "50px",
            height: "50px",
            borderStyle: "none",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            borderRadius: "50%",
            position: "absolute",
            right: "6px",
            color: "#000000",
            backgroundColor: "transparent",
          }}
          onClick={handleclick}
        >
          {!isloading ? <SearchIcon
            sx={{
              transition:
                "background-color 0.3s ease-in, background-color 0.5s ease-out",

              fontSize: "2.3rem",
              color: isFocused ? "black" : "var(--surface-color)",
              backgroundColor: isFocused
                ? "var(--accent-color)"
                : "transparent",
              borderRadius: "50%",
              padding: "5px",
              margin: "1px",
            }}
          /> : <Loading/> }
        </button>

        <Searchdropdownbox
          onClick={handleNoresults}
          isOpen={searchDropdown}
          onClose={() => (setSearchDropdown(false), setSearchItems([]))}
          rightproducts={rightproducts}
        ></Searchdropdownbox>
      </div>
    </div>
  );
};
