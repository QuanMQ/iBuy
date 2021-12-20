import styled from "styled-components";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const Wrapper = styled.aside`
  font-family: Arial, Helvetica, sans-serif;
  width: 500px;
  padding: 20px;

  @media (max-width: 768px) {
    width: 400px;
  }

  span#noItems {
    display: inline-block;
    margin: 20px auto;
  }
`;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      fontWeight: "bold",
      borderRadius: "20px",
      width: "70%",
      marginTop: "20px",
      backgroundColor: "#222",
      color: "#fff",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
      "&:hover": {
        backgroundColor: "#717FE0",
      },
    },
    box: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);
