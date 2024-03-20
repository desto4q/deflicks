import { Badge, Group, Stack, Text } from "@mantine/core";
import { SearchResults } from "../../types/typedeclaration";
// interface Searches extends Omit<results, "title"> {
// 	title?: string;
// }
function SearchCard({
	name,
	poster_path,
	vote_average,
	release_date,
	media_type,
	title,
}: SearchResults) {
	return (
		<Stack className="w-40 md:w-48 h-auto">
			<div className="h-60 relative">
				<img
					loading="lazy"
					className="h-full hover:scale-105 duration-100 w-full rounded-md object-cover"
					src={`https://image.tmdb.org/t/p/w185//${poster_path}`}
					alt=""
					onError={(e) => {
						e.currentTarget.src = "/notfound.png";
					}}
				></img>
				<div className="left-0 top-0 absolute h-full w-full bg-gradient-to-t from-neutral-900/90"></div>
				<Group
					className="absolute bottom-0  w-full py-2 px-1"
					justify="space-between"
				>
					<Badge radius={"md"} bg={"orange"}>
						{vote_average}
					</Badge>
					<Badge radius={"md"} className="!bg-neutral-600">
						{media_type}
					</Badge>
				</Group>
			</div>
			<Text lineClamp={2} className="text-center  h-[3rem]">
				{name ? name : title}
			</Text>
		</Stack>
	);
}

export default SearchCard;
