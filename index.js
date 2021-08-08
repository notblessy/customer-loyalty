#!/usr/bin/env node

const fsp = require('fs').promises;
const { program } = require('commander');

const log = console.log;

program.version('0.0.1');

program.option('-f, --file <type>', 'JSON file contains order data');
program.parse(process.argv);

const multiplier = (total) => {
  switch (true) {
    case total > 1000000 && total <= 10000000:
      return 1.05;
    case total > 10000000 && total <= 20000000:
      return 1.1;
    case total > 20000000 && total <= 30000000:
      return 1.2;
    case total > 30000000 && total <= 40000000:
      return 1.3;
    case total > 40000000:
      return 1.4;
    default:
      return 1;
  }
};

const transactionHistory = async () => {
  const transactionFile = await fsp.readFile('transaction.json', 'utf-8');
  const transaction = JSON.parse(transactionFile);

  const transactionData = transaction.reduce((initialValue, item) => {
    const key = item.user;
    if (initialValue[key]) {
      initialValue[key] += item.total_amount_transaction;
    } else {
      initialValue[key] = item.total_amount_transaction;
    }
    return initialValue;
  }, {});
  return transactionData;
};

const countTotalAmountTransactionAndPoints = async (order) => {
  const transactionData = await transactionHistory();
  let totalTransaction = 0;

  if (transactionData.hasOwnProperty(order.user)) {
    totalTransaction = transactionData[order.user];
  }

  const totalItems = order.products.reduce((initialValue, product) => {
    initialValue += product.qty;
    return initialValue;
  }, 0);

  const totalAmountTransaction = order.products.reduce(
    (initialValue, product) => {
      initialValue += product.qty * product.price;
      return initialValue;
    },
    0
  );

  const points =
    Math.floor(totalAmountTransaction / 10000) * multiplier(totalTransaction);

  return {
    totalAmountTransaction: totalAmountTransaction,
    totalPoints: Math.round(points),
    totalItems: totalItems,
  };
};

async function main(filepath) {
  const data = await fsp.readFile(filepath, 'utf-8');

  const result = await countTotalAmountTransactionAndPoints(JSON.parse(data));
  log(result);
}

const options = program.opts();

if (!options.file) {
  log('Error: Must provide file!');
  return;
}

main(options.file);
