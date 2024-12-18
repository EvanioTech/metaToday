import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const MyMetas = () => {
  const [metas, setMetas] = useState([]);
  const [metasConcluidas, setMetasConcluidas] = useState([]);

  // Função para buscar as metas no AsyncStorage
  const fetchMetas = async () => {
    try {
      const savedMetas = await AsyncStorage.getItem("metas");
      const metasArray = savedMetas ? JSON.parse(savedMetas) : [];
      setMetas(metasArray);
      setMetasConcluidas(metasArray.filter((meta) => meta.concluida).map((meta) => meta.id));
    } catch (error) {
      console.error("Erro ao buscar metas:", error);
    }
  };

  // Função para deletar uma meta específica
  const deleteMeta = async (id) => {
    Alert.alert(
      "Excluir Meta",
      "Tem certeza que deseja excluir esta meta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              const updatedMetas = metas.filter((meta) => meta.id !== id);
              await AsyncStorage.setItem("metas", JSON.stringify(updatedMetas));
              setMetas(updatedMetas);
              setMetasConcluidas(updatedMetas.filter((meta) => meta.concluida).map((meta) => meta.id));

              Alert.alert("Sucesso", "Meta excluída com sucesso!");
            } catch (error) {
              console.error("Erro ao excluir meta:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Função para marcar ou desmarcar uma meta como concluída
  const markAsFinished = async (id) => {
    const updatedMetas = metas.map((meta) =>
      meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
    );

    try {
      await AsyncStorage.setItem("metas", JSON.stringify(updatedMetas));
      setMetas(updatedMetas);
      setMetasConcluidas(updatedMetas.filter((meta) => meta.concluida).map((meta) => meta.id));
    } catch (error) {
      console.error("Erro ao atualizar meta:", error);
    }
  };

  // Atualizar as metas sempre que a tela ganhar foco
  useFocusEffect(
    React.useCallback(() => {
      fetchMetas();
    }, [])
  );

  // Calcular a porcentagem de metas concluídas
  const totalMetas = metas.length;
  const metasFeitas = metasConcluidas.length;
  const porcentagemFeita = totalMetas > 0 ? (metasFeitas / totalMetas) * 100 : 0;

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.img} source={require("../../images/go.png")} />
      <Text style={styles.title}>Suas Metas:</Text>

      {/* Barra de progresso */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${porcentagemFeita}%` }, // Controlando o preenchimento da barra
          ]}
        />
      </View>
      <Text style={styles.progressText}>{Math.round(porcentagemFeita)}% Concluídas</Text>

      {metas.length > 0 ? (
        <FlatList
          data={metas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.metaItem,
                metasConcluidas.includes(item.id) && styles.metaItemFinished, // Altera a cor se concluída
              ]}
            >
              <Text style={styles.metaText}>{item.descricao}</Text>
              <View style={styles.btnView}>
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => markAsFinished(item.id)}
                >
                  <Text style={styles.buttonText}>
                    {metasConcluidas.includes(item.id) ? "Desfazer" : "Feito"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteMeta(item.id)}
                >
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>Você ainda não tem metas cadastradas.</Text>
      )}
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
    marginTop: 50,
    width: 380,
    height: 400,
    marginBottom: -220,
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    marginBottom: 10,
  },
  progressBarContainer: {
    width: "90%",
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginVertical: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#00FF00",
    borderRadius: 10,
  },
  progressText: {
    color: "#FFF",
    fontSize: 18,
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1C1C1C",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: "98%",
  },
  metaItemFinished: {
    backgroundColor: "green", // Cor de fundo verde para metas concluídas
  },
  metaText: {
    color: "#FFF",
    fontSize: 18,
    flex: 1,
  },
  btnView: {
    flexDirection: "row",
  },
  doneButton: {
    backgroundColor: "blue",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  emptyText: {
    color: "#FFF",
    fontSize: 18,
    fontStyle: "italic",
    marginTop: 20,
  },
});

export { MyMetas };
