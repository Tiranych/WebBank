import { createContext, useContext } from 'react';
import { TClients } from 'types';

export const ClientsContext = createContext<TClients>([]);

export const useClients = () => useContext(ClientsContext);
