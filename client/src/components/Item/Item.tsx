import { useState } from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import ItemQuickView from "../ItemQuickView/ItemQuickView";

// *Styles
import { Wrapper, useStyles } from "./Item.styles";

// *Types
import { CartItemType } from "../../App";

type Props = {
  item: CartItemType;
};

const Item: React.FC<Props> = ({ item }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { root, link } = useStyles();
  const props = useSpring({
    to: { opacity: 1, scale: 1 },
    from: { opacity: 0, scale: 0 },
    config: { duration: 500 },
  });

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <animated.div style={props}>
      <Card className={root}>
        <Wrapper>
          <CardMedia
            component="img"
            title={item.title}
            alt={item.title}
            image={item.image}
          />
          <Button variant="contained" onClick={handleDialogOpen}>
            Quick View
          </Button>
        </Wrapper>
        <CardContent>
          <Typography
            className={link}
            color="primary"
            variant="subtitle1"
            component={Link}
            to={`/products/${item.id}`}
          >
            {item.title}
          </Typography>
          <Typography variant="subtitle2" color="textPrimary" component="p">
            ${item.price}
          </Typography>
        </CardContent>
      </Card>
      <ItemQuickView
        item={item}
        isDialogOpen={dialogOpen}
        closeDialog={handleDialogClose}
      />
    </animated.div>
  );
};

export default Item;
