'use server';

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
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
      // Using 'no-store' to prevent caching issues with fetch in Next.js Server Components/Actions
      cache: 'no-store', 
    });

    if (!response.ok) {
        // Log the error response from Unsplash for better debugging
        const errorData = await response.json().catch(() => ({ message: "Could not parse error JSON."}));
        console.error('Error fetching from Unsplash API:', response.status, response.statusText, errorData);
        return [`https://placehold.co/600x400.png?text=API+Error`];
    }
    
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return [data.results[0].urls.regular];
    }
    return [`https://placehold.co/600x400.png?text=No+Image+Found`];
  } catch (error) {
    console.error('Error in searchImages function:', error);
    return [`https://placehold.co/600x400.png?text=Request+Failed`];
  }
}
