import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import Current from './Current'
import Forecast from './Forecast'


const SliderTabs = ({ problem, weather, location }) => {
  return (
      <div className='slider-tabs'>
      <Tabs
        isFitted
        variant='enclosed-colored'
        size='lg'
        defaultIndex={1}
      >

        <TabList
          mb='1em'
        >
          <Tab
            _selected={{ color: 'white', bgColor: 'blue.700' }}
            _hover={{ bgColor: 'orange.500', color: 'white' }}
            _active={{ bgColor:'blue.900', color:'blue.200'}}
          >
            Current
          </Tab>
          <Tab
            _selected={{ color: 'white', bgColor: 'blue.700' }}
             _hover={{ bgColor: 'orange.500', color: 'white' }}
            _active={{ bgColor:'blue.900', color:'blue.200'}}
          >
            5-Day Forecast
          </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Current problem={problem} weather={weather} location={location} />
              </TabPanel>
              <TabPanel>
                <Forecast weather={weather} location={ location } />
              </TabPanel>
            </TabPanels>
          </Tabs>
    </div>
  )
}

export default SliderTabs