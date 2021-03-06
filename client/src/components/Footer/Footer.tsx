import {
  Container,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Moment from "react-moment";

// *Styles
import { useStyles, CssTextField } from "./Footer.styles";

function Footer() {
  const { container, flexBox, heading, hover, email, button, copyright } =
    useStyles();

  return (
    <Container className={container}>
      <Box className={flexBox}>
        <Box flexBasis="50%">
          <List>
            <ListItem>
              <ListItemText disableTypography>
                <Typography variant="subtitle1" className={heading}>
                  Categories
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem component={Link} to="/shop">
              <ListItemText className={hover} primary="Women's Clothing" />
            </ListItem>
            <ListItem component={Link} to="/shop">
              <ListItemText className={hover} primary="Men's Clothing" />
            </ListItem>
            <ListItem component={Link} to="/shop">
              <ListItemText className={hover} primary="Jewelery" />
            </ListItem>
            <ListItem component={Link} to="/shop">
              <ListItemText className={hover} primary="Electronics" />
            </ListItem>
          </List>
        </Box>
        <Box flexBasis="40%">
          <List>
            <ListItem>
              <ListItemText disableTypography>
                <Typography variant="subtitle1" className={heading}>
                  Help
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText className={hover} primary="Track Order" />
            </ListItem>
            <ListItem>
              <ListItemText className={hover} primary="Returns" />
            </ListItem>
            <ListItem>
              <ListItemText className={hover} primary="Shipping" />
            </ListItem>
            <ListItem>
              <ListItemText className={hover} primary="FAQs" />
            </ListItem>
          </List>
        </Box>
        <Box>
          <List>
            <ListItem>
              <ListItemText disableTypography>
                <Typography variant="subtitle1" className={heading}>
                  Get in touch
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Any questions? Let us know in store at 8th floor, Bitexco Tower, Ho
                  Chi Minh City or call us on (+84) 090 1234 567"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <IconButton className={hover}>
                  <Facebook />
                </IconButton>
                <IconButton className={hover}>
                  <Instagram />
                </IconButton>
                <IconButton className={hover}>
                  <Twitter />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          </List>
        </Box>
        <Box flexBasis="60%">
          <List>
            <ListItem>
              <ListItemText disableTypography>
                <Typography variant="subtitle1" className={heading}>
                  Newsletter
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <CssTextField
                className={email}
                variant="outlined"
                label="Enter Your Email"
                placeholder="email@example.com"
                fullWidth
              />
            </ListItem>
            <ListItem>
              <Button
                className={button}
                size="large"
                disableElevation
                color="primary"
                variant="contained"
              >
                Subscribe
              </Button>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Typography className={copyright}>
        Copyright &copy;<Moment format="YYYY">{Date.now()}</Moment> All rights
        reserved by QuanMQ
      </Typography>
    </Container>
  );
}

export default Footer;
