import { useEffect, useRef, useState } from 'react';

const useInputFocus = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputBoxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = ({ target }) => {
      if (inputBoxRef.current.contains(target)) {
        setIsInputFocused(true);
        inputRef.current.focus();
      } else {
        setIsInputFocused(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return { isInputFocused, inputBoxRef, inputRef };
};

export default useInputFocus;
