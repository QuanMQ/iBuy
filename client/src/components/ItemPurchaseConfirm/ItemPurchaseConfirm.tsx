import { Fragment } from "react";
import {
  makeStyles,
  Modal,
  Backdrop,
  Grow,
  CircularProgress,
} from "@material-ui/core";
import { Check } from "@material-ui/icons";

// *Styles
const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    color: "#A5DC86",
  },
  check: {
    color: "#A5DC86",
    fontSize: "4rem",
  },
  paper: {
    width: "500px",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "5px",
    "& > *": {
      fontFamily:
        "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
    },
    "& p": {
      fontSize: "1.5rem",
    },
    "& button": {
      cursor: "pointer",
      alignSelf: "flex-end",
      padding: "10px 20px",
      borderRadius: "7px",
      backgroundColor: "#7CD1F9",
      fontSize: "1.2rem",
      fontWeight: "bold",
      letterSpacing: "2px",
      "&:active": {
        backgroundColor: "#0BA3EA",
      },
    },
  },
});

type Props = {
  title: string;
  isModalOpen: boolean;
  isLoading: boolean;
  closeModal: () => void;
};

const ItemPurchaseConfirm: React.FC<Props> = ({
  title,
  isModalOpen,
  isLoading,
  closeModal,
}) => {
  const { modal, paper, spinner, check } = useStyles();

  return (
    <Fragment>
      <Modal
        aria-labelledby="confirm-purchase-title"
        aria-describedby="confirm-purchase-description"
        open={isModalOpen}
        onClose={closeModal}
        closeAfterTransition
        disableRestoreFocus
        className={modal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Grow in={isModalOpen}>
          <div className={paper}>
            {isLoading ? (
              <CircularProgress className={spinner} size="4rem" />
            ) : (
              <Check className={check} />
            )}
            <h2 id="confirm-purchase-title">{title}</h2>
            <p id="confirm-purchase-description">is added to cart!</p>
            <button autoFocus type="button" onClick={closeModal}>
              OK
            </button>
          </div>
        </Grow>
      </Modal>
    </Fragment>
  );
};

export default ItemPurchaseConfirm;
