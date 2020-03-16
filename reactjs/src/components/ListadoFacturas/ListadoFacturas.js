import React, {Fragment} from 'react';
import './listadoFacturas.scss';
import Factura from '../Factura/Factura';

const ListadoFacturas = ({facturas, guardarFactura}) => {
    
    return ( 
        <Fragment>
            {facturas.map(factura => (
                <a href="#!" key={factura._id} onClick={() => guardarFactura(factura)}>
                    <Factura 
                        factura={factura}
                    />
                </a>
            ))}
        </Fragment>
    );
}
 
export default ListadoFacturas;