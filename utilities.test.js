const { expect, it } = require('@jest/globals');
const { multiplier, transactionHistory } = require('./utilities.js');

describe('Test Loyalty CLI', () => {
  it('should multiply the transaction according the rule', () => {
    const test1 = multiplier(500000);
    expect(test1).toBe(1);

    const test2 = multiplier(1200000);
    expect(test2).toBe(1.05);

    const test3 = multiplier(14000000);
    expect(test3).toBe(1.1);

    const test4 = multiplier(22000000);
    expect(test4).toBe(1.2);

    const test5 = multiplier(35000000);
    expect(test5).toBe(1.3);

    const test6 = multiplier(200000000);
    expect(test6).toBe(1.4);
  });

  it('should return transaction history in HashMap', async () => {
    const history = await transactionHistory();
    expect(history).toEqual({
      bruce_banner: 33310000,
      peter_parker: 78000000,
      stephen_strange: 16000000,
      steve_rogers: 10000000,
      tony_stark: 14000000,
      wanda_maximoff: 13000000,
    });
  });
});
