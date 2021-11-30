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
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { ShoppingCart, Search, Menu, ArrowUpward } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import { CartItemType } from "../../App";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      paddingTop: "5px",
      transition: "all 0.15s linear",
      backgroundColor: "transparent",
      color: "#333",
      [theme.breakpoints.down("xs")]: {
        paddingBottom: "5px",
      },
    },
    appBarScroll: {
      paddingTop: "0px",
      transition: "all 0.15s linear",
      backgroundColor: "#fff",
      color: "#333",
      [theme.breakpoints.down("xs")]: {
        paddingBottom: "3px",
      },
    },
    flexBox: {
      width: "100%",
    },
    brand: {
      marginRight: "50px",
    },
    icon: {
      transition: "color 0.25s ease-in-out",
      "&:hover": {
        color: "#717FE0",
      },
    },
    nav: {
      fontSize: "22px",
      letterSpacing: "3px",
      marginRight: "5px",
      textTransform: "capitalize",
      color: "#333",
      transition: "color 0.25s ease-in-out",
      "&:hover": {
        color: "#717FE0",
      },
      [theme.breakpoints.down(670)]: {
        display: "none",
      },
    },
    menuIcon: {
      display: "none",
      "&:hover": {
        color: "#717FE0",
      },
      [theme.breakpoints.down(670)]: {
        display: "inline",
      },
    },
    fab: {
      position: "fixed",
      right: "10px",
      bottom: "10px",
      opacity: 0,
      transition: "opacity 0.15s linear",
    },
    fabScroll: {
      position: "fixed",
      right: "10px",
      bottom: "10px",
      opacity: 1,
    },
  })
);

const menu = ["Home", "Shop", "Login", "Admin"];

type Props = {
  openDialog: () => void;
  openCart: () => void;
  openMenu: () => void;
};

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
