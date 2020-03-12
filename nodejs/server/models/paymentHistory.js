var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentHistorySchema = new Schema({
    period: { type: String, required: [true, 'El periodo es necesario'] },
    amount: { type: Number, required: [true, 'El monto es necesario'] },
    balance: { type: Number, required: [true, 'El balance es necesario'] },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment', required: true }
});

module.exports = mongoose.model('PaymentHistory', paymentHistorySchema);