import styled from "styled-components";
import { makeStyles } from "@material-ui/core";

export const DialogWrapper = styled.div`
  display: flex;

  #dialog-img {
    max-width: 40%;
    max-height: 65vh;
    object-fit: contain;
    padding: 2rem;
  }
`;

export const useStyles = makeStyles({
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
  },
});
