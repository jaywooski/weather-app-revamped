import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Image, Text, Stack, Divider, Box } from '@chakra-ui/react'

const Current = () => {
  return (
      <div>
          <Card sx={{ mx: 'auto', bgColor: 'rgba(0,0,0,0.2)', outline: '1px solid white', width:'80%', minHeight: 250}}>
              <CardHeader>
                  <Heading >Nashville</Heading>
              </CardHeader>
              <CardBody>
                  <Image src='https://media.istockphoto.com/id/1200224188/photo/white-clouds-and-sun-in-blue-sky.jpg?s=612x612&w=is&k=20&c=pR09pii9qKClD1Vn5uhmLZ-9xnCMYoy6oMtNOqM7jM4='/>
                  <Divider /> 
              <Box sx={{
                  display: 'flex', justifyContent: 'space-around'}}>
                      <Heading size='md'>
                          {/* current conditions */}
                          Sunny {/*hardcode for now */}
                      </Heading>
                      <Text fontSize='md' fontWeight='bolder'>60°F</Text>
                  </Box>
            </CardBody>
          </Card>          
    </div>
  )
}

export default Current