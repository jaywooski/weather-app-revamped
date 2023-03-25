import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Image, Text, Stack, Divider, Box, Alert, AlertTitle, AlertIcon } from '@chakra-ui/react'

const Current = ({ problem }) => {
  return (
      <div>
          {(!problem) ? (
              
              <Card sx={{ mx: 'auto', bgColor: 'rgba(0,0,0,0.2)', outline: '1px solid white', width: '80%', minHeight: 250 }}>
                  <CardHeader>
                      <Heading >Nashville</Heading>
                  </CardHeader>
                  <CardBody>
                      <Image src='https://media.istockphoto.com/id/1200224188/photo/white-clouds-and-sun-in-blue-sky.jpg?s=612x612&w=is&k=20&c=pR09pii9qKClD1Vn5uhmLZ-9xnCMYoy6oMtNOqM7jM4=' />
                      <Divider />
                      <Box sx={{
                          display: 'flex', justifyContent: 'space-around'
                      }}>
                          <Heading size='md'>
                              {/* current conditions */}
                              Sunny {/*hardcode for now */}
                          </Heading>
                          <Text fontSize='md' fontWeight='bolder'>60°F</Text>
                      </Box>
                  </CardBody>
              </Card>
          ) : <Alert sx={{ minHeight: 250 }} status='error'><AlertIcon /><h2>{ problem }</h2></Alert>
}
          
    </div>
  )
}

export default Current