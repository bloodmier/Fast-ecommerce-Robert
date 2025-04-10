import { Box, Typography, Button, TextField } from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import { useParams } from "react-router";
import { ChangeEvent, useContext, useState } from "react";
import { IcartItem } from "../models/IcartItem";
import { IProduct } from "../models/Iproduct";
import { IActiontype } from "../reducers/cartreducer";
import { CartContext } from "../context/CartContext";

export const Productpage = () => {
  const { id } = useParams();
  const productId = parseInt(id || "");
  const { products } = useProducts();
  const { dispatch } = useContext(CartContext);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const product = products.find((p) => p.id === productId);

  const handleaddingcartitem = (product: IProduct) => {
    const { id, name, price, image } = product;
    const quantity = quantities[product.id] || 1;
    const cartItem: IcartItem = { id, name, price, quantity, image };
    dispatch({
      type: IActiontype.ADD_CARTITEM,
      payload: JSON.stringify(cartItem),
    });
    setQuantities({});
  };

  const handleQuantitychange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    const value = Math.max(1, +e.target.value);
    setQuantities((Quantities) => ({
      ...Quantities,
      [id]: value,
    }));
  };

  if (!product) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h4" color="error">
          Could't find the product
        </Typography>
        <Typography>Check if the id i correct</Typography>
        <Button variant="contained" color="primary" href="/products">
          Back
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        width: "30rem",
        backgroundColor: "white",
        borderRadius: "15px",
        marginTop: { xs: "70px", sm: "25px" },
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ maxWidth: "100%", borderRadius: "8px" }}
      />
      <Typography variant="h4" gutterBottom color="var(--text-color)">
        {product.name}
      </Typography>
      <Typography variant="body1" color="rgb(44, 44, 44);">
        {product.description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h6" color="primary">
          Price: {product.price} kr
        </Typography>
        <Typography variant="h6" color="var(--accent-color)">
          Stock: {product.stock > 0 ? product.stock : "Out of stock"}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        <TextField
          label="Count"
          type="number"
          variant="outlined"
          value={quantities[product.id] || 1}
          onChange={(e) => handleQuantitychange(e, product.id)}
          sx={{
            width: "80dvw",
            maxWidth: "30rem",
            zIndex: 0,
            position: "relative",
          }}
        />

        <Button
          color="success"
          sx={{
            display: { xs: "flex", sm: "none" },
            position: "absolute",
            right: "40px",
            top: "50%",
            height: "100%",
            transform: "translateY(-50%)",
            minWidth: "2.5rem",
            borderRadius: "0",
            fontSize: "1.3rem",
            backgroundColor: "#35b84f27",
            borderLeft: "1px solid var(--muted-text-color)",
          }}
          onClick={() =>
            handleQuantitychange(
              {
                target: { value: String((quantities[product.id] || 1) + 1) },
              } as ChangeEvent<HTMLInputElement>,
              product.id
            )
          }
        >
          +
        </Button>
        <Button
          color="error"
          sx={{
            display: { xs: "flex", sm: "none" },
            position: "absolute",
            right: "0px",
            top: "50%",
            height: "100%",
            transform: "translateY(-50%)",
            minWidth: "2.5rem",
            fontSize: "1.3rem",
            backgroundColor: "#b8353527",
            borderLeft: "1px solid var(--muted-text-color)",
            borderRadius: "0 5px 5px 0",
          }}
          onClick={() =>
            handleQuantitychange(
              {
                target: { value: String((quantities[product.id] || 1) - 1) },
              } as ChangeEvent<HTMLInputElement>,
              product.id
            )
          }
        >
          -
        </Button>
      </Box>
      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={() => handleaddingcartitem(product)}
      >
        Add to cart
      </Button>
    </Box>
  );
};
