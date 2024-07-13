export interface results {
	adult?: boolean;
	backdrop_path?: string;
	genre_ids?: number[];
	id?: number;
	original_language?: string;
	original_title?: string;
	overview?: string;
	popularity?: number;
	poster_path?: string;
	release_date?: string;
	title?: string;
	video?: boolean;
	vote_average?: number;
	vote_count?: number;
}

export interface SearchResults {
	adult?: boolean;
	backdrop_path?: string;
	genre_ids?: number[];
	id?: number;
	original_language?: string;
	original_title?: string;
	overview?: string;
	popularity?: number;
	poster_path?: string;
	release_date?: string;
	name?: string;
	video?: boolean;
	vote_average?: number;
	vote_count?: number;
	media_type?: "movie" | "tv";
	title?: string;
}
export type Movies = {
	page: number;
	results: results[];
	total_pages: number;
};

export type Searches = {
	page: number;
	results: SearchResults[];
	total_pages: number;
};

interface genre {
	id: number;
	name: string;
}
export interface TVShow {
	adult: boolean;
	backdrop_path: string;
	created_by: {
		/* Define the structure of the created_by object */
	}[];
	episode_run_time: number[];
	first_air_date: string;
	genres: genre[];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: {
		id: number;
		name: string;
		overview: string;
		vote_average: number;
		vote_count: number;
		/* Add any other properties present in last_episode_to_air */
	};
	name: string;
	networks: {
		/* Define the structure of the networks object */
	}[];
	next_episode_to_air: null;
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: {
		/* Define the structure of the production_companies object */
	}[];
	production_countries: {
		/* Define the structure of the production_countries object */
	}[];
	seasons: {
		air_date: string;
		episode_count: number;
		id: number;
		name: string;
		overview: string;
		poster_path: string;
		season_number: number;
		vote_average: number;
	}[];
	spoken_languages: {
		/* Define the structure of the spoken_languages object */
	}[];
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
}
