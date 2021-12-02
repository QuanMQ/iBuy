import {
  makeStyles,
  createStyles,
  withStyles,
  Theme,
  TextField,
} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "#222222",
      color: "#B2B2B2",
      padding: "3rem 2rem 2rem",
    },
    flexBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      [theme.breakpoints.down(900)]: {
        flexDirection: "column",
        justifyContent: "flex-start",
      },
    },
    heading: {
      color: "#fff",
      textTransform: "uppercase",
      fontWeight: "bold",
      fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    },
    hover: {
      cursor: "pointer",
      color: "#B2B2B2",
      transition: "color 0.25s ease-in-out",
      "&:hover": {
        color: "#717FE0",
      },
    },
    email: {
      "& *": {
        color: "#fff",
      },
    },
    button: {
      borderRadius: "20px",
      "&:hover": {
        backgroundColor: "#fff",
        color: "#717FE0",
      },
    },
    copyright: {
      marginTop: "1.5rem",
      textAlign: "center",
    },
  })
);

export const CssTextField = withStyles({
  root: {
    "& label": {
      color: "#B2B2B2",
    },
    "& label.Mui-focused": {
      color: "#717FE0",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#B2B2B2",
      },
      "&:hover fieldset": {
        borderColor: "#717FE0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#717FE0",
      },
    },
  },
})(TextField);
