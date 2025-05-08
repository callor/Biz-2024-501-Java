import { useCallback, useState } from 'react';

const useToggle = (initVal = false) => {
  const [isVal, setVal] = useState(initVal);

  const toggle = useCallback(() => {
    setVal(!isVal);
  }, [isVal]);

  return [isVal, toggle] as [boolean, () => void];
};

export default useToggle;
