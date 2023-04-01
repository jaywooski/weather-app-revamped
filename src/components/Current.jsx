import React from 'react'
import { Card, CardHeader, CardBody, Heading, Image, Text, Stack, Divider, Box, Alert,  AlertIcon, } from '@chakra-ui/react'

const Current = ({ problem, weather, location }) => {


    
  return (
      <>
        <div>
            {(!problem && weather && location[0]) ? (
                
                  <Card sx={{
                      mx: 'auto',
                      bgColor: 'rgba(0,0,0,0.6)',
                      outline: '1px solid white',
                      width: '80%',
                      minHeight: 250,
                      color: 'white'
                  }}>
                    <CardHeader>
                        <Heading sx={{textAlign:'center'}} >{location && location[0] && location[0].name}</Heading>
                    </CardHeader>
                    {(weather && weather.alerts && weather.alerts.length !== 0) ? (
                        
                        (weather.alerts.map((alert, i) => (
                            < Alert key={i} status='error' > <AlertIcon />{alert.event} until {new Date(alert.end * 1000).toLocaleString()}</Alert>))
                        )
                    ) : null
                    }
                    <CardBody sx={{}}>
                        {
                            weather && weather.current && weather.current.weather.map((condition) => (
                                <Image sx={{ marginX: 'auto', width: 150}} key={condition.id} src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`} />
                            )
                            )
                        }
                        <Divider />
                        <Box sx={{
                            display: 'flex', justifyContent: 'space-around'
                        }}>
                            <Heading size='md'>
                                {/* current conditions */}
                                {/* Sunny hardcode for now */}
                                {weather && weather.current && weather.current.weather[0].main}
                            </Heading>
                            <Text fontSize='md' fontWeight='bolder'>{weather && weather.current && (weather.current.temp) +"°F"}</Text>
                          </Box>
                          <Divider />
                          <Box
                              sx={{ display: 'flex', textAlign: 'center' }}
                          >
                            <Stack
                                sx={{
                                      marginTop: 4,
                                        width: '50%'
                                }}
                                direction='column'
                                //   divider={<StackDivider />}
                            >
                                <Text>{weather && weather.current && `Wind: ` + weather.current.wind_speed + ' mph' }</Text>
                                <Text>{weather && weather.current && `Humidity: ` + weather.current.humidity + '%' }</Text>

                            </Stack>
                            <Stack
                                sx={{
                                    marginTop: 4,
                                        width: '50%'
                                }}
                                direction='column'
                            >
                                <Text>{weather && weather.current && `UV Index: ` + weather.current.uvi }</Text>
                                <Text>{weather && weather.current && `Clouds: ` + weather.current.clouds + '%' }</Text>
                            </Stack>
                              
                          </Box>
                    </CardBody>
                </Card>
            ) : null
            }
            
    
            
          </div>
          <div>
              {(problem?.length >= 1)
                  ? (<Alert sx={{ minHeight: 250 }} status='error'><AlertIcon /><h2>{problem}</h2></Alert>)
                  : null
              } 
          </div>
      
      </>
  )
}

export default Current