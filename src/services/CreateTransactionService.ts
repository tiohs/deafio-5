import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > total) {
      throw Error('This transitions is already booked');
    }
    const transactions = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transactions;
  }
}

export default CreateTransactionService;
