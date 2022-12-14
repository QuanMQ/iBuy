import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  Home,
  LocalMall,
  MeetingRoom,
  SupervisorAccount,
  ExitToApp,
  ShoppingBasket,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

// *Styles
import { useStyles } from "./SmallMenu.styles";

type Props = {
  isOpen: boolean;
  closeMenu: () => void;
};

const SmallMenu: React.FC<Props> = ({ isOpen, closeMenu }) => {
  const { link } = useStyles();
  const {
    state: { currentUser, authenticated },
    dispatch,
  } = useContext(GlobalContext);

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  const isAuthenticated = (auth: boolean) => {
    dispatch({
      type: "AUTH_CHECK",
      payload: auth,
    });
  };

  return (
    <Drawer anchor="top" open={isOpen} onClose={closeMenu}>
      <List component="nav">
        <ListItem onClick={scrollTop} component={Link} to="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText className={link} primary="Home" />
        </ListItem>
        <ListItem onClick={scrollTop} component={Link} to="/shop">
          <ListItemIcon>
            <LocalMall />
          </ListItemIcon>
          <ListItemText className={link} primary="Shop" />
        </ListItem>
        {authenticated && (
          <ListItem onClick={scrollTop} component={Link} to="/order">
            <ListItemIcon>
              <ShoppingBasket />
            </ListItemIcon>
            <ListItemText className={link} primary="My Order" />
          </ListItem>
        )}
        {authenticated ? (
          <ListItem
            onClick={() => {
              scrollTop();
              window.open(`${process.env.REACT_APP_URL}/auth/logout`, "_self");
              isAuthenticated(false);
            }}
          >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText className={link} primary="Logout" />
          </ListItem>
        ) : (
          <ListItem
            onClick={() => {
              scrollTop();
              window.open(`${process.env.REACT_APP_URL}/auth/google`, "_self");
            }}
          >
            <ListItemIcon>
              <MeetingRoom />
            </ListItemIcon>
            <ListItemText className={link} primary="Login" />
          </ListItem>
        )}
        {authenticated && currentUser.role === "admin" && (
          <ListItem onClick={scrollTop} component={Link} to="/admin">
            <ListItemIcon>
              <SupervisorAccount />
            </ListItemIcon>
            <ListItemText className={link} primary="Admin" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default SmallMenu;
