import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { describe, expect, it } from "vitest";
import { PrismaClient } from '@prisma/client';
import userService from "../../src/services/userService";

describe("User Service Tests", () => {
  
  describe("Save User", () => {

    it("Should return a id", async () => {
      
      const newUser = { name: "John Doe", login: "john", password: "john"}
      const userCreated = await userService.saveUser(newUser);
      expect(userCreated).toHaveProperty("id");

    });


    it("Should not return a password", async () => {

      const newUser = { name: "Joe Doe", login: "joe", password: "joe"}
      const userCreated = await userService.saveUser(newUser);
      expect(userCreated).not.toHaveProperty("password");

    });
    

    it("Should return a Error validation", async () => {

      const newUser = { name: "Nw", login: "NewUser", password: "NewUser" }
      const testFunction = async () => await userService.saveUser(newUser);
      expect(testFunction).rejects.toThrow();

    });

 
    it("Should return a Error Login", async () => {

      const newUser = { name: "New", login: "NewUser", password: "NewUser" };
      await userService.saveUser(newUser);
      const testFunction = async () => await userService.saveUser(newUser);
      expect(testFunction).rejects.toThrow();

    });


    it("should save a user with encrypted password"), async () => {

      const newUser = { name: "user100", login: "user100", password: "user100"}
      const userCreated = await userService.saveUser(newUser);
      const passwordUserCreated = await userService.findUserByLogin(userCreated.login);
      expect(passwordUserCreated?.password).toEqual(compare(newUser.password, passwordUserCreated?.password!));

    }
  });



  describe("Find User By Login", () => {

    it("Should return a user", async () => {

      await userService.saveUser({
        name: "Jhony",
        login: "Jhony",
        password: "Jhony",
      });

      const userFinded = await userService.findUserByLogin("Jhony");
      expect(userFinded).toHaveProperty("password");

    });


    it("Should return Error Validation", async () => {

      await userService.saveUser({
        name: "Elvis",
        login: "Elvis",
        password: "Elvis"
      });

      const userFinded = async () => await userService.findUserByLogin("");
      expect(userFinded).rejects.toThrow();

    });


    it("Should return NULL", async () => {

      const userFinded = await userService.findUserByLogin("Jiraya");
      expect(userFinded).toBeNull;

      await new PrismaClient().user.deleteMany({
        where: {
          login: {
            in: [
              "Elvis",
              "Jhony",
              "user100",
              "NewUser",
              "joe",
              "john"
            ]
          }
        }
      })
      
    });
    
  })
  
})

