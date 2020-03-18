import React, { useState, useEffect} from 'react';
import './listadoFacturas.scss';
import Factura from '../Factura/Factura';

const ListadoFacturas = ({facturas, guardarFactura}) => {
    
    const [idSeleccionado, guardarIdSeleccionado] = useState();

    useEffect(() => {
        const obtenerPrimeraFactura = () => {
            if (facturas[0] !== undefined) {
                guardarIdSeleccionado(facturas[0]._id);
            }
        };
        obtenerPrimeraFactura();
    }, [facturas]);
    
    return ( 
        <div className="listado-facturas">
            {facturas.map(factura => (
                <div 
                    className={`section-payment ${idSeleccionado === factura._id ? 'active' : ''}`} 
                    key={factura._id}
                    onClick={() => {
                        guardarFactura(factura);
                        guardarIdSeleccionado(factura._id)
                    }}
                >
                    <Factura 
                        factura={factura}
                    />
                </div>
            ))}
        </div>
    );
}
 
export default ListadoFacturas;