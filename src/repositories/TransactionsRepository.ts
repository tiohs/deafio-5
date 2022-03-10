import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionsDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  // public all(): Transaction[] {
  //   // TODO
  // }

  // public getBalance(): Balance {
  //   // TODO
  // }

  public create({ title, type, value }: CreateTransactionsDTO): Transaction {
    const transactions = new Transaction({ title, type, value });
    this.transactions.push(transactions);
    return transactions;
  }
}

export default TransactionsRepository;
