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
	const [weatherData, setWeatherData] = useState({});
	const [locationData, setLocationData] = useState({});
	const [location, setLocation] = useState([]);
	// const [location, setLocation] = useState(["nosh", "tn", "usa"]);

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

	useEffect(() => {
		if (loadingErr) {
			const timer = setTimeout(() => {
				setLoadingErr(null);
			}, 5000); // set error to null after 5 seconds
			return () => clearTimeout(timer);
		}
	}, [loadingErr]);

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
			return newArray; /*returns newArray which is the location */
		} catch (error) {
			console.error(error);
		}
	}

	async function fetchLocationData(place) {
		const url = `http://api.openweathermap.org/geo/1.0/direct?q=${place[0]},${place[1]},${place[2]}&limit=1&appid=${API_KEY}`;
		//Just want the api to fetch the first suggestion that pops up

		try {
			place = location;
			console.log(place);
			const spot = await fetch(url);
			const locationInfo = await spot.json();
			// console.log(locationData); // this should help me get the location
			if (place.length !== 0 && locationInfo.length == 0) {
				setLoadingErr(
					`No data found for ${place}. Please check your spelling!`
				);
				setLocation([]);
				throw new Error("No data found, Try checking your spelling!");
			}
			return locationInfo;
		} catch (error) {
			console.error(error);
		}
	}

	async function fetchWeatherData(latitude, longitude) {
		const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${API_KEY}`;
		try {
			const weather = await fetch(url);
			const weatherInfo = await weather.json();
			console.log(weatherInfo);
			return weatherInfo;
		} catch (error) {
			console.log(error);
		}
	}

	//  data search
	const searchLocation = async (place) => {
		place = location;
		try {
			const newArr = await breakdownInput(place);
			const locationInfo = await fetchLocationData(newArr);
			setLocation([]); //clears data out of location state after fetching
			setLocationData(locationInfo); // set location data to returned json object
			console.log(locationInfo); // log data of location to console
			/*Now access locationData and set it to show in next fetch */
			const lat = locationInfo[0].lat;
			const lon = locationInfo[0].lon;
			const weather = await fetchWeatherData(lat, lon);
			setWeatherData(weather); // set weather data to returned json object
			console.log(weatherData);
			// console.log("real data I want: " + data);
		} catch (err) {
			setLoadingErr("Whoops! Something went wrong!");
			console.error(err);
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
				<SliderTabs
					problem={loadingErr}
					weather={weatherData}
					location={locationData}
				/>
				{/* <Current />
				<Forecast /> */}
			</div>
		</ChakraProvider>
	);
}

export default App;
