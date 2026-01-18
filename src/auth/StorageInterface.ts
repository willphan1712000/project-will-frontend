import SessionType from './react/types';

/**
 * This interface provides a guide to design storage object used for client side to operate storage operations
 * 
 * @example
 * 
 * class storage implements StorageInterface {
    getToken(): string | null {
    ...
    }
    getUser(): SessionType | null {
    ...
    }
    setToken({ token }: { token: string; }): void {
    ...
    }
    removeToken(): void {
    ...
    }
}
 */
export default interface StorageInterface {
    getToken(): string | null;
    getUser(): SessionType | null;
    setToken({ token }: { token: string }): void;
    removeToken(): void;
}

class storage implements StorageInterface {
    getToken(): string | null {
        throw new Error('Method not implemented.');
    }
    getUser(): SessionType | null {
        throw new Error('Method not implemented.');
    }
    setToken({ token }: { token: string }): void {
        throw new Error('Method not implemented.');
    }
    removeToken(): void {
        throw new Error('Method not implemented.');
    }
}
