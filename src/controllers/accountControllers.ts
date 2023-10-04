import { Request, Response } from "express";
import accountServices from "../services/accountServices";
import userServices from "../services/userServices";
import { Account } from "@prisma/client";


async function getAccount(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userServices.getUserIdByToken(auth);
  if(userId) {
    try {
      const id = request.params.id;
      const account = await accountServices.findAccountById(id);
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
  const userId = auth && userServices.getUserIdByToken(auth);
  if(userId) {
    try {
      const accounts: Account[] = await accountServices.findAccountsByUserId(userId);
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
  const userId = auth && userServices.getUserIdByToken(auth);
  if(userId) {
    const body: Account = await request.body
    try {
      await accountServices.findAccountByName(body.name, userId);
      return response.status(404).json("Conta já existe");
    } catch(error) {
      body.user_id = userId;
      await accountServices.saveAccount(body);
      return response.status(201).json("Conta criada com sucesso.")
    } 
  } else {
    return response.status(401).json("Acesso negado");
  }
}

async function editAccount(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userServices.getUserIdByToken(auth);
  if(userId) {
    const body: Account = await request.body;
    try {
      await accountServices.findAccountByName(body.name, userId);
      return response.status(404).json("Conta ja cadatrada com o nome: " + body.name);
    } catch(error) {
      const id = request.params.id;
      body.user_id = userId;
      body.id = id;
      await accountServices.updateAccount(body);
      return response.status(200).json("Conta atualizada com sucesso.")
    } 
  } else {
    return response.status(401).json("Acesso negado");
  }
}

async function removeAccount(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userServices.getUserIdByToken(auth);
  if(userId) {
    const id = request.params.id;
    try {
      await accountServices.findAccountById(id);
      await accountServices.deleteAccount(id);
      return response.status(200).json("Conta deletada com sucesso.");
    } catch(error) {
      return response.status(404).json("Conta não encontrada.");
    }
  } else {
    return response.status(401).json("Acesso negado");
  }
}

const accountControllers = {
  getAccounts,
  getAccount,
  addAccount,
  editAccount,
  removeAccount,
}

export default accountControllers;