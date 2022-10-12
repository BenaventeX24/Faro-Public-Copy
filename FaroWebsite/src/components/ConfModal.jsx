import React from 'react';
import Modal from "react-modal"

const ConfModal = ({show, close, state}) => {
    // const [modalIsOpen, setModalIsOpen] = useState(false)

    // Modal.setAppElement("#root")
    // function openModal() {
    //   setModalIsOpen(true)
    //   setTimeout(() => {
    //     closeModal()
    //   }, 5000)
    // }
  
    // function closeModal() {
    //   setModalIsOpen(false)
    // }
  
    return (
    <Modal
        isOpen={show}
        onRequestClose={close}
        contentLabel="Confirmaiton modal"
        className="text-white"
      >
        {state ? <p>Centro Añadido</p> : <p>No se pudo añadir el centro intente recargando la pagina</p>}
    </Modal>
    )
}
 
export default ConfModal;
