import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    return response.json({
      transactions,
      balance,
    });
  } catch (err) {
    const erro = err as Error;
    return response.status(400).json({ error: erro.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );
    const transaction = createTransactionService.execute({
      title,
      type,
      value,
    });
    return response.status(200).json(transaction);
  } catch (err) {
    const erro = err as Error;
    return response.status(400).json({ error: erro.message });
  }
});

export default transactionRouter;
