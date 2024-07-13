import { Badge, Flex, Group, Text } from "@mantine/core";
import { SearchResults } from "../../types/typedeclaration";
import { Link } from "react-router-dom";
// interface Searches extends Omit<results, "title"> {
// 	title?: string;
// }

function SearchCard({
	name,
	poster_path,
	vote_average,
	media_type,
	title,
	id,
}: SearchResults) {
	console.log(media_type);
	return (
		<Flex 
		direction="column"
			className="w-40 md:w-48 h-auto"
			component={Link}
			to={`${
				media_type == "movie"
					? `/movie/${title?.replace("", "-")}/${id}`
					: media_type == "tv"
					? `/series/${name?.replace(" ", "-")}/${id}`
					: "/404"
			}`}
		>
			<div className="h-[300px] relative hover:scale-105 duration-100">
				<img
					loading="lazy"
					className="h-full 	 w-full rounded-md object-cover"
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
					<Badge radius={"xs"} bg={"orange"}>
						{vote_average}
					</Badge>
					<Badge radius={"xs"} className="!bg-neutral-600">
						{media_type}
					</Badge>
				</Group>
			</div>
			<Text lineClamp={2} className="text-center  h-[3rem]">
				{name ? name : title}
			</Text>
		</Flex>
	);
}

export default SearchCard;
