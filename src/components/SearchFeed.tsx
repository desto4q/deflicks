import { SimpleGrid } from "@mantine/core";
import { ReactNode } from "react";

function SearchFeed({ child }: { child?: ReactNode }) {
	return (
		<SimpleGrid
			cols={{ base: 2, xs: 3, lg: 4 }}
			className="justify-center bg-neutral-900 p-4 rounded-md place-items-center"
		>
			{child}
		</SimpleGrid>
	);
}

export default SearchFeed;
