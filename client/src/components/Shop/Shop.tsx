import { useState, Fragment } from "react";
import { useQuery } from "react-query";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Container,
  LinearProgress,
} from "@material-ui/core";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import TabPanelInner from "../TabPanelInner/TabPanelInner";

// *Styles
import { useStyles } from "./Shop.styles";

// *Types
import { CartItemType } from "../../App";

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const categories = [
  "all",
  "Women's Clothing",
  "Men's Clothing",
  "Jewelery",
  "Electronics",
];

function Shop() {
  const { tab, root } = useStyles();
  const [value, setValue] = useState(0);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const tabs = categories.map((category, index) => (
    <Tab
      key={index}
      label={category}
      {...a11yProps(index)}
      disableRipple
      className={tab}
    />
  ));

  const tabPanel = categories.map((category, index) => (
    <TabPanel key={index} value={value} index={index}>
      {isLoading && <LinearProgress />}
      {error && <div>Something went wrong...</div>}
      {data && (
        <TabPanelInner
          data={
            category === "all"
              ? data
              : data.filter((item) => item.category === category.toLowerCase())
          }
        />
      )}
    </TabPanel>
  ));

  return (
    <Fragment>
      <Container>
        <Navbar />
        <AppBar position="static" className={root}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
          >
            {tabs}
          </Tabs>
        </AppBar>
        {tabPanel}
      </Container>
      <Footer />
    </Fragment>
  );
}

export default Shop;
