import styled from "styled-components";
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
    button: {
      fontWeight: "bold",
      borderRadius: "20px",
      backgroundColor: "#222",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#717FE0",
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
      "& #error": {
        marginTop: "10px",
      },
      "& .xs": {
        [theme.breakpoints.down("xs")]: {
          display: "none",
        },
      },
      "& [type='number']": {
        width: "100px",
      },
      [theme.breakpoints.down("sm")]: {
        "& #product-col": {
          transform: "translateX(-14px)",
        },
        "& .sm": {
          display: "none",
        },
        "& [type='number']": {
          width: "50px",
        },
      },
    },
  })
);

export const Wrapper = styled.div`
  margin-left: 20px;
  max-width: 80px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover::before {
    content: "Remove";
    font-weight: bold;
    font-size: 1rem;
    position: absolute;
    color: #fff;
    z-index: 10;
  }

  &:hover::after {
    content: "";
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
    height: 100%;
    width: 100%;
  }

  img {
    width: 100%;
    object-fit: contain;

    @media (max-width: 900px) {
      width: 70px;
    }
  }
`;
