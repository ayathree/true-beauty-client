import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'


const TabCat = () => {
 
    return (
        <Tabs>
    <TabList>
      <Tab>Skin Care</Tab>     
      <Tab>Hair Care</Tab>
      <Tab>Body Care</Tab>
    </TabList>

    <TabPanel>
    <p>1</p>
    </TabPanel>
    <TabPanel>
    <p>2</p>
    </TabPanel>
    <TabPanel>
    <p>3</p>
    </TabPanel>
  </Tabs>
    );
};

export default TabCat;