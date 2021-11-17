import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Home, LocalMall, VpnKey, SupervisorAccount } from "@material-ui/icons";
import { Link } from "react-router-dom";

type Props = {
  isOpen: boolean;
  closeMenu: () => void;
};

const SmallMenu: React.FC<Props> = ({ isOpen, closeMenu }) => {
  return (
    <Drawer anchor="top" open={isOpen} onClose={closeMenu}>
      <List component="nav">
        <ListItem component={Link} to="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} to="/shop">
          <ListItemIcon>
            <LocalMall />
          </ListItemIcon>
          <ListItemText primary="Shop" />
        </ListItem>
        <ListItem component={Link} to="/login">
          <ListItemIcon>
            <VpnKey />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem component={Link} to="/admin">
          <ListItemIcon>
            <SupervisorAccount />
          </ListItemIcon>
          <ListItemText primary="Admin" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SmallMenu;
