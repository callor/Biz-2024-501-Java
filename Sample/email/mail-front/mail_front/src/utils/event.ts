const eventUtil: IEventUtil = {
  list: new Map(),
  emitQueue: new Map(),
  on(type, cb) {
    this.list.has(type) || this.list.set(type, []);
    this.list.get(type)?.push(cb);
    return this;
  },
  off(type, cb) {
    if (cb !== undefined) {
      this.list.set(type, this.list.get(type)?.filter((event) => event !== cb) ?? []);
      return this;
    }
    this.list.delete(type);
    return this;
  },
  emit(type, args) {
    if (this.list.has(type)) {
      this.list.get(type)?.forEach((cb) => {
        cb(args);
      });
      return true;
    }
  },
};

export const EVENT = {
  SHOW_LOADER: "SHOW_LOADER",
  CLOSE_LOADER: "CLOSE_LOADER",
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
  OPEN_MODELESS: "OPEN_MODELESS",
  CLOSE_MODELESS: "CLOSE_MODELESS",
  CLOSE_ALL: "CLOSE_ALL",
} as const;

type EVENT = (typeof EVENT)[keyof typeof EVENT];

export default eventUtil;
