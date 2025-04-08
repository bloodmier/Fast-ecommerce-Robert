import { Box, Button, Typography } from "@mui/material";
import Bgtool from "../assets/Digital-tools.jpg";

export const Homepage = () => {
  return (
    <Box
      component="div"
      sx={{
        backgroundImage: `url(${Bgtool})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        marginTop:{xs:"4rem", sm:"unset"},
        height:{
          xs:"calc(100dvh - 8rem - 12rem)",
          sm:"calc(100dvh - 4rem - 12rem)"}
           ,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: {xs:"90%",sm:"700px"},
          height:"auto",
          color: "whitesmoke",
          position: "relative",
          marginBottom: "5rem",
         
        }}
      >
        <Typography variant="h2" sx={{paddingLeft:"10px", margin: "0", fontSize: {xs:"2rem",sm:"3rem"},}}>
          Get your <span style={{ color: "var(--accent-color)" }}>tools</span>{" "}
          here
        </Typography>
        <Typography variant="h2" sx={{ paddingLeft: "40px", margin: "0" , fontSize: {xs:"1.8rem",sm:"3rem"}}}>
          for lightning-fast delivery
        </Typography>
        <Typography variant="h4" sx={{ paddingLeft: "60px", margin: "0",fontSize: {xs:"1rem",sm:"2rem"} }}>
          —because time waits for no one!
        </Typography>
        <Button
          href="/products"
          variant="contained"
          size="large"
          
          sx={{ position: "absolute", right: {xs:"0",sm:"150px"}, bottom: {xs:"-70px",sm:"-50px"} , width:{xs:"100%",sm:"unset"}}}
        >
          Buy here
        </Button>
      </Box>
    </Box>
  );
};
