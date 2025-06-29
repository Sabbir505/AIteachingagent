'use server';
import 'server-only';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

/**
 * Searches for images on Unsplash.
 * @param query The search term.
 * @returns A promise that resolves to an array of image URLs.
 */
export async function searchImages(query: string): Promise<string[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    console.error('CRITICAL: Unsplash API key (UNSPLASH_ACCESS_KEY) not found in environment variables.');
    return [`https://placehold.co/600x400.png?text=API_KEY_MISSING`];
  }

  const url = `${UNSPLASH_API_URL}?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
      cache: 'no-store', // Ensure fresh data and avoid stale errors
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ errors: ['Failed to parse error response from Unsplash.'] }));
      console.error('Error fetching from Unsplash API:', response.status, errorData);
      
      if (response.status === 401) {
        return [`https://placehold.co/600x400.png?text=Invalid+API+Key`];
      }
      if (response.status === 403) {
        return [`https://placehold.co/600x400.png?text=API+Rate+Limit+Exceeded`];
      }
      return [`https://placehold.co/600x400.png?text=API+Error+${response.status}`.trim()];
    }

    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
      return [data.results[0].urls.regular];
    }
    
    console.warn(`Unsplash search for "${query}" returned no results.`);
    return [`https://placehold.co/600x400.png?text=No+Image+For+'${encodeURIComponent(query)}'`];

  } catch (error: any) {
    console.error('An unexpected error occurred in searchImages:', error);
    return [`https://placehold.co/600x400.png?text=Request+Failed`];
  }
}
