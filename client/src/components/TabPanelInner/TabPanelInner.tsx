import { Grid } from "@material-ui/core";
import Item from "../Item/Item";
import { CartItemType } from "../../App";

type Props = {
  data: CartItemType[];
};

const TabPanelInner: React.FC<Props> = ({ data }) => {
  return (
    <Grid container spacing={3}>
      {data.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={3}>
          <Item item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TabPanelInner;
