import { Flex, Stack } from "@mantine/core";
import { useParams } from "react-router-dom";

function MovieWatch() {
	let { id, name } = useParams();
	return (
		<Stack className="container mt-20 mx-auto p-2 md:p-0">
			<Flex className="bg-neutral-900 p-2 rounded-md  gap-2" align={"baseline"}>
				<h2 className="text-lg">Movie:</h2>
				<h2 className="text-xl text-orange-400">{name}</h2>
			</Flex>
			<iframe
				allowFullScreen
				frameBorder={0}
				allow="fullscreen"
				className=" h-60 md:h-[550px] rounded-md "
				src={`https://vidsrc.to/embed/movie/${id}`}
			></iframe>
		</Stack>
	);
}

export default MovieWatch;
