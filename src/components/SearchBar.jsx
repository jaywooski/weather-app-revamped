import { Search2Icon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";

const SearchBar = ({place, updatePlace, search}) => {
	return (
		<div>
			<Box>
				<InputGroup>
					<Input
						variant="filled"
						placeholder="Enter location"
						value={place}
						type='text'
						onChange={updatePlace}
						onEnter={search}
						/>
					<InputRightElement>
						<IconButton
							type="submit"
							aria-label="Search city"
							icon={<Search2Icon />}
							onSubmit={search}
						/>
					</InputRightElement>
				</InputGroup>

			</Box>
		</div>
	);
};

export default SearchBar;
