import React from "react";
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';






const Home = () => {

    const navigation = useNavigation();


    return (
        <View style={styles.container}>
       <ImageBackground style={styles.img}
       source={require('../../images/action.png')}>
        </ImageBackground>
        <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate("NewMetas")}>
            <Text style={styles.btnText}>Bora Vencer!</Text>
        </TouchableOpacity>
        
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    img: {
        width: '380',
        height: '480',
        marginTop:60,
        marginBottom: 20
    },
    btn: {
        marginTop:50,
        marginBottom:80,
        backgroundColor: '#1C1C1C',
        padding:15,
        borderRadius: 20

    },
    btnText:{
        color: '#FFF',
        fontSize: 30, 
        fontWeight: 'bold'
        
    }
  });
  

  export {Home}


  