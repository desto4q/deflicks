import {
	Burger,
	Center,
	CloseButton,
	Drawer,
	Flex,
	Group,
	Image,
	Input,
	Stack,
} from "@mantine/core";
import { NAV_PATHS } from "../doc/doc";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useUsearch } from "../Context/store";

function Nav() {
	let navigate = useNavigate();
	let [searchState, setSearch] = useState<string>("");
	const state = useUsearch((state) => state);
	let onSubmit = (e: React.ChangeEvent<any>): void => {
		e.preventDefault();
		state.setUsearch(searchState);
		navigate("/search/" + searchState);
	};

	const [opened, { close, toggle: myswitch }] = useDisclosure(false);
	return (
		<Flex
			component="nav"
			className="absolute top-0 z-20 bg-neutral-900 bg-opacity-50 backdrop-blur-lg w-full h-16"
		>
			<Drawer

				size={"xl"}
				opened={opened}
				onClose={close}
				title="Links"
			>
				<Stack>
					{NAV_PATHS.map(({ name, path }) => {
						return (
							<Link key={name} onClick={close} to={path} className="text-neutral-400 w-full hover:bg-neutral-700 p-2 rounded-md">
								{name}
							</Link>
						);
					})}
				</Stack>
			</Drawer>
			<Group className="container  mx-auto h-full px-2 lg:px-0 ">
				<Center component={Link} to={"/"} className="h-full py-4  flex ">
					<Image src={"/Logo.png"} className="h-6  " visibleFrom="xs"></Image>
					<Image src={"/mob.png"} className="h-3/4 	 " hiddenFrom="xs"></Image>
				</Center>
				<Group className="ml-auto  " visibleFrom="sm">
					{NAV_PATHS.map(({ name, path }) => {
						return (
							<Link key={name} to={path} className="text-neutral-400 ">
								{name}
							</Link>
						);
					})}
				</Group>
				<Group
					component={"form"}
					className="ml-auto md:ml-0 "
					onSubmit={onSubmit}
				>
					<Input
						// variant="unstyled"
						// className="outline rounded-sm outline-1 outline-neutral-600 px-2 focus-within:outline-orange-200"
						placeholder="search Movies"
						value={searchState}
						onChange={(e) => setSearch(e.currentTarget.value)}
						rightSection={
							<CloseButton
								style={{ display: searchState ? "block" : "none" }}
								onClick={() => setSearch("")}
							/>
						}
					></Input>
				</Group>
				<Center hiddenFrom="xs" className="">
					<Burger onClick={myswitch} opened={opened} />
				</Center>
			</Group>
		</Flex>
	);
}

export default Nav;
