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
      "& .product": {
        width: "35%",
      },
      "& #product-col": {
        transform: "translateX(20px)",
      },
      [theme.breakpoints.down("xs")]: {
        "& .xs": {
          display: "none",
        },
        "& #product-col": {
          transform: "translateX(5px)",
        },
      },
    },
    productCell: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "20px auto",
      "& img": {
        width: "35%",
        height: "35%",
        [theme.breakpoints.down("sm")]: {
          width: "100%",
          height: "100%",
        },
      },
    },
    productRow: {
      "&:last-child hr": {
        display: "none",
      },
    },
  })
);
