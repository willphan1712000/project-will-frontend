interface HandleAsyncType<DataType> {
    error?: string;
    data?: DataType;
}

/**
 * HandleAsync function -> automatically handle try catch implementation from a promise
 * @param data a promise that returns a data value
 * @returns Promise<{error?, data?}>
 */
async function handleAsync<DataType>(
    data: Promise<DataType>
): Promise<HandleAsyncType<DataType>> {
    try {
        const dataAsync = await data;
        return {
            error: undefined,
            data: dataAsync,
        };
    } catch (error: any) {
        return {
            error,
            data: undefined,
        };
    }
}

export default handleAsync;
