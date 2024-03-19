import { Badge, Group, Stack } from "@mantine/core";
import { results } from "../../types/typedeclaration";
interface movieCard extends Omit<results, "title"> {
	title?: string;
}
function MovieCard({ title, poster_path }: movieCard) {
	return (
		<Stack className="w-40 md:w-48 h-auto">
			<div className="h-60 relative">
				<img
					loading="lazy"
					className="h-full hover:scale-105 duration-100 w-full rounded-md object-cover"
					src={`https://image.tmdb.org/t/p/w500//${poster_path}`}
				></img>
				<Group
					className="absolute bottom-0  w-full py-2 px-1"
					justify="space-between"
				>
					<Badge radius={"md"} bg={"orange"}>
						HD
					</Badge>
					<Badge radius={"md"} className="!bg-neutral-600">
						40 mins
					</Badge>
				</Group>
			</div>
			<h2 className="text-center">{title}</h2>
		</Stack>
	);
}

export default MovieCard;
