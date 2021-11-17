import { useState, Fragment } from "react";

import SwipeDrawer from "../SwipeDrawer/SwipeDrawer";
import SmallMenu from "../SmallMenu/SmallMenu";
import SearchBar from "../SearchBar/SearchBar";
import Nav from "../Nav/Nav";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <Fragment>
      <Nav
        openDialog={handleDialogOpen}
        openCart={handleCartOpen}
        openMenu={handleMenuOpen}
      />
      <SwipeDrawer
        isOpen={cartOpen}
        openCart={handleCartOpen}
        closeCart={handleCartClose}
      />
      <SmallMenu isOpen={menuOpen} closeMenu={handleMenuClose} />
      <SearchBar openDialog={dialogOpen} closeDialog={handleDialogClose} />
    </Fragment>
  );
}
