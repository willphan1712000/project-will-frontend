import { AuthInterface } from '..';
import { SessionType } from '.';
import { useEffect, useState } from 'react';
import { SessionContextType } from './types';
import handleAsync from '../../../utilities/handleAsync';

/**
 * Custom hook for auth
 * - Copyright: Will Phan
 * @param auth Auth object implementing AuthInterface
 * @returns SessionContextType
 */
const useAuthClient = (
    auth: AuthInterface<SessionType>
): SessionContextType => {
    const [session, setSession] = useState<SessionType | undefined>(undefined);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        let is = true;

        const getSession = async () => {
            setLoading(true);
            const { error, data: session } = await handleAsync(
                auth.validate({})
            );

            if (error) {
                setLoading(false);
            }

            if (is) {
                setSession(session);
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
        session,
    };
};

export default useAuthClient;
