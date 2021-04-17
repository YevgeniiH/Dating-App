import axios from "axios";
import { Member } from "../Interfaces/Member";
import * as localStorageConst from "../store/localStorageConst";

const httpOptions = {
  headers: {
    Authorization:
      "Bearer " +
      JSON.parse(localStorage.getItem(localStorageConst.USER_DATA) as string)
        .token,
  },
};

export class MemberService {
  public getMembers() {
    return axios.get<Member[]>("/users", httpOptions);
  }

  getMember(username: string) {
    return axios.get<Member>("/users/" + username, httpOptions);
  }
}
