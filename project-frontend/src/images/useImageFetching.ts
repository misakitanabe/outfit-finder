import { useEffect, useState } from "react";

/**
 * Fetches images on component mount.  Returns an object with two properties: isLoading and fetchedImages, which will be
 * an array of ImageData
 *
 * @param imageId {string} the image ID to fetch, or all of them if empty string
 * @param delay {number} the number of milliseconds fetching will take
 * @returns {{isLoading: boolean, fetchedImages: ImageData[]}} fetch state and data
 */

interface ClothingItem {
    id: string;
    src: string;
    name: string;
    author: string;
    wornFrequency: number;
    category: string;
    color: string;
}

interface MongoImage {
    _id: string; 
    src: string;
    name: string;
    author: string;
    wornFrequency: number;
    category: string;
    color: string;
}

export function useImageFetching(imageId: string, authToken: string, delay=1000) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedImages, setFetchedImages] = useState<ClothingItem[]>([]);
    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await fetch(`/api/images`, {
                    headers: {
                        "Authorization": `Bearer ${authToken}`,
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                let images: MongoImage[] = await response.json();
                const formattedImages: ClothingItem[] = images.map(({_id, ...rest}) => ({
                    ...rest,
                    id: _id,
                }));
                setFetchedImages(formattedImages);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
            }
        }
        fetchImages();
    }, [imageId, authToken]);

    return { isLoading, fetchedImages };
}
