import React from "react";
import "./index.css";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
// import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// import Current from "./components/Current";
// import Forecast from "./components/Forecast";
import SliderTabs from "./components/SliderTabs";
import SavedCities from "./components/SavedCities";
import Localbase from "localbase";
import VideoBackground from "./components/VideoBackground";
import weathervid from "./assets/weather.mp4";
// import dotenv from "dotenv";

// dotenv.config();

function App() {
	// State configurations
	const [weatherData, setWeatherData] = useState({});
	const [locationData, setLocationData] = useState({});
	const [location, setLocation] = useState("");

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

	useEffect(() => {
		// if (location) {
		// 	searchLocation(location);
		// }
	});

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
			// const index = storedLocationData.length;
			// db.collection("cities")
			// 	.doc(`key-${index}`)
			// 	.set({
			// 		id: index - (index - 1),
			// 		cityName: storedLocationData[index],
			// 	});
		}

		/*End here */
	}, [storedLocationData]);

	useEffect(() => {
		// console.log(`location has been set to ${location}`);
	}, [location]);

	// API KEY openWeatherMap API
	const API_KEY = `cc742ab3f18c60ff03116b342797094a`;

	// event handlers
	function handleChange(e) {
		const query = e.target.value;
		setLocation(query);
	}

	async function handleData(e, city) {
		e.preventDefault();
		try {
			city = e.target.value.trim();
			// console.log("city: " + city + " " + typeof city);
			// // searchLocationTarg(city);
			searchLocation(city);
		} catch (error) {
			console.error(error);
		}
	}

	async function handleSearch(e) {
		e.preventDefault();

		try {
			searchLocation(location);
			// console.log(
			// 	`location: ${JSON.stringify(
			// 		location
			// 	)} + type of location: ${typeof location}`
			// );
		} catch (error) {
			console.error(error);
		}
	}

	async function handleDelete(e) {
		try {
			// need event target to equal the value of the
			const city = e.target.previousElementSibling.value; // from stack overflow

			if (e.target.previousElementSibling) {
				deleteData(city);
				console.log("prev element is " + JSON.stringify(city));
			}
			db.collection("cities")
				.doc({ cityName: city })
				.delete()
				.then((response) => {
					console.log(`Delete Successful!`);
				})
				.catch((err) => {
					console.error(err);
				});
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
				str.toLowerCase().trim();
				str = str.split(",");
			}

			/* will test this one later */
			if (!str /*str.length == 0*/) {
				setError(
					"Please enter a city, state code, and/or country code"
				);
				throw new Error("Invalid Input type!!! Blank value");
			}

			// Will come back and fix this piece here for validation of location

			if (str.length < 2 || str[1].length < 2 || str.length > 3) {
				// setLocation([]);
				setError(
					"Please enter a valid city, state code and/or country code"
				);
				setLocation("");
				throw new Error("Invalid input type");
			}

			setLocation(str);

			// console.log(`str: ${str}`);

			return str; //str is equal to location
		} catch (error) {
			console.error(error);
		}
	}

	// This function will save info in storedLocationData
	// Only want it to occur, when location info is not empty
	async function updateData(loc) {
		// Set place to indexedDB
		try {
			const updatedData = [...storedLocationData, loc];

			// filter and remove duplicate values
			// console.log(`updatedData: ${JSON.stringify(updatedData)}`);

			var newData = updatedData.map((city) => {
				if (typeof city === "string") {
					return city.toLowerCase();
				}
				// city is coming back as an array i.e
				// ["Tampa", " fl"]
				// city.toLowerCase();
				city = city.join(",").toLowerCase();
				// console.log(`city type is ` + typeof city);
				// /**UNCOMMENT WHEN DONE */
				// console.log(`city: ${JSON.stringify(city)}`);
				return city; /*.split(",")*/
			});

			// console.log(`newData: ${newData}`);

			var returnData = newData.filter(
				(city, i) => newData.indexOf(city) === i
			);

			// console.log(`returnData: ${JSON.stringify(returnData)}`);
			setStoredLocationData(returnData);

			returnData.forEach((city, i) => {
				db.collection("cities")
					.add(
						{
							id: i,
							cityName: city,
						},
						`key-${i}`
					)
					.then((response) =>
						console.log(`Added city successfully!`)
					);
			});

			// return returnData;
		} catch (error) {
			console.error(error);
		}
	}

	async function deleteData(loc) {
		try {
			/*
			if loc match db object's key name... delete it 
			from indexedDB database
			 */

			const cities = [...storedLocationData];
			// console.log(JSON.stringify(cities));

			// filter through state array and return all
			// locations that do not match the selected city
			// aka "loc"

			const resultArray = cities.filter((city) => city !== loc);
			// It should automatically update in UseEffect hook
			setStoredLocationData(resultArray); // set state to returned Array
			// console.log(
			// 	`result array of storedLocationData is ${JSON.stringify(
			// 		storedLocationData
			// 	)}`
			// );

			db.collection("cities").doc({ cityName: loc }).delete();
		} catch (error) {
			console.error(error);
		}
	}

	async function fetchLocationData(place) {
		try {
			// This url is for the location retrieval
			const url = `http://api.openweathermap.org/geo/1.0/direct?q=${place[0]},${place[1]},${place[2]}&limit=1&lang=en&appid=${API_KEY}`;
			//Just want the api to fetch the first suggestion that pops up
			// which is why limit=1 in url. It can go up to 5... keep that in
			// mind for suggestions potentially in future

			const spot = await fetch(url);
			const locationInfo = await spot.json(); // location info returned as json

			// console.log(`locationInfo: ${locationInfo}`);

			if (place.length !== 0 && locationInfo.length === 0) {
				setLoadingErr(
					`No data found for ${place}. Please check your spelling!`
				);
				// setLocation(""); setLocation back to original state
				throw new Error("No data found, Try checking your spelling!");
			}

			// Think this is where I want to call it due to the check above^^
			updateData(place);

			return locationInfo; // returns location info back as json data
		} catch (error) {
			console.error(error);
		}
	}

	async function fetchWeatherData(latitude, longitude) {
		const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly&lang=en&appid=${API_KEY}`;
		try {
			const weather = await fetch(url);
			const weatherInfo = await weather.json();
			console.log(weatherInfo);
			return weatherInfo; // returns weather info as json data
		} catch (error) {
			console.log(error);
		}
	}

	//  data search
	const searchLocation = async (place) => {
		/******************************************* */
		try {
			const newArr = await breakdownInput(place);
			// updateData(newArr);
			const locationInfo = await fetchLocationData(newArr);
			// fetchLocationData is expecting an array

			// updateData();
			// const storedInfo = await cityStore.json();
			// console.log(`returned data is: ${updateData()}`);

			setLocationData(locationInfo); // set location data to returned json object

			/*Now access locationData and set it to show in next fetch */
			const lat = locationInfo[0].lat;
			const lon = locationInfo[0].lon;
			const weather = await fetchWeatherData(lat, lon);
			setWeatherData(weather); // set weather data to returned json object
			setLocation(""); //clears data out of location state after fetching
		} catch (err) {
			// setError(
			// 	"Please check your spelling. Input a valid city name, state code, and/or country code"
			// );
			setLoadingErr("Whoops! Something went wrong!");
			setLocationData({});
			console.error(err);
		} finally {
			/* ************ commented outtttt */
			// console.log("weatherData: " + typeof weatherData);
			// console.log("locationData: " + locationData[0]);
			/*********** commented out          */
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
				{/* Video background looping as background */}
				{/* <VideoBackground  /> */}

				{/* searchbar component */}
				<SearchBar
					place={location}
					updatePlace={handleChange}
					search={handleSearch}
					errorMsg={error}
					onSuggestions={null}
				/>

				{/* Saved cities stack goes here */}
				<SavedCities
					cities={storedLocationData}
					searchCityWeather={handleData}
					deleteCity={handleDelete}
				/>

				{/* Current conditions */}
				<SliderTabs
					problem={loadingErr}
					weather={weatherData}
					location={locationData}
				/>
			</div>
		</ChakraProvider>
	);
}

export default App;
