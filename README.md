1. Clone or download into empty directory

2. Open terminal and navigate to directory in step 1

3. run ```npm install```

4. run ```PUBLISHABLE_KEY=${STRIPE_PUBLIC_KEY} SECRET_KEY=#{STRIPE_SECRET_KEY} TRANSACTION_AMOUNT_IN_CENTS=${TRANSACTION_AMOUNT_IN_CENTS} node app.js``` using your stripe API credentials and a transaction amount (in cents!)

5. Navigate to http://localhost:5000 in your web browser

Routes:

```/```: pay button

```/data/charges```: raw transaction data


```/charges```: html charge data

Notes:
- Transaction records will be written to a local file in the project directory under ./data/charges.json. You can view the file in a text editor or open a browser while the app is running to http://localhost:5000/data/charges
