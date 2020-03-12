const express = require('express');
let app = express();
let Payment = require('../models/payment');

app.get('/payment',  (req, res) => {

    Payment.find({})
        .sort('line_number')
        .populate('payment_history', 'period amount balance')
        .exec((err, payments) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                payments
            });
        
        });
});
  
app.post('/payment', (req, res) => {

    let body = req.body;
    
    let payment = new Payment({
        line_number: body.line_number,
        formatted_line_number: body.formatted_line_number,
        expiration_date: body.expiration_date,
        last_payment_date: body.last_payment_date,
        payment_reference: body.payment_reference,
        invoice_status: body.invoice_status,
        amount: body.amount,
        currency: body.currency,
        country_mobile_code: body.country_mobile_code,
        payment_history: body.payment_history
    });

    payment.save((err, paymentDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            payment: paymentDB
        });
    });

});

module.exports = app;
