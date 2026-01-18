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
};

export default SessionType;
