# customer-loyalty

customer-loyalty is a CLI program based on Nodejs that calculates Customer Loyalty Point.

## Requirements

- Node.js

## Features

- Calculating Total Amount Transactions
- Calculating Total Points
- Calculating Total Items

## Set Up

First clone this repo by run:

```sh
$ git clone https://github.com/notblessy/customer-loyalty
```

then go to the project folder

```sh
$ cd customer-loyalty
$ npm install
```

## Usage

To calculate transaction data which exists in `/test-data` folder locally, first you have to make the CLI available on your terminal by running:

```sh
$ npm i -g
```

Once it done, you can use the `loyalty` command. Available arguments are:

- `-f` the JSON file that contains order data.
- `-h` to show help message

For example:

```
$ loyalty -f test-data/data4.json
```

Example output:

```
{
  totalAmountTransaction: 5597329,
  totalPoints: 727,
  totalItems: 1545658
}
```

## Test

This CLI use Jest. To run the unit test:

```sh
$ npm run test
```

## Author

```
Frederich Blessy
```
