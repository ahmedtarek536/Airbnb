import { Container } from "@mui/material";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import AccountMenu from "./AccountMenu";
import Menubar from "./Menubar";
import { useSelector } from "react-redux";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return (
    <header className=" py-3 border-b border-bgColor">
      <Container className="flex items-center justify-between">
        <Logo />
        <Searchbar />
        {isAuthenticated ? <AccountMenu /> : <Menubar />}
      </Container>
    </header>
  );
}

export default Header;
