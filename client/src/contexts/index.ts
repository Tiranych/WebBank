import { createContext, useContext } from 'react';

export const IDClientContext = createContext<number>(-1);
export const IsAuthContext = createContext<boolean>(false);
export const IsAdminContext = createContext<boolean>(false);

export const useIDClient = () => useContext(IDClientContext);
export const useAuth = () => useContext(IsAuthContext);
export const useAdmin = () => useContext(IsAdminContext);
