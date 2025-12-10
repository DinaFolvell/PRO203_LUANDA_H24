import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    console.log('Login attempt with:', { username, password });
  };

  return (
    
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Bapa - ansatt</Text>
        <Text style={styles.subtitle}>Logg in med din bruker-ID</Text>

        <TextInput
          style={styles.input}
          placeholder="Bruker-ID"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}//Vet ikke hvilke funksjoner som trengs her
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword} //Vet ikke hvilke funksjoner som trengs her
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    color: '#f54500',
    marginBottom: 8,
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#f54500',
    fontSize: 16,
    fontWeight: '600',
  },
});