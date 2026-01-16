const Image = {
    /**
     * Convert file (blob) to base64 string format
     * @param file
     * @returns
     */
    FromFileToImageSrc(file?: File | Blob) {
        return new Promise<string | null>((resolve, reject) => {
            if (!file) return resolve(null);

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (readerEvent) => {
                if (readerEvent.target?.result) {
                    return resolve(readerEvent.target?.result as string);
                }
                reject('Error getting the image source');
            };

            reader.onerror = () => {
                reject('Error getting the image source');
            };
        });
    },
    /**
     * Convert urlst
     * @param url
     * @returns
     */
    async FromStringToImageSrc(url?: string) {
        if (!url || Image.isBase64(url)) return null;

        const res = await fetch(url);
        const blob = await res.blob();
        const src = await Image.FromFileToImageSrc(blob);
        return src;
    },
    /**
     * Check if the url is base64 format
     * @param url
     * @deprecated Using a weak condition and might be changed later. Use checkBase64 instead
     */
    checkBase64(url?: string) {
        if (!url || url === '') return false;

        return url.includes('base64,'); // WEAK !
    },
    isBase64(url?: string) {
        return Image.checkBase64(url);
    },
};

export default Image;
