'use client';

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Mode = 'animated' | 'real';

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ModeContext = createContext<ModeContextType>({
  mode: 'animated',
  setMode: () => {},
});

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('animated');
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  return useContext(ModeContext);
}
