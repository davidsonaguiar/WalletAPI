import { Request, Response } from "express";
import accountService from "../services/accountService";
import userService from "../services/userService";
import { Account } from "@prisma/client";


async function getAccount(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userService.getUserIdByToken(auth);
  if(userId) {
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
  const userId = auth && userService.getUserIdByToken(auth);
  if(userId) {
    try {
      const accounts: Account[] = await accountService.findAccountsByUserId(userId);
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
  const userId = auth && userService.getUserIdByToken(auth);
  if(userId) {
    const body: Account = await request.body
    try {
      await accountService.findAccountByName(body.name, userId);
      return response.status(404).json("Conta já existe");
    } catch(error) {
      body.user_id = userId;
      await accountService.saveAccount(body);
      return response.status(201).json("Conta criada com sucesso.")
    } 
  } else {
    return response.status(401).json("Acesso negado");
  }
}

async function editAccount(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userService.getUserIdByToken(auth);
  if(userId) {
    const body: Account = await request.body;
    try {
      await accountService.findAccountByName(body.name, userId);
      return response.status(404).json("Conta ja cadatrada com o nome: " + body.name);
    } catch(error) {
      const id = request.params.id;
      body.user_id = userId;
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
  const userId = auth && userService.getUserIdByToken(auth);
  if(userId) {
    const id = request.params.id;
    try {
      await accountService.findAccountById(id);
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