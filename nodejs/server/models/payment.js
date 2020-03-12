const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

let statusValidos = {
    values: ['Vencida', 'Por pagar', 'Pagada'],
    message: '{VALUE} no es un estatus válido'
};

let paymentSchema = new Schema({
    line_number: { 
        type: String,
        unique: true,
        required: [true, 'El numero de telefono es necesario']
    },
    formatted_line_number: { 
        type: String,
        unique: true,
        required: [true, 'El numero de telefono formateado es necesario'] 
    },
    expiration_date: { 
        type: Date,
        required: [true, 'La fecha de expiración es necesario'] 
    },
    last_payment_date: { 
        type: Date,
        required: [true, 'La ultima fecha de pago es necesaria'] 
    },
    payment_reference: { 
        type: Number,
        unique: true,
        required: [true, 'La referencia de pago es necesario'] 
    },
    invoice_status: { 
        type: String,
        default: 'Por pagar', 
        enum: statusValidos, 
        required: [true, 'El estado de la factura es necesari'] 
    },
    amount: { 
        type: Number,
        required: [true, 'El monto a pagar es necesario'] 
    },
    currency: { 
        type: String,
        required: [true, 'El tipo de moneda es necesario'] 
    },
    country_mobile_code: { 
        type: Number,
        required: [true, 'El código de país es necesario'] 
    },
    payment_history: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'PaymentHistory',
        default: null, 
        required: false 
    }]
});

paymentSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
});

module.exports = mongoose.model('Payment', paymentSchema);