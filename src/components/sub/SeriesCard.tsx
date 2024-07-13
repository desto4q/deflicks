import { Badge, Group, Text } from "@mantine/core";
import { results } from "../../types/typedeclaration";
import { Link } from "react-router-dom";

export interface Iseries extends Omit<results, "title"> {
	name: string;
	reloadDoc?: boolean;
}
function SeriesCard({
	name,
	poster_path,
	vote_average,
	original_language,
	id,
	reloadDoc,
}: Iseries) {
	return (
		<Link
			reloadDocument={reloadDoc}
			to={`/series/${name?.replace(" ", "-")}/${id}`}
			className="w-40 md:w-48 h-auto flex flex-col gap-1"
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
						{original_language}
					</Badge>
				</Group>
			</div>
			<Text lineClamp={2} className="text-center  h-[3rem]">
				{name}
			</Text>
		</Link>
	);
}

export default SeriesCard;
