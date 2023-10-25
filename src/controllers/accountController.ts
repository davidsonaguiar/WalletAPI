import accountService from "../services/accountService";
import transactionService from "../services/transactionService/";
import { Account } from "@prisma/client";
import { Request, Response } from "express";
import { getUserIdByToken } from "../utils";


async function getAccount(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const user = auth && getUserIdByToken(auth);
  if(user) {
    try {
      const id = request.params.id;
      const account = await accountService.findAccountById(id);
      return response.status(200).json(account);
    } catch(error) {
      return response.status(404).json("Conta não localizada.");
    }
  } else {
    return response.status(401).json("Acesso negado");
  }
} 

async function getAccounts(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const user = auth && getUserIdByToken(auth);
  if(user) {
    try {
      const accounts: Account[] = await accountService.findAccountsByUserId(user.id);
      return response.status(200).json(accounts);
    } catch(error) {
      return response.status(500).json("Error ao buscar contas!");
    }
  } else {
    return response.status(401).json("Acesso negado!");
  }
}

async function addAccount(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const user = auth && getUserIdByToken(auth);
  if(user) {
    const body: Account = await request.body
    try {
      await accountService.findAccountByName(body.name, user.id);
      return response.status(404).json("Conta já existe");
    } catch(error) {
      body.user_id = user.id;
      await accountService.saveAccount(body);
      return response.status(201).json("Conta criada com sucesso.")
    } 
  } else {
    return response.status(401).json("Acesso negado");
  }
}

async function editAccount(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const user = auth && getUserIdByToken(auth);
  if(user) {
    const body: Account = await request.body;
    try {
      await accountService.findAccountByName(body.name, user.id);
      return response.status(404).json("Conta ja cadatrada com o nome: " + body.name);
    } catch(error) {
      const id = request.params.id;
      body.user_id = user.id;
      body.id = id;
      await accountService.updateAccount(body);
      return response.status(200).json("Conta atualizada com sucesso.")
    } 
  } else {
    return response.status(401).json("Acesso negado");
  }
}

async function removeAccount(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && getUserIdByToken(auth);
  if(userId) {
    const id = request.params.id;
    try {
      await accountService.findAccountById(id);
      await transactionService.deleteTransactionsByAccountId(id);
      await accountService.deleteAccount(id);
      return response.status(200).json("Conta deletada com sucesso.");
    } catch(error) {
      return response.status(404).json("Conta não encontrada.");
    }
  } else {
    return response.status(401).json("Acesso negado");
  }
}

const accountController = {
  getAccounts,
  getAccount,
  addAccount,
  editAccount,
  removeAccount,
}

export default accountController;