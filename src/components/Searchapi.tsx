import SearchIcon from "@mui/icons-material/Search";
import { FormEvent, useRef, useState } from "react";
export const Searchapi = () => {
  const [searchinput, setSearchinput] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hanldemouseover = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsFocused(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("hej");
  };

  return (
    <div style={{ position: "absolute", right: "100px" }}>
      <form
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
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder={isFocused ? "Type to Search..." : ""}
          style={{
            zIndex: "1",
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
          onBlur={() => setIsFocused(false)}
        />

        <button
          type="submit"
          style={{
            zIndex: "2",
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
          disabled={!isFocused}
          onMouseOver={hanldemouseover}
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
      </form>
    </div>
  );
};
