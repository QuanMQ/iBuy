import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      paddingTop: "5px",
      transition: "all 0.15s linear",
      backgroundColor: "transparent",
      color: "#333",
      [theme.breakpoints.down("xs")]: {
        paddingBottom: "5px",
      },
    },
    appBarScroll: {
      paddingTop: "0px",
      transition: "all 0.15s linear",
      backgroundColor: "#fff",
      color: "#333",
      [theme.breakpoints.down("xs")]: {
        paddingBottom: "3px",
      },
    },
    flexBox: {
      width: "100%",
    },
    brand: {
      marginRight: "50px",
    },
    icon: {
      transition: "color 0.25s ease-in-out",
      "&:hover": {
        color: "#717FE0",
      },
    },
    nav: {
      fontSize: "22px",
      letterSpacing: "3px",
      marginRight: "5px",
      textTransform: "capitalize",
      color: "#333",
      transition: "color 0.25s ease-in-out",
      "&:hover": {
        color: "#717FE0",
      },
      [theme.breakpoints.down(670)]: {
        display: "none",
      },
    },
    menuIcon: {
      display: "none",
      "&:hover": {
        color: "#717FE0",
      },
      [theme.breakpoints.down(670)]: {
        display: "inline",
      },
    },
    fab: {
      position: "fixed",
      right: "10px",
      bottom: "10px",
      opacity: 0,
      transition: "opacity 0.15s linear",
    },
    fabScroll: {
      position: "fixed",
      right: "10px",
      bottom: "10px",
      opacity: 1,
    },
  })
);
