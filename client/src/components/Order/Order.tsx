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
  Box,
  Divider,
} from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";
import { useStyles } from "./Order.styles";

// *Types
import { CartItemType } from "../../App";

const CustomTooltip = withStyles(() => ({
  tooltip: {
    fontSize: 16,
  },
}))(Tooltip);

function Order() {
  const [orders, setOrders] = useState<any[]>([]);
  const [hide, setHide] = useState<boolean>(false);
  const { container, crumbs, table, productCell, productRow } = useStyles();
  const {
    state: { authenticated },
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authenticated) {
      navigate("/");
    }
  });
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/orders", {
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
          <Typography color="textPrimary">My Order</Typography>
        </Breadcrumbs>
        <TableContainer>
          <Table aria-label="simple table" className={table}>
            <TableHead>
              <TableRow>
                <TableCell>Order Number</TableCell>
                <TableCell align="center" id="product-col">
                  Products
                </TableCell>
                <TableCell align="right" className="sm" id="price-col">
                  Price
                </TableCell>
                <TableCell align="right" className="sm">
                  Quantity
                </TableCell>
                <TableCell align="right" className="sm">
                  Total
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
                ({ _id, products, orderNumber, address, totals, status }) => (
                  <TableRow key={_id}>
                    <TableCell>#{orderNumber}</TableCell>
                    <TableCell colSpan={hide ? 1 : 4}>
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
                            <Box className="sm">${product.price}</Box>
                            <Box className="sm">{product.amount}</Box>
                            <Box className="sm">
                              ${product.amount * product.price}
                            </Box>
                          </Box>
                          <Divider />
                        </Box>
                      ))}
                    </TableCell>
                    <TableCell align="center" className="xs">
                      ${totals}
                    </TableCell>
                    <TableCell align="center" className="xs">
                      {address}
                    </TableCell>
                    <TableCell align="center">{status.toUpperCase()}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Fragment>
  );
}

export default Order;
