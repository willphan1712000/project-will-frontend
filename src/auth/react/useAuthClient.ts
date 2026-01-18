import { AuthInterface } from '..';
import { SessionType } from '.';
import { useEffect, useRef, useState } from 'react';
import { SessionContextType } from './types';
import { tools } from '@';

/**
 * Custom hook for auth
 * - Copyright: Will Phan
 * @param auth Auth object implementing AuthInterface
 * @returns SessionContextType
 *
 * @example
 *
 * const authClient = new auth() // auth class implements AuthInterface
 * const { isLoading, session, auth } = useAuthClient(authClient) // auth is an auth object
 *
 */
const useAuthClient = (
    auth: AuthInterface<SessionType>
): SessionContextType => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const sessionRef = useRef<SessionType>(undefined);

    useEffect(() => {
        let is = true;

        const getSession = async () => {
            setLoading(true);
            const { error, data: session } = await tools.handleAsync(
                auth.validate({})
            );

            if (error) {
                setLoading(false);
            }

            if (is) {
                sessionRef.current = session;
                setLoading(false);
            }
        };

        getSession();

        return () => {
            is = false;
        };
    }, []);

    return {
        isLoading,
        session: sessionRef.current,
        auth,
    };
};

export default useAuthClient;
