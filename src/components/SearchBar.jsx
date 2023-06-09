import { Search2Icon } from "@chakra-ui/icons";
import { /*Alert, AlertIcon, Button,*/ Box, FormControl, FormErrorMessage, FormHelperText, FormLabel, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";

const SearchBar = ({place, updatePlace, search, errorMsg, onSuggestions}) => {
	return (
		<div className="sticky-top">
			<Box>
				<form
					onSubmit={search}
					autoComplete="off"
				>
					<FormControl isInvalid={errorMsg}>
						<FormLabel sx={{textAlign:'center', textColor:'white'}}>City Name</FormLabel>
						<InputGroup>
						<Input
							variant="filled"
							placeholder="Enter location (e.g. Los Angeles, CA, US or New York City, NY)"
							value={place}
								type='text'
								foc
								onChange={updatePlace}
								color='white'
							_placeholder={{ color: 'blue.400'}}	
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
					: <FormHelperText sx={{textColor:'white'}}>Enter city name, state abbreviations, and/or country abbreviations</FormHelperText>
				}
				</FormControl>

				</form>
			</Box>
			{/* { errorMsg && <Alert status="error"><AlertIcon />{ errorMsg }</Alert>} */}
		</div>
	);
};

export default SearchBar;
