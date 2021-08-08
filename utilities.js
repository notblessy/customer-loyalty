const fsp = require('fs').promises;

exports.multiplier = (total) => {
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

exports.transactionHistory = async () => {
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
