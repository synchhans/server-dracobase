import {
  deleteAccount,
  editAccount,
  getAccounts,
} from "../services/accountService.js";

export const getAccountController = async (req, res, next) => {
  try {
    const account = await getAccounts(req.user._id);
    return res.status(200).json({
      message: "Daftar account berhasil diambil.",
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

export const editAccountController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { level } = req.body;

    const updatedAccount = await editAccount(id, level);
    return res.status(200).json({
      message: "Account berhasil diperbarui.",
      data: updatedAccount,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAccountController = async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteAccount(id);
    return res.status(200).json({
      message: "Account berhasil dihapus.",
    });
  } catch (error) {
    next(error);
  }
};
