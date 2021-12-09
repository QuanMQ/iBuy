import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
      textTransform: "uppercase",
      [theme.breakpoints.down(768)]: {
        fontSize: "3rem",
      },
    },
    subTitle: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      [theme.breakpoints.down(768)]: {
        fontSize: "1.5rem",
      },
    },
  })
);
