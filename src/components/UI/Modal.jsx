const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.closeHandler}></div>;
};

const ModalOverlay = (props) => {
  return <div className="modal">{props.children}</div>;
};

const Modal = (props) => {
  return (
    <>
      {/* <Backdrop onClick={props.closeHandler}/> */}
      <ModalOverlay>{props.children}</ModalOverlay>
    </>
  );
};

export default Modal;
