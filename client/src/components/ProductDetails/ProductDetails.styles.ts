import styled from "styled-components";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const Wrapper = styled.div`
  display: flex;
  margin-top: 1rem;

  #product-img {
    max-width: 40%;
    max-height: 65vh;
    object-fit: contain;
    padding: 2rem;
  }

  #product-details {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    > * {
      margin-top: 15px;
    }
  }

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;

    #product-img {
      max-width: 100%;
    }

    #product-details {
      align-items: center;

      h5 {
        text-align: center;
      }
    }
  }
`;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: "6rem",
      height: "100vh",
      [theme.breakpoints.down(900)]: {
        height: "auto",
      },
    },
    crumbs: {
      textTransform: "capitalize",
      cursor: "pointer",
      transition: "color 0.15s linear",
      "&:hover": {
        color: "#717FE0",
      },
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexDirection: "column",
      height: "135px",
      "& > button:last-of-type": {
        borderRadius: "50px",
        "&:hover": {
          backgroundColor: "#000",
          color: "#fff",
        },
      },
      [theme.breakpoints.down(900)]: {
        alignItems: "center",
      },
    },
    input: {
      "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
        {
          "-webkit-appearance": "none",
          margin: "0",
        },
      "& input[type=number]": {
        "-moz-appearance": "textfield",
      },
    },
    related: {
      borderTop: "solid #F2F2F2 50px",
      fontWeight: "bold",
      paddingTop: "1.5rem",
      margin: "2rem auto",
    },
  })
);
