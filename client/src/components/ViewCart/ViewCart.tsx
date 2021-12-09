import { Fragment, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Container } from "@material-ui/core";
import {
  Breadcrumbs,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  ButtonGroup,
  Button,
  IconButton,
  TextField,
} from "@material-ui/core";
import { NavigateNext, Remove, Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStyles, Wrapper } from "./ViewCart.styles";

// *Types
import { CartItemType } from "../../App";

function Checkout() {
  const { container, crumbs, button, table } = useStyles();
  const {
    state: { cartItems },
    dispatch,
  } = useContext(GlobalContext);

  // *Actions
  const handleAddToCart = (clickedItem: CartItemType, quantity: number) => {
    if (quantity >= 0) {
      clickedItem.amount = quantity;
      dispatch({
        type: "ADD_TO_CART",
        payload: clickedItem,
      });
    }
  };

  function addToCart(clickedItem: CartItemType) {
    dispatch({
      type: "ADD_SINGLE_ITEM_TO_CART",
      payload: clickedItem,
    });
  }

  function removeFromCart(clickedItem: CartItemType) {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: clickedItem,
    });
  }

  function removeAllFromCart(clickedItem: CartItemType) {
    dispatch({
      type: "REMOVE_ALL_FROM_CART",
      payload: clickedItem,
    });
  }

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

  return (
    <Fragment>
      <Container className={container}>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Typography color="textPrimary" className={crumbs}>
            Home
          </Typography>
          <Typography color="textPrimary">Shopping Cart</Typography>
        </Breadcrumbs>
        <TableContainer>
          <Table aria-label="simple table" className={table}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>Product</TableCell>
                <TableCell align="center" className="price">
                  Price
                </TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center" className="total">
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    <Wrapper onClick={() => removeAllFromCart(item)}>
                      <img src={item.image} alt={item.title} />
                    </Wrapper>
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell align="center" className="price">
                    ${item.price}
                  </TableCell>
                  <TableCell align="center">
                    <ButtonGroup
                      size="small"
                      variant="contained"
                      color="primary"
                      disableRipple
                    >
                      <IconButton
                        onClick={() => {
                          removeFromCart(item);
                        }}
                      >
                        <Remove />
                      </IconButton>
                      <IconButton>
                        <TextField
                          type="number"
                          value={item.amount}
                          variant="outlined"
                          size="small"
                          onChange={({ target }) => {
                            handleAddToCart(item, +target.value);
                          }}
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          addToCart(item);
                        }}
                      >
                        <Add />
                      </IconButton>
                    </ButtonGroup>
                    {item.amount === 0 && (
                      <Typography color="error" id="error">
                        Error: Number of items cannot be smaller than 1
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center" className="total">
                    ${(item.amount * item.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5" color="textPrimary">
                    Total: ${calculateTotal(cartItems).toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell colSpan={2}>
                  <Button
                    className={button}
                    component={Link}
                    to="/checkout"
                    size="large"
                    disableElevation
                    fullWidth
                    variant="contained"
                  >
                    Check Out
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </Fragment>
  );
}

export default Checkout;
