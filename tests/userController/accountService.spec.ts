import { Account } from "@prisma/client";
import { describe, expect, it } from "vitest";
import saveAccount from "../../src/services/accountService/saveAccount";
import findAccountsByUserId from "../../src/services/accountService/findAccountByUserId";
import deleteAccount from "../../src/services/accountService/deleteAccount";
import userService from "../../src/services/userService";
import prisma from "../../src/prisma";

describe("Account Service Tests", () => {
  describe("Save Account Tests", () => {
    it("should return a account with id", async () => {
      const newUser = await userService.saveUser({
        name: "account service",
        login: "accountservice1",
        password: "accountservice",
      });

      const accountCreated = await saveAccount({
        name: "Account Test",
        user_id: newUser.id,
      } as Account);

      expect(accountCreated).toHaveProperty("id");

      await prisma.account.delete({
        where: {
          id: accountCreated.id,
        },
      });

      await prisma.user.delete({
        where: {
          id: newUser.id,
        },
      });
    });

    it("should return a Error Already Exist Account", async () => {
      const newUser = await userService.saveUser({
        name: "account service",
        login: "accountservice1",
        password: "accountservice",
      });

      const accountCreated = await saveAccount({
        name: "Account Test",
        user_id: newUser.id,
      } as Account);

      const newAccountTest = async () =>
        saveAccount({
          name: "Account Test",
          user_id: newUser.id,
        } as Account);

      expect(newAccountTest).rejects.toThrow();

      await prisma.account.delete({
        where: {
          id: accountCreated.id,
        },
      });

      await prisma.user.delete({
        where: {
          id: newUser.id,
        },
      });
    });
  });

  describe("Find Account by User ID", () => {
    it("Should return the Account", async () => {
      const newUser = await userService.saveUser({
        name: "account service",
        login: "accountservice1",
        password: "accountservice",
      });

      const accountCreated = await saveAccount({
        name: "Account Test",
        user_id: newUser.id,
      } as Account);

      const accountsFound = await findAccountsByUserId(newUser.id);

      accountsFound.forEach((account) => {
        expect(account).toHaveProperty("id");
        expect(account).toHaveProperty("name");
        expect(account).toHaveProperty("user_id");
      });

      await prisma.account.delete({
        where: {
          id: accountCreated.id,
        },
      });

      await prisma.user.delete({
        where: {
          id: newUser.id,
        },
      });
    });
  });

  describe("Delete Account", () => {

    it("Should return the Account deleted", async () => {

      const newUser = await userService.saveUser({
        name: "account service",
        login: "accountservice1",
        password: "accountservice",
      });

      const accountCreated = await saveAccount({
        name: "Account Test",
        user_id: newUser.id,
      } as Account);

      const accountDeleted = await deleteAccount(accountCreated.id);

      console.log(accountDeleted)

      expect(accountDeleted).toHaveProperty("id");
      expect(accountDeleted).toHaveProperty("name");
      expect(accountDeleted).toHaveProperty("user_id");

      await prisma.user.delete({
        where: {
          id: newUser.id,
        },
      });
    });

  });
});
