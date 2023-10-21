// Context
import { createContext } from 'react';

// Types
import type { ContextProviderValueType } from '../types/types.ts';

const AppContext: React.Context<ContextProviderValueType> = createContext<ContextProviderValueType>(
	{} as ContextProviderValueType
);

export default AppContext;
