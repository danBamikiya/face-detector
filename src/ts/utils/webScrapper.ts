import { Callback } from '../types';
import { fetchSafeResponse } from '../helpers/fetch';

function handleError(error: Error) {
	console.log("Looks like there's a problem: \n", error);
}

function readResponseAsJSON(response: Response): Promise<any> {
	return response.json();
}

export async function scrapeWeb<T>(
	url: string,
	...callbacks: Callback[]
): Promise<T | undefined> {
	let scrapedData!: T | undefined;

	/**
	 * Make a fetch() request (which by default is a GET HTTP request)
	 * for the page of the passed in url.
	 * This request uses an all origins api to prevent cors error.
	 * The page url is encoded for better parsing by the
	 * api server.
	 */

	try {
		scrapedData = await fetchSafeResponse(
			`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
			[readResponseAsJSON, ...callbacks]
		);
	} catch (error) {
		handleError(error);
	}

	return scrapedData;
}
