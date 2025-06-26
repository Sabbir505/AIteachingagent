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

  // Most likely issue: API key is not available in the environment.
  if (!accessKey) {
    console.error('CRITICAL: Unsplash API key (UNSPLASH_ACCESS_KEY) not found in environment variables.');
    return [`https://placehold.co/600x400.png?text=API_KEY_MISSING`];
  }

  const url = `${UNSPLASH_API_URL}?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    if (response.data && response.data.results && response.data.results.length > 0) {
      // Success case
      return [response.data.results[0].urls.regular];
    }
    
    // Case where API call succeeded but no images were found for the query
    console.warn(`Unsplash search for "${query}" returned no results.`);
    return [`https://placehold.co/600x400.png?text=No+Image+For+'${encodeURIComponent(query)}'`];

  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Handle specific API errors
      console.error('Error fetching from Unsplash API:', error.response?.status, error.response?.data);
      const status = error.response?.status;
      if (status === 401) {
        return [`https://placehold.co/600x400.png?text=Invalid+API+Key`];
      }
      if (status === 403) {
         return [`https://placehold.co/600x400.png?text=API+Rate+Limit+Exceeded`];
      }
      return [`https://placehold.co/600x400.png?text=API+Error+${status || ''}`.trim()];
    } else {
      // Handle unexpected errors
      console.error('An unexpected error occurred in searchImages:', error);
    }
    return [`https://placehold.co/600x400.png?text=Request+Failed`];
  }
}
