import React from 'react';
import ModalReact from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    transform             : 'translate(-50%, -50%)',
    border                : 'none',
    background            : 'none',
    padding               : '0px',
    width                 : '80%'
  }
};
 
ModalReact.setAppElement('#root');

const Modal = ({modalIsOpen, setIsOpen, payment_history}) => {
    
    const closeModal = () => setIsOpen(false);

    let payments_history = payment_history['payment_history'];
    
    return ( 
        <ModalReact
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Historial de pagos</h5>
                        <button type="button" className="close" onClick={closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {
                            payments_history.length >  0
                            ? 
                            <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Período</th>
                                    <th scope="col">Valor de la factura</th>
                                    <th scope="col">Saldo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments_history.map(history => (
                                    <tr key={history._id}>
                                        <td>{history.period}</td>
                                        <td><span>$</span> {history.amount}</td>
                                        <td><span>$</span> {history.balance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                            :
                            <h1>No hay historial de pago</h1>
                        }
                    </div>
                </div>
                

        </ModalReact>
    );
}
 
export default Modal;