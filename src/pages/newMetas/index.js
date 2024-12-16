import React from "react";
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity,TextInput} from "react-native";


const NewMetas = () => {
    return (
        <View style={styles.container}>
       <ImageBackground style={styles.img}
       source={require('../../images/meta.png')}>
        </ImageBackground>
        <TextInput style={styles.inputMeta}
        placeholder="qual a sua meta?"/>
            
        
        <TouchableOpacity style={styles.btn} onPress={() => {alert('meta adicionada!')}}>
            <Text style={styles.btnText}>ADICIONAR</Text>
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
        
    },
    inputMeta:{
        backgroundColor: '#FFF',
        borderRadius: 20,
        width: '80%'
    }
  });
  

  export {NewMetas}

