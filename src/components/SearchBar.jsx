import { Search2Icon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";

const SearchBar = ({place, updatePlace, search, errorMsg, onSuggestions}) => {
	return (
		<div>
			<Box>
				
				<FormControl isInvalid={errorMsg}>
					<FormLabel>City Name</FormLabel>
					<InputGroup>
					<Input
						variant="filled"
						placeholder="Enter location (e.g. Los Angeles, CA, US or New York City, NY"
						value={place}
						type='text'
						onChange={updatePlace}
						onDoubleClick={search}
						onSubmit={search}
						/>
					<InputRightElement>
						<IconButton
							type="button"
							aria-label="Search city"
							icon={<Search2Icon />}
							value={place}
							onClick={search}
						/>
					</InputRightElement>
					</InputGroup>
			{/* Set alert to show only when error is discovered and set time for it to 
			be shown before it disappears */}
					{errorMsg ? <FormErrorMessage>{errorMsg}</FormErrorMessage> 
					: <FormHelperText>Enter city name, state abbreviations, and/or country abbreviations</FormHelperText>
			}
				</FormControl>

			</Box>
			{/* { errorMsg && <Alert status="error"><AlertIcon />{ errorMsg }</Alert>} */}
		</div>
	);
};

export default SearchBar;
