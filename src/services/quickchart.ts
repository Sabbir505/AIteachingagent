'use server';

const QUICKCHART_API_URL = 'https://quickchart.io/chart';

/**
 * Creates a URL for a chart image from QuickChart.
 * @param chartConfig The chart configuration object.
 * @returns A URL string for the generated chart image.
 */
export async function createChartUrl(chartConfig: object): Promise<string> {
  const configString = JSON.stringify(chartConfig);
  return `${QUICKCHART_API_URL}?c=${encodeURIComponent(configString)}`;
}
