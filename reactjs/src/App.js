import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header/Header';
import Buscar from './components/Buscar/Buscar';
import ListadoFacturas from './components/ListadoFacturas/ListadoFacturas';
import Info from './components/Info/Info';
import Axios from 'axios';

function App() {

  const [factura, guardarFactura] = useState({});
  const [facturas, guardarFacturas] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const URL = `http://localhost:3001/payment`;

      const facturas = await Axios.get(URL);

      guardarFactura(facturas.data.payments[0]);
      
      guardarFacturas(facturas.data.payments);
      
    };

    consultarAPI();
  }, []);

  const eliminarFactura = id => {
    const nuevasFacturas = facturas.filter(factura => factura._id !== id);
    guardarFactura(nuevasFacturas[0]);
    guardarFacturas(nuevasFacturas);
  };

  return (
    <Fragment>
      <Header />
      <h1>Pagar facturas</h1>
      <section>
        <div className="facturas">
          <Buscar guardarFacturas={guardarFacturas} guardarFactura={guardarFactura}/>
          <ListadoFacturas facturas={facturas} guardarFactura={guardarFactura}/>
        </div>
        <div className="info">
          { 
            factura !== undefined ?  
            <Info 
              factura={factura} 
              eliminarFactura={eliminarFactura}
            /> : 
            <h1>No hay facturas</h1> 
          }
        </div>
      </section>
    </Fragment>
  );
}

export default App;
