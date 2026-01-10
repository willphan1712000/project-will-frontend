/**
 *
 * @param color
 * @returns percentage of a given hex color
 */
export function encode(color: string) {
    const { h } = hexToHsl(color);
    return (h * 100) / 360;
}

/**
 *
 * @param percent
 * @returns hex color scheme based on a given percentage
 */
export function decode(percent: number) {
    return hslToHex(percent * 360, 100, 50);
}

/**
 * The core logic for converting a HEX color string to HSL components.
 * @param {string} hex - The 6-digit hex color string (e.g., "4A90E2").
 * @returns {object|null} - An object {h, s, l} or null if invalid hex.
 */
function hexToHsl(hex: string) {
    // Remove hashtag
    if (hex.length === 7) {
        hex = hex.substring(1);
    }

    // 1. Convert HEX to normalized RGB (0-1)
    // Note: The hex string is already validated as 6 characters in convertColor
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    // Find min/max values and delta (Cmax - Cmin)
    const cmax = Math.max(r, g, b);
    const cmin = Math.min(r, g, b);
    const delta = cmax - cmin;

    let h = 0; // Hue (0-360)
    let s = 0; // Saturation (0-1)
    let l = (cmax + cmin) / 2; // Lightness (0-1)

    // 2. Calculate Saturation (S) and Hue (H) if color is not grayscale (delta > 0)
    if (delta !== 0) {
        // Formula for S depends on L value (distance from 0.5)
        s = delta / (1 - Math.abs(2 * l - 1));

        // 3. Calculate Hue (H) based on which color component is max
        if (cmax === r) {
            // Red is max
            h = (g - b) / delta;
        } else if (cmax === g) {
            // Green is max, add 2 (120 degrees)
            h = (b - r) / delta + 2;
        } else {
            // Blue is max, add 4 (240 degrees)
            h = (r - g) / delta + 4;
        }

        // Convert fractional hue (0-6) to degrees (0-360)
        h = h * 60;

        // Ensure Hue is positive (0 to 360)
        if (h < 0) {
            h += 360;
        }
    }

    // Return H, S, L rounded to whole numbers for display
    return {
        h: Math.round(h),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
}

/**
 * Converts HSL components to a HEX color string (#RRGGBB).
 * @param {number} h - Hue (0-360).
 * @param {number} s - Saturation (0-100).
 * @param {number} l - Lightness (0-100).
 * @returns {string} - The hex color string (e.g., "#4A90E2").
 */
function hslToHex(h: number, s: number, l: number) {
    // Normalize S and L to 0-1 range
    s /= 100;
    l /= 100;

    // 1. Calculate Chroma (C) and intermediate values
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r_prime = 0;
    let g_prime = 0;
    let b_prime = 0;

    // 2. Determine R', G', B' based on Hue sector (0-5)
    const sector = h / 60;

    if (sector >= 0 && sector < 1) {
        [r_prime, g_prime, b_prime] = [c, x, 0];
    } else if (sector >= 1 && sector < 2) {
        [r_prime, g_prime, b_prime] = [x, c, 0];
    } else if (sector >= 2 && sector < 3) {
        [r_prime, g_prime, b_prime] = [0, c, x];
    } else if (sector >= 3 && sector < 4) {
        [r_prime, g_prime, b_prime] = [0, x, c];
    } else if (sector >= 4 && sector < 5) {
        [r_prime, g_prime, b_prime] = [x, 0, c];
    } else if (sector >= 5 && sector < 6) {
        [r_prime, g_prime, b_prime] = [c, 0, x];
    }

    // 3. Convert R', G', B' to 0-255 range (R, G, B)
    const r = Math.round((r_prime + m) * 255);
    const g = Math.round((g_prime + m) * 255);
    const b = Math.round((b_prime + m) * 255);

    // Helper function to convert a single decimal value to a 2-digit hex string
    const toHex = (c: number) => {
        const hex = c.toString(16).toUpperCase();
        return hex.length === 1 ? '0' + hex : hex;
    };

    // 4. Combine and return
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
