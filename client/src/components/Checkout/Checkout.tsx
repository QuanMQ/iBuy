import React, { useState, Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { AddressForm } from "./AddressForm";
import PaymentForm from "./PaymentForm";
import { Review } from "./Review";
import { GlobalContext } from "../../context/GlobalState";

// *Types
import { OrderType } from "../../App";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    paddingTop: theme.spacing(9),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(
  step: number,
  setOrder: React.Dispatch<React.SetStateAction<OrderType>>,
  order: OrderType,
  error: boolean
) {
  switch (step) {
    case 0:
      return <AddressForm setOrder={setOrder} order={order} error={error} />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review order={order} />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState(false);
  const {
    state: { cartItems },
    dispatch,
  } = useContext(GlobalContext);
  const [order, setOrder] = useState({
    orderNumber: Math.floor(Math.random() * 1000),
    address: "",
    products: cartItems,
    totals: cartItems.reduce(
      (acc: number, item) => acc + item.amount * item.price,
      0
    ),
  } as OrderType);

  const handleNext = () => {
    if (order.address === "") {
      setError(true);
    } else {
      setError(false);
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleOrder = async () => {
    setActiveStep(activeStep + 1);
    window.scrollTo(0, 0);
    dispatch({
      type: "RESET_CART",
    });
    await fetch("/orders", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
  };

  return (
    <Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Fragment>
            {activeStep === steps.length ? (
              <Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{order.orderNumber}. We have emailed
                  your order confirmation, and will send you an update when your
                  order has shipped.
                </Typography>
              </Fragment>
            ) : (
              <Fragment>
                {getStepContent(activeStep, setOrder, order, error)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length - 1 ? handleOrder : handleNext
                    }
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </Fragment>
            )}
          </Fragment>
        </Paper>
      </main>
    </Fragment>
  );
}
