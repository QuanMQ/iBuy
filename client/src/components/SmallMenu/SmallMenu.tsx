import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Home, LocalMall, VpnKey, SupervisorAccount } from "@material-ui/icons";
import { Link } from "react-router-dom";

type Props = {
  isOpen: boolean;
  closeMenu: () => void;
};

const useStyles = makeStyles({
  link: {
    transition: "color 0.25s ease-in-out",
    color: "#333",
    "&:hover": {
      color: "#717FE0",
    },
  },
});

const SmallMenu: React.FC<Props> = ({ isOpen, closeMenu }) => {
  const { link } = useStyles();

  return (
    <Drawer anchor="top" open={isOpen} onClose={closeMenu}>
      <List component="nav">
        <ListItem component={Link} to="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText className={link} primary="Home" />
        </ListItem>
        <ListItem component={Link} to="/shop">
          <ListItemIcon>
            <LocalMall />
          </ListItemIcon>
          <ListItemText className={link} primary="Shop" />
        </ListItem>
        <ListItem component={Link} to="/login">
          <ListItemIcon>
            <VpnKey />
          </ListItemIcon>
          <ListItemText className={link} primary="Login" />
        </ListItem>
        <ListItem component={Link} to="/admin">
          <ListItemIcon>
            <SupervisorAccount />
          </ListItemIcon>
          <ListItemText className={link} primary="Admin" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SmallMenu;
