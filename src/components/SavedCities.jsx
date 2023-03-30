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
          paddingX: 16,
          marginX: 'auto',
          overflowX: 'auto'
        }}  
      >
              { Array.isArray(cities) && cities/*?.length !== 0 */ && cities.map((city, i) => (
                  
                <ButtonGroup
                  size='md'
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
                    // sx={{ bgColor: 'red' }}
                    onClick={deleteCity}
                    aria-label='delete city'
                    size='sm'
                  />
                </ButtonGroup>
                  
              ) )}
          </Box>
    </div>
  )
}

export default SavedCities