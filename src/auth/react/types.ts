import { AuthInterface } from '@';

type SessionType =
    | {
          username?: string;
          email?: string;
          role?: string;
      }
    | undefined;

export type SessionContextType = {
    isLoading: boolean;
    session: SessionType;
    auth: AuthInterface;
};

export default SessionType;
