import React from "react";
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity } from "react-native";

const Home = () => {
    return (
        <View style={styles.container}>
       <ImageBackground style={styles.img}
       source={require('../../images/action.png')}>
        </ImageBackground>
        <TouchableOpacity style={styles.btn}>
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
        width: '400',
        height: '500',
        marginTop:60,
        marginBottom: 20
    },
    btn: {
        marginTop:50,
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


  