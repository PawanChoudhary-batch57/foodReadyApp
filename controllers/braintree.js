
const braintree=require('braintree');
require('dotenv').config();


const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox, // Production
    merchantId: 'dbk5r82spk7t3s2q',
    publicKey: 'n6d79tt2n6jcqmhk',
    privateKey: 'ef605132cce9ba8d48a54f54217505bd'
});

exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, function(err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    // charge
    let newTransaction = gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true,
                
            }
        },
        (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }
    );
};


