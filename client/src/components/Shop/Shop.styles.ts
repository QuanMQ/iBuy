import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    marginTop: "5rem",
    backgroundColor: "transparent",
    color: "#333",
    boxShadow: "none",
  },
  tab: {
    textTransform: "capitalize",
    fontSize: "1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    transition: "color 0.15s linear",
    "&:hover": {
      color: "#717FE0",
    },
  },
});
