async function copyToClipboard(text: string | undefined): Promise<boolean> {
    if (!text) return false;
    if (typeof window === 'undefined') return false;

    // Use navigator.clipboard API if available
    if (navigator?.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.error('Failed to copy using navigator.clipboard:', error);
        }
    }

    // Fallback to document.execCommand('copy') for older browsers or environments
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
    } catch (err) {
        console.error('Fallback copy method failed:', err);
        return false;
    }
}

export default copyToClipboard;
