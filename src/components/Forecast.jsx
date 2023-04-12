import { Box, Card, CardBody, CardHeader, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const Forecast = ( { problem, weather, location } ) => {
  return (
    <div>
      {(!problem && weather && location[0]) ? (
        <Box sx={{
          mx: 'auto',
          // bgColor: 'rgba(0,0,0,0.2)',
          outline: '1px solid white',
          width: '80%',
          minHeight: 250,
          maxHeight: 520,
          overflowY: 'scroll',
          // height: `40%`
        }}>
          <Heading
            sx={{
              textAlign: 'center',
              color: 'white',
              position: 'sticky',
              zIndex: 5,
              top: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)'

            }}
          >
            {location && location[0] && location[0].name}
          </Heading>
          
          {(weather && weather.daily && weather.daily.length !== 0) ? (
                        
                        (weather.daily.map((day, i) => (
                          <Card
                            key={i}
                            sx={{
                              bgColor: 'rgba(0,0,0,0.6)',
                              outline: '1px solid white',
                              textColor: 'white'
                            }}
                          >
                            <CardHeader
                              sx={{ textAlign: 'center' }}>{new Date(day.dt * 1000).toLocaleString('en-US', { weekday: 'long', month: 'long', day: '2-digit' })} </CardHeader>
                            <Divider />
                            <CardBody sx={{ display: 'flex', justifyContent: 'center'}}>
                              <Stack sx={{ width: `50%`}}>
                                <Image
                                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                  alt={day.weather[0].description}
                                  sx={{ maxWidth: 100}}
                                />
                                <Heading
                                  size='sm'
                                  sx={{textTransform:'capitalize'}}
                                >{day.weather[0].description}</Heading>
                                <Text>{ `Lo: ${Math.floor(day.temp.min)}°F` }</Text>
                                <Text>{ `Hi: ${Math.floor(day.temp.max)}°F` }</Text>
                              </Stack>
                              <Stack sx={{ width: `50%` }}>
                                <Text>{`Humidity: ${day.humidity}%`}</Text>
                                <Text>{`Wind: ${Math.floor(day.wind_speed)}mph (Gusts up to ${Math.floor(day.wind_gust)}mph)`}</Text>
                                <Text>{`UV Index: ${day.uvi}` }</Text>
                                <Text>{`Sunrise: ${new Date(day.sunrise * 1000).toLocaleString('en-US', {hour:'2-digit', minute:'2-digit' })}`}</Text>
                                <Text>{`Sunset: ${new Date(day.sunset * 1000).toLocaleString('en-US', {hour:'2-digit', minute:'2-digit' })}`}</Text>

                              </Stack>
                            </CardBody>
                          </Card>
                            ))
                        )
                    ) : null
                    }

        </Box>
        // weather.daily.map((day, i) => {
        //   <Card
        //     key={day[i]}
        //   >
        //     <CardHeader>{new Date(day.dt * 1000)}</CardHeader>
        //     <CardBody></CardBody>
        //   </Card>
        // })
      ) : null
      }
          
    </div>
  )
}

export default Forecast