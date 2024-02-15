import { Request, Response } from "express";
import { AccountServices } from "./account.services";
import { defaultMaxListeners } from "events";
import { number } from "zod";

export class AccountControllers {

  constructor(
    private readonly services: AccountServices
  ){}
  
  async handleCreateAccount(request: Request, response: Response): Promise<void> {
    try {
      const email = request.params.email;
      const name = request.body.name;
      const amount = request.body.amount ?? 0;
      const account = await this.services.CreateAccount({ name, email, amount});
      response.status(201).json(account);
    } 
    catch (error) {
      response.status(400).json({ message: "Error creating account"});
    }
  }

  async handleGetByUserEmail(request: Request, response: Response): Promise<void> {
    try {
      const email = request.params.email;
      const accounts = await this.services.GetByUserEmail(email);
      response.status(200).json(accounts);
    } 
    catch (error) {
      if(error instanceof Error) response.status(400).json({ message: error.message });
      else response.status(500).json({ message: "Error getting accounts"});
    }
  }

}

export default AccountControllers;