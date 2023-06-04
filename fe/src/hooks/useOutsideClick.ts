import { useEffect } from 'react';

const useOutsideClick = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void,
  dependency?: any
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [dependency]);

  return ref;
};

export default useOutsideClick;
