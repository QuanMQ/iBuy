import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Home, LocalMall, VpnKey, SupervisorAccount } from "@material-ui/icons";
import { Link } from "react-router-dom";

// *Styles
import { useStyles } from "./SmallMenu.styles";

type Props = {
  isOpen: boolean;
  closeMenu: () => void;
};

const SmallMenu: React.FC<Props> = ({ isOpen, closeMenu }) => {
  const { link } = useStyles();
  const scrollTop = () => {
    window.scrollTo(0, 0);
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
        <ListItem onClick={scrollTop} component={Link} to="/login">
          <ListItemIcon>
            <VpnKey />
          </ListItemIcon>
          <ListItemText className={link} primary="Login" />
        </ListItem>
        <ListItem onClick={scrollTop} component={Link} to="/admin">
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
