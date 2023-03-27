import React from "react";
import "./App.css";
// import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// import Current from "./components/Current";
// import Forecast from "./components/Forecast";
import SliderTabs from "./components/SliderTabs";
import SavedCities from "./components/SavedCities";
import Localbase from "localbase";
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

	// localbase(indexedDB) initialization
	const db = new Localbase("db");

	// useEffect hook for alert of error/ strictly used ofr validation of input to user
	useEffect(() => {
		setWeatherData([]);
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

	/* Switching with indexedDB instead of localStorage */
	useEffect(() => {
		db.collection("cities")
			.get()
			.then((cities) => {
				console.log(cities);

				/*Create empty array to hold all stored location data */
				const tempArray = [];

				/*returns an array of all cities */
				cities.forEach((city) => {
					// console.log(city.cityName);
					const name = city.cityName;
					tempArray.push(name.trim());

					// console.log("tempArray: " + tempArray);
				});

				setStoredLocationData(tempArray);
				console.log("state: " + storedLocationData);
			});
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
		db.collection("cities")
			.get()
			.then((cities) => {
				/*returns an array of all cities */
				cities.forEach((city) => {
					console.log(city.cityName);
					// tempArray.push(city.cityName);
				});
				console.log("state: " + storedLocationData);
			});
	}, [storedLocationData]);

	useEffect(() => {
		console.log(`location has been set to ${location}`);
	}, [location]);

	// API KEY openWeatherMap API
	const API_KEY = `cc742ab3f18c60ff03116b342797094a`;

	// event handlers
	async function handleChange(e) {
		const query = e.target.value;
		// const result = await breakdownInput(query);
		setLocation(query);
		// console.log(typeof result);
		// console.log(result);
		// console.log(result.json());
	}

	async function handleData({ target }) {
		// e.preventDefault();
		try {
			const city = target.value;
			const arr = [city];
			// if (typeof city === "string") {
			// 	return city;
			// }
			// return [city];
			// setLocation(arr);
			console.log("arr: " + arr + " " + typeof arr);
			console.log("city: " + city + " " + typeof city);
			// searchLocation(city);
		} catch (error) {
			console.error(error);
		}
	}

	async function breakdownInput(str) {
		try {
			str.toLowerCase();
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
			// place = location;
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

			// Set place to indexedDB

			const updatedData = [...storedLocationData, location];
			// filter and remove duplicate values
			const returnData = updatedData
				.map((city) => {
					if (typeof city === "string") {
						city.toLowerCase();
					}
				})
				.filter((city, i) => updatedData.indexOf(city) === i);
			// console.log(returnData);

			returnData.forEach((city, i) => {
				db.collection("cities").add(
					{
						id: i,
						cityName: city.toLowerCase(),
					},
					`key-${i}`
				);
			});

			setStoredLocationData(returnData);
			/* Switching with indexedDB instead of localStorage
			// localStorage.setItem("cities", JSON.stringify(returnData));
			// console.log(JSON.parse(localStorage.getItem("cities")));
			*/

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
	const searchLocation = async (city) => {
		/******************************************* */
		try {
			var newArr = "";
			if (location && location != "") {
				const place = await location.toLowerCase();
				// const loc = await setLocation(place);
				console.log(place);
				newArr = await breakdownInput(place);
				// continue();
			}

			newArr = [city];
			console.log(newArr);

			const locationInfo = await fetchLocationData(newArr);
			// const locationInfo = await fetchLocationData(location);
			console.log(locationInfo); // log data of location to console
			setLocationData(locationInfo); // set location data to returned json object

			/*Now access locationData and set it to show in next fetch */
			const lat = locationInfo[0].lat;
			const lon = locationInfo[0].lon;
			const weather = await fetchWeatherData(lat, lon);
			setWeatherData(weather); // set weather data to returned json object
			setLocation(""); //clears data out of location state after fetching
			// console.log(weatherData);
			// console.log("real data I want: " + data);
		} catch (err) {
			// setError(
			// 	"Please check your spelling. Input a valid city name, state code, and/or country code"
			// );
			setLoadingErr("Whoops! Something went wrong!");
			setLocationData({});
			console.error(err);
		} finally {
			console.log("weatherData: " + typeof weatherData);
			console.log("locationData: " + locationData[0]);
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
