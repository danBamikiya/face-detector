import actorNameParser from './actorNameParser';
import scrapeWebForActorsImages from './webScrapper';

async function getActorsImgsURL(Movie) {
	const actorsImgsURL = [];
	Promise.all(
		Movie.parsedActorNames.map(async actorName => {
			actorsImgsURL.push(await scrapeWebForActorsImages(actorName));
		})
	).then((Movie.actorsImgsURL = actorsImgsURL));
}

export default async function backgroundActorNamesParse(Movie) {
	const parsedActorNames = Movie.cast
		.map(actor => actor['actor'])
		.reduce(
			(allActorNames, actorName) => [
				...allActorNames,
				actorNameParser(actorName)
			],
			[]
		);
	Movie.parsedActorNames = parsedActorNames;
	getActorsImgsURL(Movie);
}
