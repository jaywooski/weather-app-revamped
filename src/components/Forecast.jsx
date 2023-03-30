import { Box, Card, CardBody, CardHeader } from '@chakra-ui/react'
import React from 'react'

const Forecast = ( { problem, weather, location } ) => {
  return (
    <div>
      {(!problem && weather && location[0]) ? (
        <Box>
          {(weather && weather.daily && weather.daily.length !== 0) ? (
                        
                        (weather.daily.map((day, i) => (
                          < Card key={i} >
                            <CardHeader >{new Date(day.dt * 1000).toLocaleString()} </CardHeader>
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