import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = this.find();

    const income = (await transactions)
      .filter(transaction => transaction.type === 'income')
      .map(item => item.value)
      .map(item => Number(item))
      .reduce((accum, curr) => accum + curr, 0);

    const outcome = (await transactions)
      .filter(transaction => transaction.type === 'outcome')
      .map(item => item.value)
      .map(item => Number(item))
      .reduce((accum, curr) => accum + curr, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }
}

export default TransactionsRepository;
