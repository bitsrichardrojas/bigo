import React, {Fragment, useState} from 'react';
import Modal from '../Modal/Modal';

const Info = ({factura, eliminarFactura}) => {

    const [modalIsOpen,setIsOpen] = useState(false);
    
    function openModal() {
        setIsOpen(true);
    }

    return ( 
        <Fragment>
            <h2><span>(+{factura.country_mobile_code})</span>{factura.formatted_line_number}</h2>
            <section>
                <div>
                    <div>
                        <span>Fecha de vencimiento:</span>
                        <span>{factura.expiration_date}</span>
                    </div>
                    <div>
                        <span>Fecha de último pago:</span>
                        <span>{factura.last_payment_date}</span>

                    </div>
                    <div>
                        <span>Estado de la factura:</span>
                        <span>{factura.invoice_status}</span>

                    </div>
                </div>
                <div>
                    <div>
                        <span>Referencia de pago:</span>
                        <span>{factura.payment_reference}</span>

                    </div>
                    <div>
                        <span>Valor a pagar:</span>
                        <span><i>$</i>{factura.amount}</span>
                    </div>
                </div>
            </section>
            <div className="actions">
                <a href="#!" onClick={openModal}>Ver historial de pagos</a>
                <button onClick={() => eliminarFactura(factura._id)}>Pagar</button>  
            </div>
            <Modal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}/>
        </Fragment>
    );
}
 
export default Info;