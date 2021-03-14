import axios from "axios";

const AccountService = {
  login(value: any) {
    return axios
      .post("/account/login", value)
      .then((response) => {
        let user = response;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }
        return response;
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  },

  logout() {
    localStorage.removeItem("user");
  },
};
export default AccountService;
