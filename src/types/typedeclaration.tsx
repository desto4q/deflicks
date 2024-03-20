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
