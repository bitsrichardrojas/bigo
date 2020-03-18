import React, {Fragment, useState} from 'react';
import './info.scss';
import Modal from '../Modal/Modal';
import getDate from '../../helpers/FormatDate';

const Info = ({factura, eliminarFactura}) => {

    const [modalIsOpen,setIsOpen] = useState(false);
    
    const openModal = () => setIsOpen(true);

    const {
        _id,
        country_mobile_code,
        formatted_line_number, 
        expiration_date, 
        last_payment_date, 
        invoice_status, 
        payment_reference, 
        amount,
        payment_history
    } = factura;

    return ( 
        <Fragment>
            <h2><span>(+{country_mobile_code})</span>{formatted_line_number}</h2>
            <div className="details">
                <div className="detail-left">
                    <div>
                        <span>Fecha de vencimiento:</span>
                        <span>{getDate(expiration_date)}</span>
                    </div>
                    <div>
                        <span>Fecha de último pago:</span>
                        <span>{getDate(last_payment_date)}</span>
                    </div>
                    <div>
                        <span>Estado de la factura:</span>
                        <span className={`invoice ${invoice_status === 'Vencida' ? 'orange' : 'blue'}`}>{invoice_status}</span>
                    </div>
                </div>
                <div className="detail-right">
                    <div>
                        <span>Referencia de pago:</span>
                        <span>{payment_reference}</span>
                    </div>
                    <div>
                        <span>Valor a pagar:</span>
                        <span><i>$</i>{amount}</span>
                    </div>
                </div>
            </div>
            <div className="actions">
                <a href="#!" onClick={openModal}>Ver historial de pagos</a>
                <button onClick={() => eliminarFactura(_id)}>Pagar</button>  
            </div>
            {   
                modalIsOpen 
                ? <Modal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} payment_history={payment_history} />
                : null
            }
            
        </Fragment>
    );
}
 
export default Info;