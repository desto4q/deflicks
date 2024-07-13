import { Stack, Title } from "@mantine/core";

function Nopage() {
	return (
		<Stack className="container mx-auto h-svh" justify="center" align="center">
			<Title className="!text-6xl">404</Title>
			<p className="text-2xl">page not found</p>
		</Stack>
	);
}

export default Nopage;
