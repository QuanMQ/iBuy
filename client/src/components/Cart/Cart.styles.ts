import styled from "styled-components";
import { makeStyles } from "@material-ui/core";

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

export const useStyles = makeStyles({
  button: {
    fontWeight: "bold",
    borderRadius: "20px",
    width: "40%",
    backgroundColor: "#222",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#717FE0",
    },
  },
  box: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-evenly",
  },
});
