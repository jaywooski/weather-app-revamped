// import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, CloseButton, Heading, /*IconButton*/ } from '@chakra-ui/react'
import React from 'react'
// import Slider from 'react-slick';

const SavedCities = ({ cities, searchCityWeather, deleteCity }) => {
    // const lat = localStorage.getItem()
    // console.log(cities);

    // storedLocationData.map((city, i) => // do this )
  
  //  const settings = {
  //     dots: true,
  //     fade: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1
  //   };

  return (
    <div>
      <Heading
        as='h3'
        size='lg'
        sx={{
          textAlign: 'center',
          color: 'white',
          // outline: '1px solid blue',
          marginTop: '28px'
        }}
      >
        Saved Cities
      </Heading>
      <Box
        sx={{
          display: 'flex',
         
          maxWidth: '80%',
          padding: 5,
          // outline: '2px solid black',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          borderRadius: 20,
          marginX: 'auto',
          marginBottom: '14px',
          overflow: 'auto',
          color:'white'
        }}  
        className='saved-cities'
      >

      {/* Will implement carousel later */}
      {/* <Slider {...settings}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>

        </Slider> */}

              { Array.isArray(cities) && cities/*?.length !== 0 */ && cities.map((city, i) => (
                  
                <ButtonGroup
                  size='sm'
                  isAttached
                  variant='ghost'
                  key={i}
                  sx={{
                    marginX: '60px'
                  }}
                >
                  

                  <Button
                      // key={i}
                    //   isLoading
                      loadingText='Loading'
                      variant='outline'
                      value={city}
                      onClick={searchCityWeather}
                      sx={{bgColor:'darkblue', zIndex: 1, textTransform: 'capitalize'}}
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
                  
              ))}
          </Box>
    </div>
  )
}

export default SavedCities