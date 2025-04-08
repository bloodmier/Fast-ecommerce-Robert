import { Accordion, AccordionDetails, AccordionSummary, Box, Link, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Footerdropdown = () => {

    return (
        <Box sx={{ width: "100%", textAlign: "center", paddingTop: "20px", backgroundColor:"transparent" }}>
          <Accordion sx={{backgroundColor:"transparent", color:"white", textAlign:"left"}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color:"var(--accent-color)" }}/>}>
              <Typography variant="h6" color="var(--accent-color)">
                Company
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{  }}>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                  About us
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                  Contact us
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                  Terms of purchase
                </Link>
              </Box>
              <Box>
                <Link href="/admin" color="inherit" underline="hover">
                  Login
                </Link>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{backgroundColor:"transparent",color:"white", textAlign:"left"}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color:"var(--accent-color)" }}/>}>
              <Typography variant="h6" color="var(--accent-color)">
                Customerservice
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                  FAQ
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                  Track order
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit" underline="hover">
                  Returns
                </Link>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{backgroundColor:"transparent",color:"white", textAlign:"left"}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color:"var(--accent-color)" }}/>}>
              <Typography variant="h6" color="var(--accent-color)">
                Follow us
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Link href="https://facebook.com" color="inherit" underline="hover">
                  Facebook
                </Link>
              </Box>
              <Box>
                <Link href="https://instagram.com" color="inherit" underline="hover">
                  Instagram
                </Link>
              </Box>
              <Box>
                <Link href="https://twitter.com" color="inherit" underline="hover">
                  Twitter
                </Link>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Box zIndex={1} sx={{ marginTop: "1rem", bottom:"0", position:"relative"}}>
            <Typography variant="body2" sx={{textAlign:"center"}} >
          © {new Date().getFullYear()} Fast AB. All rights reserved.
             </Typography>
       
      </Box>
        </Box>
      );
    };
    