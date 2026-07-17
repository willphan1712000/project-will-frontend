import handleAsync from './handleAsync';
import textProcessing from './textPreprocessing';
import getOrCreateUUID from './UUID';
import copyToClipboard from './copyToClipboard';

const tools = {
    /**
     * HandleAsync function -> automatically handle try catch implementation from a promise
     * @param data a promise that returns a data value
     * @returns Promise<{error?, data?}>
     *
     * @example
     *
     * const { error, data } = await handleAsync(api('/api/call')) // api is a function that calls an api and returns a promise with possible errors thrown in between
     */
    handleAsync,

    /**
     * Text Preprocessing
     * - Convert to lowercase
     * - Remove punctuation
     * - Remove stop words
     * @param text
     * @returns
     */
    textProcessing,

    /**
     * Function creates and returns a unique UUID and store it in local storage
     * @params key name
     * @returns UUID
     *
     * @example
     * const deviceId = getOrCreateUUID("deviceId")
     */
    getOrCreateUUID,

    /**
     * Copies the provided text to the system clipboard.
     *
     * @param text - The text string to copy, or undefined.
     * @returns A promise that resolves to true if the copy operation was successful, otherwise false.
     */
    copyToClipboard,
};

export default tools;
