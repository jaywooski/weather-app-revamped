import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import Current from './Current'
import Forecast from './Forecast'


const SliderTabs = () => {
  return (
      <div>
          <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
              <Tab>Current</Tab>
              <Tab>5-Day Forecast</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/* <p>one!</p> */}
                <Current />
              </TabPanel>
              <TabPanel>
                {/* <p>two!</p> */}
                <Forecast />
              </TabPanel>
            </TabPanels>
          </Tabs>
    </div>
  )
}

export default SliderTabs