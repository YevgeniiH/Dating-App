import axios from "axios";
import { Member } from "../Interfaces/Member";

export class MemberService {
  getMembers() {
    return axios.get<Member[]>("/users");
  }

  getMember(username: string) {
    return axios.get<Member>("/users/" + username);
  }

  updateMember(member: Member) {
    return axios.put("/users/", member);
  }
}
