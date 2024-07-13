import { SimpleGrid, Stack } from "@mantine/core";
import { ReactNode } from "react";

function Feed({
	content,
	title,
	className,
}: {
	content?: ReactNode;
	title?: string;
	className?: string;
}) {
	return (
		<div className={`container mx-auto  mt-4  rounded-md ${className}`}>
			<Stack>
				<h1 className="bg-neutral-900  p-2 rounded-lg text-xl font-medium">
					{title}
				</h1>

				<SimpleGrid
					cols={{ base: 2, xs: 3, md: 3, lg: 4 }}
					className="justify-center bg-neutral-900 p-4 rounded-md"
				>
					{content}
				</SimpleGrid>
			</Stack>
		</div>
	);
}

export default Feed;
