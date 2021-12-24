import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      position: "relative",
    },
    heading: {
      textTransform: "uppercase",
      fontWeight: "bold",
      fontFamily:
        "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
      position: "absolute",
      top: "-4rem",
      left: "1rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: "2rem",
      },
    },
  })
);
