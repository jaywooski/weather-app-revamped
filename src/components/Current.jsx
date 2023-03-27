import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Image, Text, Stack, Divider, Box, Alert, AlertTitle, AlertIcon } from '@chakra-ui/react'

const Current = ({ problem, weather, location }) => {


    
  return (
      <>
        <div>
            {(!problem && weather && location[0]) ? (
                
                <Card sx={{ mx: 'auto', bgColor: 'rgba(0,0,0,0.2)', outline: '1px solid white', width: '80%', minHeight: 250 }}>
                    <CardHeader>
                        <Heading >{location && location[0] && location[0].name}</Heading>
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