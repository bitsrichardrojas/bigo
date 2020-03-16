const express = require('express');
let app = express();
let Payment = require('../models/payment');
let PaymentHistory = require('../models/paymentHistory');

app.get('/payment',  (req, res) => {

    Payment.find({})
        .populate('payment_history')
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

app.get('/payment/:id',  (req, res) => {
    
    let id = req.params.id;

    Payment.findById(id)
        .populate('payment_history')
        .exec((err, payment) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
    
            if (!payment) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El id no es correcto'
                    }
                });
            }
    
            res.json({
                ok: true,
                payment
            });
        
        });
});

app.get('/payment/buscar/:termino', (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Payment.find({line_number: regex})
        .populate('payment_history')
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

    let paymentHistory = new PaymentHistory();

    paymentHistory.save((err, paymentHistoryDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

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
            payment_history: paymentHistoryDB._id
        });
    
        payment.save((err, paymentDB) => {
            if (err) {

                PaymentHistory.findByIdAndRemove(paymentHistoryDB._id, (err, paymentHistoryBorrada) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        });
                    }
            
                    if (paymentHistoryBorrada === null) {
                        return res.status(400).json({
                            ok: false,
                            err: {
                                message: 'Historial de factura no encontrado'
                            }
                        });
                    }
                });
                
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
    
});

module.exports = app;
