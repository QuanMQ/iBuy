import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: "6rem",
    },
    crumbs: {
      textTransform: "capitalize",
      cursor: "pointer",
      transition: "color 0.15s linear",
      "&:hover": {
        color: "#717FE0",
      },
    },
    table: {
      "& thead th": {
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "1.25rem",
        fontFamily:
          "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
      },
      "& td": {
        fontSize: "1.15rem",
      },
      "& .sm": {
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      },
      "& .xs": {
        [theme.breakpoints.down("xs")]: {
          display: "none",
        },
      },
    },
    productCell: {
      width: "25%",
      "& img": {
        width: "100%",
        height: "100%",
      },
    },
    productRow: {
      "&:last-child td": {
        borderBottom: "none",
      },
    },
  })
);
