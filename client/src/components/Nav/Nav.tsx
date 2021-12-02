import { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Button,
  Fab,
  Badge,
} from "@material-ui/core";
import { ShoppingCart, Search, Menu, ArrowUpward } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

// *Styles
import { useStyles } from "./Nav.styles";

// *Types
import { CartItemType } from "../../App";

type Props = {
  openDialog: () => void;
  openCart: () => void;
  openMenu: () => void;
};

const menu = ["Home", "Shop", "Login", "Admin"];

const Nav: React.FC<Props> = ({ openDialog, openCart, openMenu }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const {
    state: { cartItems },
  } = useContext(GlobalContext);
  const {
    nav,
    appBarScroll,
    appBar,
    flexBox,
    brand,
    icon,
    menuIcon,
    fabScroll,
    fab,
  } = useStyles();
  useEffect(() => {
    document.addEventListener("scroll", handleScrolling);
    return () => {
      document.removeEventListener("scroll", handleScrolling);
    };
  }, []);

  const handleScrolling = () => {
    if (window.scrollY) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  const getTotalItems = (items: CartItemType[]): number =>
    items.reduce((acc: number, item) => acc + item.amount, 0);

  const button = menu.map((endpoint, index) => (
    <Button
      key={index}
      component={Link}
      to={endpoint === "Home" ? "/" : `/${endpoint.toLowerCase()}`}
      size="large"
      className={nav}
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      {endpoint}
    </Button>
  ));

  return (
    <AppBar position="fixed" className={isScrolling ? appBarScroll : appBar}>
      <Toolbar>
        <Box display="flex" alignItems="center" className={flexBox}>
          <Box>
            <Typography variant="h4" className={brand}>
              <strong>i</strong>Buy
            </Typography>
          </Box>
          <Box display="flex" flexWrap="nowrap" flexGrow={1}>
            {button}
          </Box>
          <Box>
            <IconButton disableRipple onClick={openDialog} className={icon}>
              <Search />
            </IconButton>
            <IconButton disableRipple onClick={openCart} className={icon}>
              <Badge badgeContent={getTotalItems(cartItems)} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={openMenu}
              className={menuIcon}
            >
              <Menu />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
      <Fab href="#" color="secondary" className={isScrolling ? fabScroll : fab}>
        <ArrowUpward />
      </Fab>
    </AppBar>
  );
};

export default Nav;
