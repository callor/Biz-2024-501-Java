import config from '@config';
import RootStore from '@stores/root.store';
import { createContext, useContext } from 'react';

// Types
type Props = {
  initialData: InitData;
  children: JSX.Element;
};

// Context 생성
const StoreContext = createContext<RootStore | undefined>(undefined);

// Global Root Store
let rootStore: RootStore | undefined;

// init 함수 설정
function initializeStore(initialData?: InitData) {
  // 스토어 생성 기능
  const store = rootStore ?? new RootStore();
  // 넣을 데이터가 있는 경우
  if (initialData) {
    store.hydrate(initialData);
  }

  if (config.isServer) return store;

  // Create the store once in the client
  if (!rootStore) rootStore = store;

  return store;
}

export const useRootStore = () => {
  const store = useContext(StoreContext);
  if (store === undefined) {
    throw new Error('ERROR store is undefined');
  }
  return store;
};
export const useCalendarStore = () => {
  const store = useContext(StoreContext);
  if (store === undefined) {
    throw new Error('ERROR store is undefined');
  }
  return store.calendar;
};

// Store Provider
const RootStoreProvider = ({ initialData, children }: Props) => {
  // Store 생성
  const store = initializeStore(initialData);

  return (
    // 하위 컴포넌트 삽입
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default RootStoreProvider;
