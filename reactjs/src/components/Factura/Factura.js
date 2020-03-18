import React, {Fragment} from 'react';
import getDate from '../../helpers/FormatDate';
import formatNumber from '../../helpers/FormatNumber';
 
const Factura = ({factura}) => {
    
    const {
        country_mobile_code,
        formatted_line_number,
        invoice_status,
        amount,
        expiration_date
    } = factura;

    return ( 
        <Fragment>
            <div>
                <span><i>(+{country_mobile_code})</i> {formatted_line_number}</span>
                <span className={invoice_status === 'Vencida' ? 'orange' : 'blue'}>{invoice_status}</span>
            </div>
            <div>
                <span>{formatNumber.new(amount, "$")}</span>
                <span>{getDate(expiration_date)}</span>
            </div>
        </Fragment>
    );
}
 
export default Factura;