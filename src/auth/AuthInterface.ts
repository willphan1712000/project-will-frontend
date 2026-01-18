/**
 * This interface provides a comprehensive guides on how to design auth object used for authentication on client side
 * 
 * @example
 * 
 * class auth implements AuthInterface {
    getSignInUrl({ redirect, client_id, callback_api, }: {
        redirect?: string;
        client_id?: string;
        callback_api?: string;
    }): string {
    ...
    }
    signin({ username, email, password, redirect, }: {
        username: string;
        email?: string;
        password: string;
        redirect?: string;
    }): Promise<void> {
    ...
    }
    validate({ state }: { state?: string; }): Promise<any> {
    ...
    }
    signout({ state }: { state?: string; }): Promise<void> {
    ...
    }
    
}
 */
export default interface AuthInterface<User = any> {
    /**
     *
     * @param redirect: route that will be returned after successful authentication
     * @param client_id: oauth client id
     * @param callback_api: api route for callback
     * @returns sign in url
     */
    getSignInUrl({
        redirect,
        client_id,
        callback_api,
    }: {
        redirect?: string;
        client_id?: string;
        callback_api?: string;
    }): string;

    /**
     * Authenticate a user
     */
    signin({
        username,
        email,
        password,
        redirect,
    }: {
        username: string;
        email?: string;
        password: string;
        redirect?: string;
    }): Promise<void>;

    /**
     * Validate user authentication
     */
    validate({ state }: { state?: string }): Promise<User>;

    /**
     * Sign a user out
     */
    signout({ state }: { state?: string }): Promise<void>;
}
