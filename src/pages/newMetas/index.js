import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewMetas = ({ navigation }) => {
  const [meta, setMeta] = useState(""); // Estado para capturar a meta do usuário

  const saveMeta = async () => {
    if (!meta.trim()) {
      Alert.alert("Erro", "Por favor, digite uma meta válida!");
      return;
    }

    try {
      // Recupera as metas existentes
      const existingMetas = await AsyncStorage.getItem("metas");
      const metasArray = existingMetas ? JSON.parse(existingMetas) : [];

      // Adiciona a nova meta ao array
      metasArray.push({ id: Date.now(), descricao: meta });

      // Salva o array atualizado no AsyncStorage
      await AsyncStorage.setItem("metas", JSON.stringify(metasArray));

      Alert.alert("Sucesso", "Meta adicionada com sucesso!");
      setMeta(""); // Limpar o input
      
    } catch (error) {
      console.error("Erro ao salvar a meta:", error);
      Alert.alert("Erro", "Não foi possível salvar sua meta.");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.img}
        source={require("../../images/meta.png")}
      />
      <TextInput
        style={styles.inputMeta}
        placeholder="Qual a sua meta?"
        value={meta}
        onChangeText={(text) => setMeta(text)}
      />
      <TouchableOpacity style={styles.btn} onPress={saveMeta}>
        <Text style={styles.btnText}>ADICIONAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 380,
    height: 400,
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    backgroundColor: "#1C1C1C",
    padding: 15,
    borderRadius: 20,
  },
  btnText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  inputMeta: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    width: "80%",
    padding: 10,
  },
});

export { NewMetas };
