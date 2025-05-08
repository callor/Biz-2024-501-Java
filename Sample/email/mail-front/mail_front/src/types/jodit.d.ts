declare module "jodit" {
  export default class Jodit {
    value: string;
    static make(
      current: any,
      arg1: {
        height: number;
        value: string;
        toolbarSticky: boolean;
        events: { change: (newValue: string) => void };
      },
    ) {
      throw new Error("Method not implemented.");
    }
    constructor(container: HTMLElement, options?: any);
    destruct(): void;
    // 필요한 메소드와 프로퍼티를 추가할 수 있습니다.
  }
}
