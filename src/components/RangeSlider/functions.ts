/**
 * 
 * @param value 
 * @param min 
 * @param max 
 * @returns percentage of a given value in a given range
 */
export function encode(value: string, min: string, max: string) {
    return (parseInt(value) - parseInt(min)) * 100 / (
        parseInt(max) - parseInt(min)
    )
}

/**
 * 
 * @param percent 
 * @param min 
 * @param max 
 * @returns value derived from a percentage
 */
export function decode(percent: number, min: string, max: string) {
    return Math.round(parseInt(min) + percent * (parseInt(max) - parseInt(min)))
}