import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import Catogries from "../components/Catogries";
import Products from "../features/Products/Products";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <Box>
      <Header />
      <Catogries />
      <Container>
        <Products />
      </Container>
      <Footer />
    </Box>
  );
}

export default HomePage;
