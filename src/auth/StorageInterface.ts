import SessionType from './react/types';

/**
 * This interface provides a guide to design storage object used for client side to operate storage operations
 * - Copyright: Will Phan
 */
export default interface StorageInterface {
    getToken(): string | null;
    getUser(): SessionType | null;
    setToken({ token }: { token: string }): void;
    removeToken(): void;
}
