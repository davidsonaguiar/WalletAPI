import deleteAccount from "./deleteAccount";
import findAccountById from "./findAccountById";
import findAccountByName from "./findAccountByName";
import findAccountsByUserId from "./findAccountByUserId";
import saveAccount from "./saveAccount";
import updateAccount from "./updateAccount";

const accountService = {
  findAccountByName,
  findAccountsByUserId,
  findAccountById,
  saveAccount,
  updateAccount,
  deleteAccount
};

export default accountService;
