import { Container, Card, CardContent, Typography } from "@material-ui/core";
import { Error } from "@material-ui/icons";
import { useStyles } from "./LoginFailed.styles";

function LoginFailed() {
  const { root, card } = useStyles();

  return (
    <Container className={root}>
      <Card className={card}>
        <CardContent>
          <Typography variant="h3" align="center" gutterBottom>
            <Error fontSize="large" /> <strong>Oops</strong>
          </Typography>
          <Typography align="center" variant="h6">
            Something went wrong.
          </Typography>
          <Typography align="center" variant="h6">
            Please try again later.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default LoginFailed;
