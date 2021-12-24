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

const menu = ["Home", "Shop"];

const Nav: React.FC<Props> = ({ openDialog, openCart, openMenu }) => {
  const [error, setError] = useState<null | string>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const {
    state: { cartItems, currentUser, authenticated },
    dispatch,
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

  // *Check if user is authenticated
  useEffect(() => {
    const authCheck = () => {
      fetch("/auth/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("failed to authenticate user");
        })
        .then((responseJson) => {
          isAuthenticated(true);
          addUser(responseJson.user);
        })
        .catch((err) => {
          isAuthenticated(false);
          setError("Failed to authenticate user");
          console.log(error);
        });
    };

    authCheck();
  }, []);

  // *Check if page is scrolling
  useEffect(() => {
    document.addEventListener("scroll", handleScrolling);
    return () => {
      document.removeEventListener("scroll", handleScrolling);
    };
  }, []);

  // *Temporarily save cart items
  useEffect(() => {
    window.addEventListener("beforeunload", tempItemsSave);
    return () => {
      window.removeEventListener("beforeunload", tempItemsSave);
    };
  });

  // *Retrieve cart items in case user logs in while there're items in cart
  useEffect(() => {
    if (localStorage.getItem("cartItems") !== null) {
      JSON.parse(localStorage.getItem("cartItems") as string).forEach(
        (item: CartItemType) => {
          addToCart(item);
        }
      );
      return () => {
        localStorage.removeItem("cartItems");
      };
    }
  }, []);

  const isAuthenticated = (auth: boolean) => {
    dispatch({
      type: "AUTH_CHECK",
      payload: auth,
    });
  };

  const addUser = (user: object) => {
    dispatch({
      type: "ADD_CURRENT_USER",
      payload: user,
    });
  };

  const tempItemsSave = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  function addToCart(clickedItem: CartItemType) {
    dispatch({
      type: "ADD_TO_CART",
      payload: clickedItem,
    });
  }

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
            {authenticated && (
              <Button
                component={Link}
                to="/order"
                size="large"
                className={nav}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                My Order
              </Button>
            )}
            {authenticated ? (
              <Button
                size="large"
                className={nav}
                onClick={() => {
                  window.open("http://localhost:5000/auth/logout", "_self");
                  isAuthenticated(false);
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                size="large"
                className={nav}
                onClick={() => {
                  window.open("http://localhost:5000/auth/google", "_self");
                }}
              >
                Login
              </Button>
            )}
            {authenticated && currentUser.role === "admin" && (
              <Button
                component={Link}
                to="/admin"
                size="large"
                className={nav}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                Admin
              </Button>
            )}
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
