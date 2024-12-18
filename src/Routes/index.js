import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // Importando Stack Navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons'; 



import { Home } from '../pages/home';
import { NewMetas } from '../pages/newMetas';
import { MyMetas } from '../pages/myMetas';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    


<Tab.Navigator 
screenOptions={{
    
    
  
  tabBarStyle: { position: 'absolute' },
    tabBarBackground: () => (
      <BlurView tint="light" intensity={10} style={StyleSheet.absoluteFill} />
    ),
  }}

>
        <Tab.Screen 
        name="Adicionar Metas" 
        component={NewMetas}
        options={{
          headerShown: false,
          tabBarIcon: ({  color, size }) => {
       

            // Retorna o ícone correspondente
            return <MaterialIcons name={'add'} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato', // Cor ao ser selecionado
          tabBarInactiveTintColor: 'gray', // Cor padrão
        }}
         />
        <Tab.Screen
         name="Minhas Metas" 
         component={MyMetas}
         options={{
            headerShown: false,
            tabBarIcon: ({  color, size }) => {
       

                // Retorna o ícone correspondente
                return <MaterialIcons name={'checklist'} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato', // Cor ao ser selecionado
              tabBarInactiveTintColor: 'gray', // Cor padrão
            
          }}
         />
        
      </Tab.Navigator>



   
  );
}

const Routes = () => {
    return(
      
       
      
      
      
        <Stack.Navigator>

            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false
              }}
            />
      
      
      
      
            <Stack.Screen
              name="NewMetas"
              component={HomeStack}
              options={{
                  headerShown: false
              }}
            />
  
  
            <Stack.Screen
              name="MyMetas"
              component={MyMetas}
              options={{
                  headerShown: false
              }}
            />

            </Stack.Navigator>
      
    
      )
    }

export {Routes};