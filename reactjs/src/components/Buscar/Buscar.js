import React, {useState} from 'react';
import './buscar.scss';
import Axios from 'axios';

const Buscar = ({guardarFacturas, guardarFactura}) => {

    const [busqueda, guardarBusqueda] = useState();
    const [error, actualizarError] = useState(false);

    const obtenerBuqueda = e => {
        guardarBusqueda(
            e.target.value
        );
    };

    const buscarFacturas = async e => {
        e.preventDefault();
        
        if (busqueda === undefined || busqueda.trim() === '') {
            console.log('La busqueda esta vacía');
            actualizarError(true);
            return;
        }

        actualizarError(false);

        const URL = `http://localhost:3001/payment/buscar/${busqueda}`;

        const facturas = await Axios.get(URL);

        guardarFactura(facturas.data.payments[0]);

        guardarFacturas(facturas.data.payments);
    };

    return ( 
        <form
            onSubmit={buscarFacturas}
        >
            {error ? <p className="alerta-error">El formulario esta vacío</p> : null}
            <div>
                <input 
                    type="text" 
                    name="line_number" 
                    placeholder="Filtrar por número..."
                    onChange={obtenerBuqueda}
                />
                <button type="submit"><i className="fas fa-search"></i></button>
            </div>
        </form>
     );
}
 
export default Buscar;