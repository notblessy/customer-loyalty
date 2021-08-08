#!/usr/bin/env node

const fsp = require('fs').promises;
const { program } = require('commander');
const { multiplier, transactionHistory } = require('./utilities.js');

const log = console.log;

program.version('0.0.1');

program.option('-f, --file <type>', 'JSON file contains order data');
program.parse(process.argv);

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
