import deleteTransaction from "./deleteTransaction";
import deleteTransactionsByAccountId from "./deleteTransactionsByAccountId";
import findTransactionByAccountId from "./findTransactionByAccountId";
import findTransactionById from "./findTransactionById";
import findTransactionByUserId from "./findTransactionByUserId";
import saveTransaction from "./saveTransaction";
import updateTransaction from "./updateTransaction";

const transactionService = {
  findTransactionById,
  findTransactionByUserId,
  findTransactionByAccountId,
  saveTransaction,
  updateTransaction,
  deleteTransaction,
  deleteTransactionsByAccountId
};


export default transactionService;