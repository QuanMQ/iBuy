import { SwipeableDrawer } from "@material-ui/core";

import Cart from "../Cart/Cart";

type Props = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const SwipeDrawer: React.FC<Props> = ({ isOpen, openCart, closeCart }) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={isOpen}
      onClose={closeCart}
      onOpen={openCart}
      disableBackdropTransition
    >
      <Cart />
    </SwipeableDrawer>
  );
};

export default SwipeDrawer;
