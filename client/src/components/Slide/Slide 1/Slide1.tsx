import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Moment from "react-moment";

// *Styles
import { useStyles } from "./Slide1.styles";

const x = 1000;

const Slide1 = () => {
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
    to: { opacity: 1, top: "30vh" },
    from: { opacity: 0, top: "10vh" },
    config: { duration: x },
    delay: x,
    reset: true,
  });
  const props2 = useSpring({
    to: { opacity: 1, bottom: titlePos },
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
          "url('https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2') no-repeat center center / cover",
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

export default Slide1;
