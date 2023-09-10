/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import { RNCSafeAreaProvider } from 'react-native-safe-area-context';


import React from 'react';
import type {PropsWithChildren} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './src/components/StackNav';
import { Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';


function App(): JSX.Element {
  return(
    <React.StrictMode>
    <PaperProvider>
      <NavigationContainer>
       <StackNav/>
       </NavigationContainer>
    </PaperProvider>


  </React.StrictMode>
    

  )
  
}


export default App;
