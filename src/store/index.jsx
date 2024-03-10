import { useContext } from 'react';
import { GlobalContext } from './global-context';

export const useGlobalContext = () => useContext(GlobalContext);