import { Request, Response } from "express";
import { Transaction } from "@prisma/client";
import userService from "../services/userService";
import TransactionService from "../services/transactionService";
import transactionService from "../services/transactionService";


async function getTransactionsByUserId(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userService.getUserIdByToken(auth);
  if(userId) {
    try {
      const transactions = await TransactionService.findTransactionByUserId(userId);
      return response.status(200).json(transactions);
    } catch(error) {
      return response.status(500).json("Error ao buscar contas!");
    }
  } else {
    return response.status(401).json("Acesso negado!");
  }
}

async function getTransactionById(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userService.getUserIdByToken(auth);
  if(userId) {
    try {
      const TransactionId = request.params.id
      const transaction: Transaction = await TransactionService.findTransactionById(TransactionId);
      return response.status(200).json(transaction);
    } catch(error) {
      return response.status(404).json("Transaction não encontrada");
    }
  } else {
    return response.status(401).json("Acesso negado!");
  }
}

async function addTransaction(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userService.getUserIdByToken(auth);
  if(userId) {
    try {
      const body: Transaction = await request.body;
      console.log(body);
      await TransactionService.saveTransaction(body);
      return response.status(201).json("Transação criada com sucess.");
    } catch(error) {
      return response.status(500).json("Erro ao criar a transação.");
    }
  } else {
    return response.status(401).json("Acesso negado!");
  }
}

async function editTransaction(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userService.getUserIdByToken(auth);
  
  if(userId) {
    const body: Transaction = await request.body;
    const id = request.params.id;
    try {
      await transactionService.findTransactionById(id);
    } catch(error) {
      return response.status(404).json("Transação não localizada.");
    }

    try {
      body.id = id;
      await transactionService.updateTransaction(body, userId);
      return response.status(200).json("Transação atualizada com sucesso.");
    } catch(error) {
      return response.status(404).json("Erro ao atualizar a transação.");
    }

  } else {
    return response.status(401).json("Acesso negado!");
  }
}

async function removeTransaction(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userService.getUserIdByToken(auth);

  if(userId) {
    const id = request.params.id;
    try {
      await transactionService.findTransactionById(id);
    } catch(error) {
      return response.status(404).json("Transação não encontrda.")
    }

    try {
      await transactionService.deleteTransaction(id, userId);
      return response.status(200).json("Transação deletada com sucesso.");
    } catch(error) {
      return response.status(500).json("Erro ao deletar transação");
    }
  }
}


const transactionController = {
  getTransactionsByUserId,
  getTransactionById,
  addTransaction,
  editTransaction,
  removeTransaction
}

export default transactionController;