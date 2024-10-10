import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import FAQSection from "../features/Account/FAQ Section";
import AccountInfo from "../features/Account/AccountInfo";
import Footer from "../components/Footer";

function Account() {
  return (
    <Box>
      <Header />
      <Container>
        <Box></Box>
        <h3 className="text-3xl font-bold text-gray-600 mt-8">Persnal Info</h3>
        <Box className="grid   md:grid-cols-7 gap-8">
          <Box className="col-span-4 mt-6">
            <AccountInfo />
          </Box>
          <Box className="col-span-3">
            <FAQSection />
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default Account;
