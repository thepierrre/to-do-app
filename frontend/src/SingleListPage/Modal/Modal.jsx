const ModalOverlay = (props) => {
  return <div className="edit-modal">{props.children}</div>;
};

const Modal = (props) => {
  return (
    <>
      <ModalOverlay>{props.children}</ModalOverlay>
    </>
  );
};

export default Modal;
