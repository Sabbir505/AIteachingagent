'use server';
import 'server-only';
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

  const url = `${UNSPLASH_API_URL}?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    if (response.data && response.data.results && response.data.results.length > 0) {
      return [response.data.results[0].urls.regular];
    }
    return [`https://placehold.co/600x400.png?text=No+Image+Found`];
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching from Unsplash API:', error.response?.status, error.response?.data);
    } else {
      console.error('An unexpected error occurred in searchImages:', error);
    }
    return [`https://placehold.co/600x400.png?text=Request+Failed`];
  }
}
