import styled from "styled-components";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const DialogWrapper = styled.div`
  display: flex;

  #dialog-img {
    max-width: 40%;
    max-height: 65vh;
    object-fit: contain;
    padding: 2rem;
  }

  h5 {
    padding-right: 15px;
  }

  @media (max-width: 576px) {
    flex-direction: column;

    #dialog-img {
      margin-top: 20px;
      max-width: 100%;
    }

    h5 {
      font-size: 1.375rem;
      padding-right: 0;
    }

    h5,
    p:first-of-type {
      text-align: center;
    }
  }
`;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      position: "absolute",
      right: 10,
      top: 5,
      color: "grey",
    },
    dialogButton: {
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexDirection: "column",
      height: "150px",
      "& > button:last-of-type": {
        borderRadius: "50px",
        "&:hover": {
          backgroundColor: "#000",
          color: "#fff",
        },
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "center",
        height: "175px",
      },
    },
  })
);
