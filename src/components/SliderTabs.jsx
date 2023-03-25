import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import Current from './Current'
import Forecast from './Forecast'


const SliderTabs = ({ problem, weather, location }) => {
  return (
      <div>
          <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
              <Tab>Current</Tab>
              <Tab>5-Day Forecast</Tab>
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