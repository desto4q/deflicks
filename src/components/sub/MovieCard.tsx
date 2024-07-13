import { Badge, Flex, Group} from "@mantine/core";
import { results } from "../../types/typedeclaration";
import { Link } from "react-router-dom";
interface movieCard extends Omit<results, "title"> {
	title?: string;
}
function MovieCard({
	title,
	poster_path,
	vote_average,
	release_date,
	id,
}: movieCard) {
	return (
		<Flex
			direction={"column"}
			component={Link}
			to={`/movie/${title}/${id}`}
			className="w-40 md:w-48 h-auto"
		>
			<div className="h-[300px] relative hover:scale-105 duration-100">
				<img
					loading="lazy"
					className="h-full hover:scale-105  w-full rounded-md object-cover"
					src={`https://image.tmdb.org/t/p/w200//${poster_path}`}
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
						{release_date?.substring(0, 4)}
					</Badge>
				</Group>
			</div>
			<h2 className="text-center">{title}</h2>
		</Flex>
	);
}

export default MovieCard;
