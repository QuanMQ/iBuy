import { Fragment } from "react";
import { Modal, Backdrop, Grow, CircularProgress } from "@material-ui/core";
import { Check } from "@material-ui/icons";

// *Styles
import { useStyles } from "./ItemPurchaseConfirm.styles";

// *Types
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
