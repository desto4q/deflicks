import { SimpleGrid } from "@mantine/core";
import { ReactNode } from "react";

function SimilarFeed({ child }: { child?: ReactNode }) {
	return (
		<SimpleGrid
			cols={{ base: 2, xs: 3, md:4, lg: 5 }}
			className="justify-center bg-neutral-900 p-4 rounded-md place-items-center"
		>
			{child}
		</SimpleGrid>
	);
}

export default SimilarFeed;
