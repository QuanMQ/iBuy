import { useState, useContext, Fragment, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import {
  Typography,
  IconButton,
  ButtonGroup,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import { Close, Add, Remove } from "@material-ui/icons";
import { DialogWrapper } from "./ItemQuickView.styles";
import ItemPurchaseConfirm from "../ItemPurchaseConfirm/ItemPurchaseConfirm";

// *Styles
import { useStyles } from "./ItemQuickView.styles";

// *Types
import { CartItemType } from "../../App";

type Props = {
  item: CartItemType;
  isDialogOpen: boolean;
  closeDialog: () => void;
};

const ItemQuickView: React.FC<Props> = ({
  item,
  isDialogOpen,
  closeDialog,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(GlobalContext);
  const { closeButton, dialogButton } = useStyles();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    if (quantity) {
      clickedItem.amount = quantity;
      dispatch({
        type: "ADD_TO_CART",
        payload: clickedItem,
      });
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value));
  };

  const removeItem = () => {
    setQuantity((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const addItem = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <Fragment>
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        aria-labelledby="quick-view"
        disableRestoreFocus
        fullWidth
        maxWidth="xl"
        style={{ display: "flex" }}
      >
        <DialogWrapper>
          <img src={item.image} alt="" id="dialog-img" />
          <div>
            <DialogTitle id="quick-view" disableTypography>
              <Typography style={{ paddingRight: "15px" }} variant="h5">
                {item.title}
              </Typography>
              <IconButton className={closeButton} onClick={closeDialog}>
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText variant="h6" color="textPrimary">
                ${item.price}
              </DialogContentText>
              <DialogContentText align="justify">
                {item.description}
              </DialogContentText>
            </DialogContent>
            <DialogActions className={dialogButton}>
              <ButtonGroup
                size="small"
                variant="contained"
                color="primary"
                disableRipple
              >
                <IconButton onClick={removeItem}>
                  <Remove />
                </IconButton>
                <IconButton>
                  <TextField
                    type="number"
                    value={quantity}
                    variant="outlined"
                    size="small"
                    style={{ width: "150px" }}
                    onChange={handleQuantityChange}
                  />
                </IconButton>
                <IconButton onClick={addItem}>
                  <Add />
                </IconButton>
              </ButtonGroup>
              {!quantity && (
                <Typography color="error">
                  Error: Number of items cannot be smaller than 1
                </Typography>
              )}
              <Button
                size="large"
                variant="contained"
                disableElevation
                color="primary"
                onClick={() => {
                  handleAddToCart(item);
                  if (quantity) {
                    handleModalOpen();
                    setLoading(true);
                  }
                }}
              >
                ADD TO CART
              </Button>
            </DialogActions>
          </div>
        </DialogWrapper>
      </Dialog>
      <ItemPurchaseConfirm
        title={item.title}
        isLoading={loading}
        isModalOpen={modalOpen}
        closeModal={handleModalClose}
      />
    </Fragment>
  );
};

export default ItemQuickView;
