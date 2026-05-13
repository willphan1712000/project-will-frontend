/**
 * Function creates and returns a unique UUID and store it in local storage
 * @params key name
 * @returns UUID
 *
 * @example
 * const deviceId = getOrCreateUUID("deviceId")
 */
export default function getOrCreateUUID(key: string) {
    const STORAGE_KEY = key;
    let deviceId = localStorage.getItem(STORAGE_KEY);

    if (!deviceId) {
        // Generate a new UUID (Requires HTTPS context)
        // Fallback to a math-random string if crypto isn't available
        if (window.crypto && window.crypto.randomUUID) {
            deviceId = window.crypto.randomUUID();
        } else {
            deviceId =
                'id-' +
                Math.random().toString(36).substring(2, 15) +
                Date.now().toString(36);
        }

        // Save it for future visits
        localStorage.setItem(STORAGE_KEY, deviceId);
    }

    return deviceId;
}
