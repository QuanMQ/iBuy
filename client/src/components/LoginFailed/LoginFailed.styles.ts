import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "flex-start",
    background:
      "url('https://images.pexels.com/photos/5632404/pexels-photo-5632404.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') no-repeat center center / cover",
  },
  card: {
    marginTop: "10rem",
    padding: "1.5rem 1rem",
  },
});
