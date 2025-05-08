import rootStore from "@stores";
import { axios } from "@utils/network.util";
import { flow, makeAutoObservable } from "mobx";

class AuthStore {
  constructor() {
    makeAutoObservable(this, {
      getMemberData: flow,
      userSignIn: flow,
      userSignOut: flow,
    });
  }

  *getMemberData(token: string) {
    try {
      const { data } = yield axios.get("/user/info", {
        headers: { authorization: `Bearer ${token}` },
      });

      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        return undefined;
      } else {
        throw error;
      }
    }
  }

  *userSignIn(id: string, pw: string) {
    const { data } = yield axios.post(
      "/api/signIn",
      { id, pw },
      { baseURL: "/" }
    );
    return data;
  }
  *userSignOut() {
    yield axios.delete("/api/signOut", { baseURL: "/" });
    rootStore.commonStore.isLoggedIn = false;
    rootStore.commonStore.member = undefined;
  }
}

export default AuthStore;
