import { createContext, useContext } from 'react';
import { SessionContextType } from './types';

/**
 * Provide Session context using React context
 * copyright: Will Phan
 */
export const SessionContext = createContext<SessionContextType | undefined>(
    undefined
);

/**
 * Will-Auth - retrieve session
 * @returns session context
 *
 * @example
 *
 * const { isLoading, session } = useSession()
 */
export default function useSession() {
    const data = useContext(SessionContext);

    if (data === undefined) throw new Error('Session context is undefined');

    return data;
}
