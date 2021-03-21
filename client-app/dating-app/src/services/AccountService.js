import axios from "axios";

const AccountService = {
  login(value) {
    return axios
      .post("/account/login", value)
      .then((response) => response)
      .catch((e) => {
        console.log(e);
        return e;
      });
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
  },
};
export default AccountService;
