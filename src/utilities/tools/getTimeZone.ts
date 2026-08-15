/**
 * Retrieves the device's current IANA time zone string.
 * @returns {string} e.g., "America/New_York"
 */
export default function getCurrentTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
