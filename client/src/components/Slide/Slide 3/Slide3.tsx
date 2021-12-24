import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Moment from "react-moment";

// *Styles
import { useStyles } from "./Slide3.styles";

const x = 850;

const Slide3 = () => {
  const { title, subTitle } = useStyles();
  const [titlePos, setTitlePos] = useState("50vh");
  const [buttonPos, setButtonPos] = useState("40vh");
  useEffect(() => {
    calPos();
  });
  useEffect(() => {
    window.addEventListener("resize", calPos);
    return () => {
      window.removeEventListener("resize", calPos);
    };
  }, []);
  const props1 = useSpring({
    to: { opacity: 1, rotateZ: 0 },
    from: { opacity: 0, rotateZ: -90 },
    config: { duration: x },
    delay: x,
    reset: true,
  });
  const props2 = useSpring({
    to: { opacity: 1, rotateZ: 0 },
    from: { opacity: 0, rotateZ: -90 },
    config: { duration: x },
    delay: x * 2,
    reset: true,
  });
  const props3 = useSpring({
    to: { opacity: 1, rotateZ: 0 },
    from: { opacity: 0, rotateZ: -180 },
    config: { duration: x },
    delay: x * 3,
    reset: true,
  });

  const calPos = () => {
    if (window.innerWidth < 576) {
      setTitlePos("55vh");
      setButtonPos("45vh");
    }
  };

  return (
    <div
      style={{
        background:
          "url('https://preview.colorlib.com/theme/cozastore/images/xslide-03.jpg.pagespeed.ic.tP-L47NU9M.webp') no-repeat center center / cover",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <animated.div
        style={{
          position: "absolute",
          left: "50px",
          top: "30vh",
          transformOrigin: "left center",
          ...props1,
        }}
      >
        <Typography variant="h4" className={subTitle}>
          Men Collection <Moment format="YYYY">{Date.now()}</Moment>
        </Typography>
      </animated.div>
      <animated.div
        style={{
          position: "absolute",
          left: "50px",
          bottom: titlePos,
          transformOrigin: "right center",
          ...props2,
        }}
      >
        <Typography variant="h2" className={title}>
          New Arrivals
        </Typography>
      </animated.div>
      <animated.div
        style={{
          position: "absolute",
          bottom: buttonPos,
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

export default Slide3;
