import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ActiveTicket from './ActiveTicket';
import RecentAssign from './RecentAssign';
import ActiveTicketTab from './ActiveTicketTab';
import ClosedTickets from './ClosedTickets';

const Tab = createMaterialTopTabNavigator();

export default function TopTab() {
  return (
    <Tab.Navigator tabBarLabelStyle={{flex:1, flexDirection: 'row'}}>
      <Tab.Screen name="Active" component={ActiveTicketTab} />
      <Tab.Screen name="Closed" component={ClosedTickets} />
    </Tab.Navigator>
  );
}