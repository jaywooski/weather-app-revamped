import React from "react";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// import Current from "./components/Current";
// import Forecast from "./components/Forecast";
import SliderTabs from "./components/SliderTabs";
import SavedCities from "./components/SavedCities";

// import dotenv from "dotenv";

// dotenv.config();

function App() {
	// State configurations
	const [weatherData, setWeatherData] = useState({});
	const [locationData, setLocationData] = useState({});
	const [location, setLocation] = useState([]);

	// localStorage state config
	const [storedLocationData, setStoredLocationData] = useState([]);

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

	useEffect(() => {
		// log storedLocationData
		const data = localStorage.getItem("cities");
		if (data) {
			// const cities = JSON.parse(data);
			const cities = JSON.parse(data);
			setStoredLocationData(cities);
			localStorage.setItem("cities", cities);
		}
		localStorage.setItem(
			"cities",
			JSON.parse(breakdownInput(storedLocationData))
		);
		// console.log(JSON.parse(data));
	}, []);

	useEffect(() => {
		if (
			Array.isArray(storedLocationData) &&
			storedLocationData?.length > 6
		) {
			// if stored location data array surpasses 6 elements do this...
			// keeps it at 6
			storedLocationData.shift();
		}
		// setStoredLocationData(JSON.stringify(localStorage.getItem("cities")));
		// console.log("data: " + data);
		// setStoredLocationData(data);
		// console.log(storedLocationData);
		// localStorage.setItem("cities", JSON.stringify(storedLocationData));
	}, [storedLocationData]);

	// API KEY openWeatherMap API
	const API_KEY = `cc742ab3f18c60ff03116b342797094a`;

	// event handlers
	async function handleChange(e) {
		e.preventDefault();
		const query = e.target.value;
		// const result = await breakdownInput(query);
		setLocation(query);
		// console.log(typeof result);
		// console.log(result);
		// console.log(result.json());
	}

	function handleData({ target }) {
		// e.preventDefault();
		try {
			const city = target.value;
			const arr = [city];
			// if (typeof city === "string") {
			// 	return city;
			// }
			// return [city];
			setLocation(city);
			console.log(arr);
			console.log(location);
			searchLocation(city);
		} catch (error) {
			console.error(error);
		}
	}

	async function breakdownInput(str) {
		try {
			// breakdown input
			// step 1: test to see if it's an array or string
			if (typeof str === "string") {
				// Convert string to array by splitting on commas
				str = str.split(",");
			}

			/* will test this one later */
			if (!str /*str.length == 0*/) {
				setError(
					"Please enter a city, state code, and/or country code"
				);
				throw new Error("Invalid Input type!!! Blank value");
			}
			// // newyork, ny would be a string
			// // Join array elements into a string and then split on commas
			// const newArray = str.join(",").split(",");

			if (str.length < 2 || str.length > 3) {
				// setLocation([]);
				setError(
					"Please enter a valid city, state code and/or country code"
				);
				throw new Error("Invalid input type");
			}
			// // setLocation(newArray);
			// console.log(newArray);
			// return newArray; /*returns newArray which is the location */
			setLocation(str);
			return str;
		} catch (error) {
			console.error(error);
		}
	}

	async function fetchLocationData(place) {
		// This url is for the location retrieval
		const url = `http://api.openweathermap.org/geo/1.0/direct?q=${place[0]},${place[1]},${place[2]}&limit=1&lang=en&appid=${API_KEY}`;
		//Just want the api to fetch the first suggestion that pops up

		try {
			place = location;
			// console.log(place);

			const spot = await fetch(url);
			const locationInfo = await spot.json();
			// console.log(locationData); // this should help me get the location
			if (place.length !== 0 && locationInfo.length == 0) {
				setLoadingErr(
					`No data found for ${place}. Please check your spelling!`
				);
				// setLocation([]);
				throw new Error("No data found, Try checking your spelling!");
			}

			// Set place to localStorage

			const updatedData = [...storedLocationData, location];
			console.log(updatedData);
			// filter and remove duplicate values
			const returnData = updatedData.filter(
				(city, i) => updatedData.indexOf(city) === i
			);
			localStorage.setItem("cities", JSON.stringify(returnData));
			console.log(JSON.parse(localStorage.getItem("cities")));
			setStoredLocationData(returnData);

			return locationInfo;
		} catch (error) {
			console.error(error);
		}
	}

	async function fetchWeatherData(latitude, longitude) {
		const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly&lang=en&appid=${API_KEY}`;
		try {
			const weather = await fetch(url);
			const weatherInfo = await weather.json();
			// console.log(weatherInfo);
			return weatherInfo;
		} catch (error) {
			console.log(error);
		}
	}

	//  data search
	const searchLocation = async (place, e) => {
		// setLocation(place);
		/******************************************* */
		try {
			place = location;

			const newArr = await breakdownInput(place);
			const locationInfo = await fetchLocationData(newArr);
			// const locationInfo = await fetchLocationData(location);
			// console.log(locationInfo); // log data of location to console
			/*Now access locationData and set it to show in next fetch */
			const lat = locationInfo[0].lat;
			const lon = locationInfo[0].lon;
			const weather = await fetchWeatherData(lat, lon);
			setLocation(""); //clears data out of location state after fetching
			setLocationData(locationInfo); // set location data to returned json object
			setWeatherData(weather); // set weather data to returned json object
			// console.log(weatherData);
			// console.log("real data I want: " + data);
		} catch (err) {
			// setError(
			// 	"Please check your spelling. Input a valid city name, state code, and/or country code"
			// );
			// setLoadingErr("Whoops! Something went wrong!");
			console.error(err);
		}
		/************************************************* */
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

				{/* Saved cities stack goes here */}
				<SavedCities
					cities={storedLocationData}
					searchCityWeather={handleData}
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
