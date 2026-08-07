/**
 * Validates whether a given time string matches the "hh:mm am/pm" format.
 * Examples of valid formats: "9:00am", "10:30pm", "09:00 am", "12:00 PM".
 */
export const isValidTime = (timeStr: string): boolean => {
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s*(am|pm)$/i;
    return timeRegex.test(timeStr.trim());
};
