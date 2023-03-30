import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, CloseButton, IconButton, Text, } from '@chakra-ui/react'
import React from 'react'

const SavedCities = ({ cities, searchCityWeather, deleteCity }) => {
    // const lat = localStorage.getItem()
    // console.log(cities);

    // storedLocationData.map((city, i) => // do this )

  return (
      <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          maxWidth: '600px',
          padding: 10,
          outline: '2px solid black',
          marginX: 'auto',
          overflowX: 'auto',
          color:'white'
        }}  
      >
              { Array.isArray(cities) && cities/*?.length !== 0 */ && cities.map((city, i) => (
                  
                <ButtonGroup
                  size='sm'
                  isAttached
                  variant='ghost'
                  // value={city}
                  key={i}
                >
                  

                  <Button
                      // key={i}
                    //   isLoading
                      loadingText='Loading'
                      variant='outline'
                      value={city}
                      onClick={searchCityWeather}
                      sx={{bgColor:'darkblue', zIndex: 10, textTransform: 'capitalize'}}
                >
                  {city}
                  

                </Button>
                  <CloseButton
                    sx={{
                      bgColor: 'red',
                      display: 'flex',
                      alignContent: 'center',
                      outline: '1px solid white'
                    }}

                    onClick={deleteCity}
                    aria-label='delete city'
                    size='md'
                  />
                </ButtonGroup>
                  
              ) )}
          </Box>
    </div>
  )
}

export default SavedCities