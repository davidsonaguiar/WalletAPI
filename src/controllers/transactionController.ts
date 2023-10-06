import { Request, Response } from "express";
import { Transaction } from "@prisma/client";
import userService from "../services/userService";
import TransactionService from "../services/transactionService";


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
      const transaction: Transaction = await TransactionService.saveTransaction(body);
      return response.status(201).json(transaction);
    } catch(error) {
      return response.status(500).json(error);
    }
  } else {
    return response.status(401).json("Acesso negado!");
  }
}


const transactionController = {
  getTransactionsByUserId,
  getTransactionById,
  addTransaction
}

export default transactionController;