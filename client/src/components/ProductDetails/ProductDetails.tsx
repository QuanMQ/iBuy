import { useState, useContext, Fragment, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { useNavigate } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useQuery } from "react-query";
import {
  Breadcrumbs,
  Typography,
  Container,
  IconButton,
  ButtonGroup,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { NavigateNext, Remove, Add } from "@material-ui/icons";
import Item from "../Item/Item";
import ItemPurchaseConfirm from "../ItemPurchaseConfirm/ItemPurchaseConfirm";

// *Styles
import { Wrapper, useStyles } from "./ProductDetails.styles";

// *Types
import { CartItemType } from "../../App";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    state: { currentItem },
    dispatch,
  } = useContext(GlobalContext);
  const { container, crumbs, buttonGroup, related, input } = useStyles();
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "category",
    async (): Promise<CartItemType[]> =>
      await (
        await fetch(
          `https://fakestoreapi.com/products/category/${currentItem.category}`
        )
      ).json()
  );
  useEffect(() => {
    if (
      currentItem &&
      Object.keys(currentItem).length === 0 &&
      Object.getPrototypeOf(currentItem) === Object.prototype
    ) {
      navigate("/");
    }
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    if (quantity) {
      clickedItem.amount = quantity;
      dispatch({
        type: "ADD_TO_CART",
        payload: clickedItem,
      });
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value));
  };

  const removeItem = () => {
    setQuantity((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const addItem = () => {
    setQuantity((prev) => prev + 1);
  };

  const { category, description, title, price, image } = currentItem;

  return (
    <Fragment>
      <Container className={container}>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Typography color="textPrimary" className={crumbs}>
            Home
          </Typography>
          <Typography color="textPrimary" className={crumbs}>
            {category}
          </Typography>
          <Typography>{title}</Typography>
        </Breadcrumbs>
        <Wrapper>
          <img src={image} alt="" id="product-img" />
          <Box id="product-details">
            <Typography variant="h5">{title}</Typography>
            <Typography variant="h6">${price}</Typography>
            <Typography align="justify" id="description">
              {description}
            </Typography>
            <Box className={buttonGroup}>
              <ButtonGroup
                size="small"
                variant="contained"
                color="primary"
                disableRipple
              >
                <IconButton onClick={removeItem}>
                  <Remove />
                </IconButton>
                <IconButton>
                  <TextField
                    type="number"
                    className={input}
                    value={quantity}
                    variant="outlined"
                    size="small"
                    style={{ width: "150px" }}
                    onChange={handleQuantityChange}
                  />
                </IconButton>
                <IconButton onClick={addItem}>
                  <Add />
                </IconButton>
              </ButtonGroup>
              {!quantity && (
                <Typography color="error">
                  Error: Number of items cannot be smaller than 1
                </Typography>
              )}
              <Button
                size="large"
                variant="contained"
                disableElevation
                color="primary"
                onClick={() => {
                  handleAddToCart(currentItem);
                  if (quantity) {
                    handleModalOpen();
                    setLoading(true);
                  }
                }}
              >
                ADD TO CART
              </Button>
            </Box>
          </Box>
        </Wrapper>
        <ItemPurchaseConfirm
          title={title}
          isLoading={loading}
          isModalOpen={modalOpen}
          closeModal={handleModalClose}
        />
      </Container>
      <Container>
        <Typography
          className={related}
          align="center"
          display="block"
          variant="h4"
        >
          Related Products
        </Typography>
        <Splide
          options={{
            type: "slide",
            rewind: true,
            perPage: 4,
            pagination: false,
            gap: "1rem",
            arrows: "slider",
            height: "500px",
            breakpoints: {
              640: {
                perPage: 2,
              },
            },
          }}
          hasSliderWrapper
        >
          {isLoading && <CircularProgress />}
          {error && <div>Something went wrong...</div>}
          {data &&
            data
              .filter((item) => currentItem.id !== item.id)
              .map((item) => (
                <SplideSlide key={item.id}>
                  <Item item={item} />
                </SplideSlide>
              ))}
        </Splide>
      </Container>
    </Fragment>
  );
};

export default ProductDetails;
