import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { changeQuantity, sanitizeBasket, type Basket } from './basket';
const BasketContext = createContext<{ basket: Basket; bump: (id: string, delta: number) => void; clear: () => void }>({ basket: {}, bump: () => {}, clear: () => {} });
export function BasketProvider({ children }: { children: ReactNode }) {
  const [basket, setBasket] = useState<Basket>({});
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { setBasket(sanitizeBasket(JSON.parse(localStorage.getItem('zp-basket') || '{}'))); } catch { setBasket({}); }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) { try { localStorage.setItem('zp-basket', JSON.stringify(basket)); } catch { /* Storage unavailable: retain the in-memory basket. */ } } }, [basket, ready]);
  return <BasketContext.Provider value={{ basket, bump: (id, delta) => setBasket((previous) => changeQuantity(previous, id, delta)), clear: () => setBasket({}) }}>{children}</BasketContext.Provider>;
}
export const useBasket = () => useContext(BasketContext);
