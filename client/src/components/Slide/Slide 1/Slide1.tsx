import { useSpring, animated } from "react-spring";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Moment from "react-moment";

// *Styles
import { useStyles } from "./Slide1.styles";

const x = 1000;

const Slide1 = () => {
  const { title, subTitle } = useStyles();
  const props1 = useSpring({
    to: { opacity: 1, top: "30vh" },
    from: { opacity: 0, top: "10vh" },
    config: { duration: x },
    delay: x,
    reset: true,
  });
  const props2 = useSpring({
    to: { opacity: 1, bottom: "50vh" },
    from: { opacity: 0, bottom: "30vh" },
    config: { duration: x },
    delay: x * 2,
    reset: true,
  });
  const props3 = useSpring({
    to: { scale: 1 },
    from: { scale: 0 },
    config: { duration: x },
    delay: x * 3,
    reset: true,
  });
  return (
    <div
      style={{
        background:
          "url('https://preview.colorlib.com/theme/cozastore/images/xslide-01.jpg.pagespeed.ic.XotvXKn0Mi.webp') no-repeat center center / cover",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <animated.div style={{ position: "absolute", left: "50px", ...props1 }}>
        <Typography variant="h4" className={subTitle}>
          Women Collection <Moment format="YYYY">{Date.now()}</Moment>
        </Typography>
      </animated.div>
      <animated.div style={{ position: "absolute", left: "50px", ...props2 }}>
        <Typography variant="h2" className={title}>
          New Season
        </Typography>
      </animated.div>
      <animated.div
        style={{
          position: "absolute",
          bottom: "40vh",
          left: "50px",
          ...props3,
        }}
      >
        <Button
          component={Link}
          to="/shop"
          variant="contained"
          color="primary"
          size="large"
          style={{ borderRadius: "20px" }}
        >
          Shop now
        </Button>
      </animated.div>
    </div>
  );
};

export default Slide1;
