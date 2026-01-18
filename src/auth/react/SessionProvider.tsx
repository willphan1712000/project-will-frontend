import { ReactNode } from 'react';
import { SessionContext } from './context';
import { SessionContextType } from './types';

/**
 * Custom Session Provider using React Context
 *
 * @example
 *
 * <SessionProvider value={useAuthClient(auth)}>
 * ...
 * </SessionProvider>
 * // auth object implementing AuthInterface
 */
const SessionProvider = ({
    value,
    children,
}: {
    value: SessionContextType;
    children: ReactNode;
}) => {
    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};

export default SessionProvider;
