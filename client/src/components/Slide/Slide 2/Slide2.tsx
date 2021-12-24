import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

// *Styles
import { useStyles } from "./Slide2.styles";

const x = 650;

const Slide2 = () => {
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
    to: { left: "50px", rotateZ: 0, opacity: 1 },
    from: { left: "-100px", rotateZ: -120, opacity: 0 },
    config: { duration: x },
    delay: x,
    reset: true,
  });
  const props2 = useSpring({
    to: { left: "50px", skewX: 0, opacity: 1 },
    from: { left: "500px", skewX: -80, opacity: 0 },
    config: { duration: x },
    delay: x * 2,
    reset: true,
  });
  const props3 = useSpring({
    to: { bottom: buttonPos, opacity: 1 },
    from: { bottom: "20vh", opacity: 0 },
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
          "url('https://preview.colorlib.com/theme/cozastore/images/xslide-02.jpg.pagespeed.ic.__MQeyG5T4.webp') no-repeat center center / cover",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <animated.div style={{ position: "absolute", top: "30vh", ...props1 }}>
        <Typography variant="h4" className={subTitle}>
          Men New Season
        </Typography>
      </animated.div>
      <animated.div
        style={{ position: "absolute", bottom: titlePos, ...props2 }}
      >
        <Typography variant="h2" className={title}>
          Jackets & Coats
        </Typography>
      </animated.div>
      <animated.div
        style={{
          position: "absolute",
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

export default Slide2;
