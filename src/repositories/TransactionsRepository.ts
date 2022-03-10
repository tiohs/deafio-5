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

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transetion: Transaction) => {
        switch (transetion.type) {
          case 'income':
            accumulator.income += transetion.value;
            break;
          case 'outcome':
            accumulator.outcome += transetion.value;
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;
    return { total, income, outcome };
  }

  public create({ title, type, value }: CreateTransactionsDTO): Transaction {
    const transactions = new Transaction({ title, type, value });
    this.transactions.push(transactions);
    return transactions;
  }
}

export default TransactionsRepository;
