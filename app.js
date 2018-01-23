const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const transactionAmount = process.env.TRANSACTION_AMOUNT_IN_CENTS;

const app = require("express")();
const fs = require("fs");
const stripe = require("stripe")(keySecret);

function logChargeData(charge){
    fs.readFile('./data/charges.json', function (err, data) {
        var json = JSON.parse(data)
        json.push(charge)

        fs.writeFile('./data/charges.json', JSON.stringify(json))
    })
}

app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({extended: false}));

app.get("/", function (req, res) {
    return res.render("index.pug", { keyPublishable: keyPublishable, transactionAmount: transactionAmount });
});

app.get("/charges", function (req, res) {
    var json = require('./data/charges.json');

    return res.render("charges.pug", { charges: json });
});

app.get("/data/charges", function (req, res) {
    var json = require('./data/charges.json');

    return res.json(json);
});

app.post("/charge", function (req, res) {
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    }).then(function (customer) {
        return stripe.charges.create({
            amount: transactionAmount,
            description: "Sample Charge",
            currency: "usd",
            customer: customer.id
        });
    }).then(function (charge) {
        logChargeData(charge);

        return res.render("confirmation.pug", { keyPublishable: keyPublishable, amount: charge.amount });
    });
});

app.listen(5000);
