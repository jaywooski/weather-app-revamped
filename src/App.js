import React from "react";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Current from "./components/Current";
import Forecast from "./components/Forecast";
import SliderTabs from "./components/SliderTabs";

// import dotenv from "dotenv";

// dotenv.config();

function App() {
	// State configurations
	const [data, setData] = useState({});
	// const [location, setLocation] = useState([]);
	const [location, setLocation] = useState(["nosh", "tn", "usa"]);

	const [error, setError] = useState(null);
	const [loadingErr, setLoadingErr] = useState(null);

	const [suggestions, setSuggestions] = useState([]); // will set for suture feature
	/* Will create a dropdown box of potential queries the user may have meant to type.
	May incorporate new self made functions or utilize google maps api */

	// useEffect hook for alert of error/ strictly used ofr validation of input to user
	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => {
				setError(null);
			}, 5000); // set error to null after 5 seconds
			return () => clearTimeout(timer);
		}
	}, [error]);

	// API KEY openWeatherMap API
	const API_KEY = `cc742ab3f18c60ff03116b342797094a`;

	// event handlers
	function handleChange(e) {
		const query = e.target.value;
		setLocation(query);
	}

	async function breakdownInput(str) {
		try {
			// breakdown input
			if (str.length === 0) {
				setError(
					"Please enter a city, state code, and/or country code"
				);
				throw new Error("Invalid Input type!!! Blank value");
			}
			const newArray = str.split(",");
			if (newArray.length < 2 || newArray.length > 3) {
				setLocation([]);
				setError(
					"Please enter a valid city, state code and/or country code"
				);
				throw new Error("Invalid input type");
			}
			setLocation(newArray);
			console.log(location);
			return newArray;
		} catch (error) {
			// throw new error("Check your spelling!");
			console.error(error);
		}
	}

	async function fetchLocationData(place) {
		place = location;
		const url = `http://api.openweathermap.org/geo/1.0/direct?q=${place[0]},${place[1]},${place[2]}&limit=1&appid=${API_KEY}`;
		//Just want the api to fetch the first suggestion that pops up

		try {
			console.log(place);
			const spot = await fetch(url);
			const locationData = await spot.json();
			console.log(locationData); // this should help me get the location
			if (locationData.length == 0) {
				setLoadingErr(
					`No data found for ${place}. Please check your spelling!`
				);
				setLocation([]);
				throw new Error("No data found, Try checking your spelling!");
			}
		} catch (error) {}
	}

	//  data search
	const searchLocation = async (place) => {
		place = location;

		try {
			// const newArr = await breakdownInput(place);
			const data = await fetchLocationData(place);
			setLocation([]); //clears data out of location state after fetching

			/*Now access locationdata and set it to show in next fetch */
			// console.log(newArr);
			// console.log(location);
		} catch (error) {
			throw new Error("Uh oh! Check your spelling!");
			// console.log(error);
		}
	};

	// const weather_url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${process.env.API_KEY}`;
	// const location_url = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${statecode},${countrycode}&limit=5&appid=${process.env.API_KEY}`;

	// const weather_url = `https://api.openweathermap.org/data/3.0/onecall?lat=36.1622767&lon=-86.7742984&exclude=minutely,hourly&appid=cc742ab3f18c60ff03116b342797094a`;
	// const location_url = `http://api.openweathermap.org/geo/1.0/direct?q=nashville,tn,usa&limit=4&appid=cc742ab3f18c60ff03116b342797094a`;

	return (
		<ChakraProvider>
			<div className="App">
				{/* searchbar component */}
				<SearchBar
					place={location}
					updatePlace={handleChange}
					search={searchLocation}
					errorMsg={error}
					onSuggestions={null}
				/>

				{/* Current conditions */}
				<SliderTabs />
				{/* <Current />
				<Forecast /> */}
			</div>
		</ChakraProvider>
	);
}

export default App;
