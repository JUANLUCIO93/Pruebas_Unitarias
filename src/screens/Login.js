import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { loginUser } from '../services/authService';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    try {
      const result = await loginUser(email, password);
      
      // LOG para que veas en la terminal qué llega exactamente
      console.log("Respuesta del servidor:", result);

      // CORRECCIÓN: Si el mensaje contiene "Bienvenido", es un éxito total
      if (result && (result.success === true || result.message.includes("Bienvenido"))) {
        Alert.alert("Éxito", "¡Bienvenido al Hotel Real Andino!");
        
        // Aquí puedes navegar a la siguiente pantalla
        // navigation.navigate('Home');
      } else {
        // Solo entra aquí si realmente no se encontró al usuario
        Alert.alert("Error", result ? result.message : "Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Problema de conexión con el servidor");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotel Real Andino</Text>
      <Text style={styles.subtitle}>Gestión de Reservas</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#2c3e50' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30, color: '#7f8c8d' },
  input: { height: 50, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: '#ee0e0e' },
  button: { height: 50, backgroundColor: '#2980b9', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});