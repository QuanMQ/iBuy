import { useState, Fragment } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Typography, Box } from "@material-ui/core";
import Slide1 from "../Slide/Slide 1/Slide1";
import Slide2 from "../Slide/Slide 2/Slide2";
import Slide3 from "../Slide/Slide 3/Slide3";
import Shop from "../Shop/Shop";

// *Styles
import { useStyles } from "./Home.styles";

function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const { box, heading } = useStyles();

  return (
    <Fragment>
      <Splide
        options={{
          type: "loop",
          autoplay: true,
          pauseOnHover: false,
          arrows: "slider",
          height: "100vh",
        }}
        hasSliderWrapper
        onMove={(splide, next, prev) => {
          setSlideIndex(next);
        }}
      >
        <SplideSlide>
          <Slide1 key={slideIndex} />
        </SplideSlide>
        <SplideSlide>
          <Slide2 key={slideIndex} />
        </SplideSlide>
        <SplideSlide>
          <Slide3 key={slideIndex} />
        </SplideSlide>
      </Splide>
      <Box className={box}>
        <Typography variant="h3" className={heading}>
          Product Overview
        </Typography>
        <Shop />
      </Box>
    </Fragment>
  );
}

export default Home;
