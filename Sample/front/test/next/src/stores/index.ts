import { configure } from "mobx";
import AuthStore from "./auth";
import CommonStore from "./common";
configure({ useProxies: "never" });
export class RootStore {
  commonStore: CommonStore;
  authStore: AuthStore;

  constructor(initialData: { authStore: AuthStore; commonStore: CommonStore }) {
    this.authStore = initialData.authStore;
    this.commonStore = initialData.commonStore;
  }
}

const rootStore = new RootStore({
  authStore: new AuthStore(),
  commonStore: new CommonStore(),
});

export default rootStore;
