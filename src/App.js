import React from "react";
import "./App.css";
import axios from "axios";
import { useState } from "react";
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
	const [location, setLocation] = useState([]);

	// API KEY openWeatherMap API
	const API_KEY = `cc742ab3f18c60ff03116b342797094a`;

	// event handlers
	function handleChange(e) {
		setLocation(e.target.value);
	}

	function breakdownInput(str) {
		// breakdown input
		const newArray = str.split(",");

		return newArray;
	}

	//  data search
	const searchLocation = async (e) => {
		try {
			const newArr = await breakdownInput(location);
			const spot = await fetch(
				`http://api.openweathermap.org/geo/1.0/direct?q=${newArr[0]},${newArr[1]},${newArr[2]}&limit=5&appid=${API_KEY}`
			);
			const data = await spot.json();
			console.log(data); // this should help me get the location
		} catch (error) {
			throw new Error("Something went wrong!");
			console.log(error);
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
