import { useEffect, useContext, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Tooltip,
  withStyles,
  TextField,
  MenuItem,
  Snackbar,
  Box,
  Divider,
} from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";
import { useStyles } from "./Admin.styles";

// *Types
import { CartItemType } from "../../App";

const CustomTooltip = withStyles(() => ({
  tooltip: {
    fontSize: 16,
  },
}))(Tooltip);

const statuses = ["in progress", "delivered", "cancelled"];

function Admin() {
  const [orders, setOrders] = useState<any[]>([]);
  const [hide, setHide] = useState(false);
  const [open, setOpen] = useState(false);
  const { container, crumbs, table, productCell, productRow } = useStyles();
  const {
    state: {
      authenticated,
      currentUser: { role },
    },
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authenticated && role !== "admin") {
      navigate("/");
    }
  });
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/orders/admin", {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);
  useEffect(() => {
    hideCol();
  });
  useEffect(() => {
    window.addEventListener("resize", hideCol);
    return () => {
      window.removeEventListener("resize", hideCol);
    };
  }, []);

  const hideCol = () => {
    if (window.innerWidth < 960) {
      setHide(true);
    } else {
      setHide(false);
    }
  };

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    await fetch(`/orders/${id}`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({ status: event.target.value }),
    });
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
          <Typography color="textPrimary">Admin</Typography>
        </Breadcrumbs>
        <TableContainer>
          <Table aria-label="simple table" className={table}>
            <TableHead>
              <TableRow>
                <TableCell>Order Number</TableCell>
                <TableCell id="product-col">Products</TableCell>
                <TableCell align="right" className="sm">
                  Quantity
                </TableCell>
                <TableCell align="center" className="xs">
                  Grand Total
                </TableCell>
                <TableCell align="center" className="xs">
                  Shipping Address
                </TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map(
                ({
                  _id,
                  products,
                  orderNumber,
                  address,
                  totals,
                  status,
                  buyer,
                }) => (
                  <TableRow key={_id}>
                    <TableCell>#{orderNumber}</TableCell>
                    <TableCell className="product" colSpan={hide ? 1 : 2}>
                      {products.map((product: CartItemType, index: number) => (
                        <Box key={index} className={productRow}>
                          <Box className={productCell}>
                            <CustomTooltip
                              arrow
                              title={product.title}
                              placement="top"
                            >
                              <img src={product.image} alt={product.title} />
                            </CustomTooltip>
                            <Box className="sm">{product.amount}</Box>
                          </Box>
                          {products.length > 1 && <Divider />}
                        </Box>
                      ))}
                    </TableCell>
                    <TableCell align="center" className="xs">
                      ${totals}
                    </TableCell>
                    <TableCell align="center" className="xs">
                      {address}
                      <br />
                      {`(Buyer: ${buyer.displayName})`}
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        select
                        value={status}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setOrders((prev) =>
                            prev.map((order) => {
                              if (order._id === _id) {
                                order.status = e.target.value;
                                return order;
                              } else {
                                return order;
                              }
                            })
                          );
                          handleChange(e, _id);
                          handleClick();
                        }}
                      >
                        {statuses.map((stat) => (
                          <MenuItem key={stat} value={stat}>
                            {stat.toUpperCase()}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="ORDER UPDATED"
      />
    </Fragment>
  );
}

export default Admin;
