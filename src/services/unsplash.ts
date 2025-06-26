'use server';

import axios from 'axios';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

/**
 * Searches for images on Unsplash.
 * @param query The search term.
 * @returns A promise that resolves to an array of image URLs.
 */
export async function searchImages(query: string): Promise<string[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    console.warn('Unsplash API key not found. Returning placeholder images.');
    return [`https://placehold.co/600x400.png?text=${encodeURIComponent(query)}`];
  }

  try {
    const response = await axios.get(UNSPLASH_API_URL, {
      params: {
        query,
        per_page: 1,
        orientation: 'landscape',
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      return [response.data.results[0].urls.regular];
    }
    return [`https://placehold.co/600x400.png?text=No+Image+Found`];
  } catch (error) {
    console.error('Error fetching from Unsplash API:', error);
    return [`https://placehold.co/600x400.png?text=API+Error`];
  }
}
