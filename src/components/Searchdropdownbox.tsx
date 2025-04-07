import "../sass/Searchdropdown.scss";
import Notfound from "../assets/Img-not-found.jpg";
import { IProduct } from "../models/Iproduct";
interface ISearchdropdownbox {
  rightproducts: IProduct[];
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
}

export const Searchdropdownbox = ({
  isOpen,
  onClose,
  rightproducts,
  onClick
}: ISearchdropdownbox) => {


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
            {rightproducts && rightproducts.length > 0 ? (
              <ul
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  margin: 0,
                  padding: 0,
                }}
              >
                {rightproducts.map((rightproduct) => {
                  if (!rightproduct) return
                  const id = rightproduct?.id
                  return rightproduct && (
                    <a href={`/products/${id}`} key={rightproduct.id}><li
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
              <p onClick={onClick}>Couldn't find any search results!</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

