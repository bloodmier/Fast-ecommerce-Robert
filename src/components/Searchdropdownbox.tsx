import "../sass/Searchdropdown.scss";
import Notfound from "../assets/Img-not-found.jpg";
import { IProduct } from "../models/Iproduct";
import { Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Loading } from "./Loading";
interface ISearchdropdownbox {
  products: IProduct[];
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  isLoading:boolean;
}

export const Searchdropdownbox = ({
  isOpen,
  onClose,
  products,
  onClick,isLoading
}: ISearchdropdownbox) => {


  return (
    <>
      {isOpen && (
        <>
          <Box
            onClick={onClose}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 999,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            onMouseDown={(e) => e.stopPropagation()}
          />
          <Box
            sx={{
              position: "absolute",
              top: "32px",
              right: {xs:"unset", sm:0},
              left:{xs:"-10px", sm:"unset"},
              width: { xs: "100dvw", sm: "400px" }, 
              maxWidth: { xs: "none", sm: "400px" },
              height:{xs:"400px",sm:"auto"},
              backgroundColor: "white",
              zIndex: 1000,
              borderRadius: "4px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              padding: "10px",
              animation: "fadeSlideIn 0.5s ease-out",
              boxSizing: "border-box",
              overflow: "auto",
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {isLoading ? <Loading/> : 
            products && products.length > 0 ? (
              <List sx={{ width: "100%", maxWidth: "400px", padding: 0 }}>
                {products.map((rightproduct) => {
                  if (!rightproduct) return null;
                  const id = rightproduct?.id;
                  return (
                    <a href={`/products/${id}`} key={rightproduct.id} style={{ textDecoration: "none" }}>
                      <ListItem
                        sx={{
                          height: "5rem",
                          display: "flex",
                          justifyContent: "center",
                          gap: "5px",
                          margin: "3px",
                          padding: "5px",
                          borderBottom: "1px solid black",
                        }}
                      >
                        <ListItemAvatar>
                          <img
                            src={rightproduct.image || Notfound}
                            alt={rightproduct.name}
                            style={{ width: "3rem", height: "3rem" }}
                          />
                        </ListItemAvatar>
                        <ListItemText primary={rightproduct.name} />
                      </ListItem>
                    </a>
                  );
                })}
              </List>
            ) : (
              <Typography onClick={onClick} sx={{ textAlign: "center", color: "red" }}>
                Couldn't find any search results!
              </Typography>
            )}
          </Box>
        </>
      )}
    </>
  );
};


