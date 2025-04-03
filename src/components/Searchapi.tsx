import SearchIcon from "@mui/icons-material/Search";
import { FormEvent, useRef, useState } from "react";
import { Searchdropdownbox } from "./Searchdropdownbox";
export const Searchapi = () => {
  const [searchinput, setSearchinput] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);


  const handleclick = async () => {
    
    if (!isFocused) {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsFocused(true);
    
    console.log("jag clickas");
    
} else {
    setSearchDropdown(true)
    console.log("kalle");
    
}


  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
        e.relatedTarget === buttonRef.current
    ) {
      return;
    }
    setIsFocused(false); 
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
        inputRef.current.focus();
      }
    console.log("hej");
    
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
          style={{
            position:"absolute",
            right:"0",
            zIndex: "2",
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
            zIndex: "40",
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
          <SearchIcon
            sx={{
                transition: "background-color 0.3s ease-in, background-color 0.5s ease-out",

              fontSize: "2.3rem",
              color: isFocused ? "black" : "var(--surface-color)",
              backgroundColor: isFocused ? "var(--accent-color)" : "transparent",
              borderRadius:"50%",
              padding:"5px",
              margin:"1px"
            }}
          />
        </button>
        
      <Searchdropdownbox 
 isOpen={searchDropdown} onClose={()=>setSearchDropdown(false)}></Searchdropdownbox>
      
      </div>
    </div>
  );
};

