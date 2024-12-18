import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/pages/home';
import { NewMetas } from './src/pages/newMetas';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/Routes';







export default function App() {

  




  return (
    <NavigationContainer>

    <Routes/>
    <StatusBar style="auto" />
    
    </NavigationContainer>
    
    
  );
}


