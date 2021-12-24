import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    spinner: {
      color: "#A5DC86",
    },
    check: {
      color: "#A5DC86",
      fontSize: "4rem",
    },
    paper: {
      width: "500px",
      height: "300px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#fff",
      padding: "1rem",
      borderRadius: "5px",
      [theme.breakpoints.down("xs")]: {
        width: "95%",
      },
      "& > *": {
        fontFamily:
          "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
      },
      "& p": {
        fontSize: "1.5rem",
      },
      "& button": {
        cursor: "pointer",
        alignSelf: "flex-end",
        padding: "10px 20px",
        borderRadius: "7px",
        backgroundColor: "#7CD1F9",
        fontSize: "1.2rem",
        fontWeight: "bold",
        letterSpacing: "2px",
        "&:active": {
          backgroundColor: "#0BA3EA",
        },
      },
      "& h2": {
        textAlign: "center",
      },
    },
  })
);
