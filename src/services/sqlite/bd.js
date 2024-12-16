import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Criação ou abertura do banco de dados
    const openDatabase = async () => {
      const db = await SQLite.openDatabase(
        { name: 'test.db', location: 'default' },
        () => console.log('Banco de dados aberto com sucesso'),
        error => console.log('Erro ao abrir banco de dados', error)
      );

      // Criando uma tabela se ela não existir
      await db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);',
          [],
          () => console.log('Tabela criada ou já existente'),
          error => console.log('Erro ao criar tabela', error)
        );
      });

      // Inserir dados
      await db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO users (name, age) VALUES (?, ?);',
          ['João', 30],
          () => console.log('Dados inseridos'),
          error => console.log('Erro ao inserir dados', error)
        );
      });

      // Consultar dados
      await db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users;',
          [],
          (tx, results) => {
            const rows = results.rows.raw(); // Transformando em array de objetos
            setData(rows);
            console.log('Resultados da consulta', rows);
          },
          error => console.log('Erro ao consultar dados', error)
        );
      });
    };

    openDatabase();

    // Fechar o banco de dados (importante liberar o recurso)
    return () => {
      SQLite.close();
    };
  }, []);};