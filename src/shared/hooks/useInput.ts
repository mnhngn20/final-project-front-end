import debounce from 'lodash-es/debounce';
import { useState, useMemo } from 'react';

interface UseInputProps {
  debounceTime?: number;
  initialState?: string | number;
}

function useInput({ initialState = '', debounceTime = 0 }: UseInputProps) {
  const [state, setState] = useState<string | number>(initialState);

  const handlers = useMemo(
    () => ({
      handleInputChange: debounce(
        (e: React.ChangeEvent<HTMLInputElement> | string | number) => {
          if (typeof e === 'string' || typeof e === 'number') {
            setState(e);
          } else {
            setState(e?.target?.value);
          }
        },
        debounceTime,
      ),
      resetInput() {
        setState(initialState);
      },
    }),
    [initialState, debounceTime],
  );

  return [state, handlers] as [string, typeof handlers];
}

export default useInput;
