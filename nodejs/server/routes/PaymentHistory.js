const express = require('express');
let app = express();
let PaymentHistory = require('../models/paymentHistory');

app.get('/paymentHistory',  (req, res) => {

    PaymentHistory.find({})
        .sort('payment')
        .populate('payment', 'line_number payment_reference')
        .exec((err, paymentHistory) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                paymentHistory
            });
        
        });
});
  
app.post('/paymentHistory', (req, res) => {

    let body = req.body;
    
    let paymentHistory = new PaymentHistory({
        period: body.period,
        amount: body.amount,
        balance: body.balance,
        payment: body.payment
    });

    paymentHistory.save((err, paymentHistoryDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            paymentHistory: paymentHistoryDB
        });
    });

});

module.exports = app;
