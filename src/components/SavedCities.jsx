import { Box, Button, Text, } from '@chakra-ui/react'
import React from 'react'

const SavedCities = ({ cities, searchCityWeather }) => {
    // const lat = localStorage.getItem()
    // console.log(cities);

    // storedLocationData.map((city, i) => // do this )

  return (
      <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around'
        }}  
      >
              { Array.isArray(cities) && cities?.length !== 0 && cities.map((city, i) => (
                  
                  <Button
                      key={i}
                    //   isLoading
                      loadingText='Loading'
                      variant='outline'
                      value={city}
                      onClick={searchCityWeather}
                      sx={{bgColor:'darkblue', zIndex: 10, textTransform: 'capitalize'}}
                >
                  {city}
                </Button>
                  
              ) )}
          </Box>
    </div>
  )
}

export default SavedCities