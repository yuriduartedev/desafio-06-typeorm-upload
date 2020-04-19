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
      .reduce((sum, actual) => sum + actual.value, 0);

    const outcome = (await transactions)
      .filter(transaction => transaction.type === 'outcome')
      .reduce((sum, actual) => sum + actual.value, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }
}

export default TransactionsRepository;
