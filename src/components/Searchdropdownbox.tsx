import { Igoogleitem } from "../models/Igoogleitem";
import "../sass/Searchdropdown.scss";
import Notfound from "../assets/Img-not-found.jpg";
import { useProducts } from "../hooks/useProducts";
interface ISearchdropdownbox {
  Searchitems: Igoogleitem[];
  isOpen: boolean;
  onClose: () => void;
}

export const Searchdropdownbox = ({
  isOpen,
  onClose,
  Searchitems,
}: ISearchdropdownbox) => {


const {products} = useProducts()

 /* const extractCode = (text:string) => {
  const match = text.match(/[A-Z0-9-]{3,}/); 
  return match ? match[0] : null; 
}; */
const extractCode = (text:string) => {
  if (text.toLowerCase().includes("milwaukee")) {
      // Specialregex för Milwaukee
      const match = text.match(/M\d{2}\s[A-Z]+-\d+/); // Matchar t.ex. "M18 BDD-0"
      return match ? match[0] : null;
  } else {
      // Standardregex för andra produkter
      const match = text.match(/[A-Z0-9-]{3,}/); // Matchar t.ex. "DCD800NT-XJ" eller "DS18DC"
      return match ? match[0] : null;
  }
};



  return (
    <>
      {isOpen && (
        <>
          <div
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 999,
            }}
            onMouseDown={(e) => e.stopPropagation()}
          />
          <div
            style={{
              position: "absolute",
              top: "32px",
              right: "0",
              width: "400px",
              maxWidth: "400px",
              backgroundColor: "white",
              zIndex: 1000,
              borderRadius: "4px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              padding: "10px",
              animation: "fadeSlideIn 0.5s ease-out",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {Searchitems.length > 0 ? (
              <ul
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  margin: 0,
                  padding: 0,
                }}
              >
                {Searchitems.map((i) => {
                 /*  const cleanedTitle = i.title.replace(/\| Proffsmagasinet$/, "").replace(/\.\.\./g, "").trim(); */

                  const apicode = extractCode(i.title)
                  
                  
                 
                  
                
      
                   const rightproduct = products.find((p)=> {return apicode ? p.name.includes(apicode) : null})
                 
                  
                   
            
                   const id = rightproduct?.id
                  
                   
                  
                  return (
                    rightproduct && 
                    <a href={`/products/${id}`} key={i.title}><li
                      
                      style={{
                        height: "5rem",
                        maxWidth: "100%",
                        display: "flex",
                        justifyContent: "center",
                        gap: "5px",
                        margin: "3px",
                        padding:"5px",
                        borderBottom: "1px solid black",
                      }}
                    >
                      <img
                        src={rightproduct ? rightproduct.image : Notfound}
                        
                        alt={rightproduct.name}
                      />
                      <h5>{rightproduct.name}</h5>
                      
                    </li></a>
                  );
                })}
              </ul>
            ) : (
              <p>Couldn't find any search results!</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

