import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

// *Types
import { OrderType } from "../../App";

type Props = {
  setOrder: React.Dispatch<React.SetStateAction<OrderType>>;
  order: OrderType;
  error: boolean;
};

export const AddressForm: React.FC<Props> = ({ setOrder, order, error }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address line"
            value={order.address}
            onChange={({ target }) => {
              setOrder((prev) => ({ ...prev, address: target.value }));
            }}
            fullWidth
            autoComplete="shipping address-line"
          />
          {error && (
            <Typography color="error" style={{marginTop: "10px"}}>
              Error: Please enter your shipping address
            </Typography>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
