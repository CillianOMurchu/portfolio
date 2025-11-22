import  {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type OrbOrigin = { x: number; y: number } | null;

interface OrbOriginContextType {
  orbOrigin: OrbOrigin;
  setOrbOrigin: (pos: OrbOrigin) => void;
}

const OrbOriginContext = createContext<OrbOriginContextType | undefined>(
  undefined
);

export function OrbOriginProvider({ children }: { children: ReactNode }) {
  const [orbOrigin, setOrbOrigin] = useState<OrbOrigin>(null);
  return (
    <OrbOriginContext.Provider value={{ orbOrigin, setOrbOrigin }}>
      {children}
    </OrbOriginContext.Provider>
  );
}

export function useOrbOrigin() {
  const ctx = useContext(OrbOriginContext);
  if (!ctx)
    throw new Error("useOrbOrigin must be used within an OrbOriginProvider");
  return ctx;
}
