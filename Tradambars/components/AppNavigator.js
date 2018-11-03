import { createStackNavigator } from 'react-navigation';
import Catalog from './Catalog';
import Map from './Map';

const AppNavigator = createStackNavigator({
  Catalog: { screen: Catalog },
  Map: { screen: Map },
},
  {
    initialRouteName: 'Catalog',
    headerMode: 'none'
  }
);

export default AppNavigator;