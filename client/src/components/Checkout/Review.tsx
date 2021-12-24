import { useContext, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { GlobalContext } from "../../context/GlobalState";

// *Types
import { OrderType } from "../../App";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& img": {
      maxWidth: "20%",
      maxHeight: "20%",
    },
    "& .product-title": {
      maxWidth: "58%",
    },
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

type Props = {
  order: OrderType;
};

export const Review: React.FC<Props> = ({ order }) => {
  const classes = useStyles();
  const { products, totals, address } = order;
  const {
    state: { currentUser },
  } = useContext(GlobalContext);

  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: currentUser.displayName },
    { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
    { name: "Expiry date", detail: "04/2024" },
  ];

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        <strong>Order summary:</strong>
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.id}>
            <img src={product.image} alt={product.title} />
            <ListItemText
              className="product-title"
              primary={`(${product.amount}x) ${product.title}`}
            />
            <Typography variant="body2">
              ${product.price * product.amount}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Grand Total:" />
          <Typography variant="subtitle1" className={classes.total}>
            ${totals}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            <strong>Shipping to:</strong>
          </Typography>
          <Typography gutterBottom>{currentUser.displayName}</Typography>
          <Typography gutterBottom>{address}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            <strong>Payment details:</strong>
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};
