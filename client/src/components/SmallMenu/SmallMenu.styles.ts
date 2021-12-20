import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  link: {
    transition: "color 0.25s ease-in-out",
    color: "#333",
    "&:hover": {
      color: "#717FE0",
      cursor: "pointer",
    },
  },
});
