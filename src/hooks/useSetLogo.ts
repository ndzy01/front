import { useEffect } from 'react';
export default function useSetLogo(fn: Function) {
  useEffect(() => {
    fn();
  }, []);
}
