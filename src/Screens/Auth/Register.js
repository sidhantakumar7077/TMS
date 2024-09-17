import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';  // Gradient effect

const Register = (props) => {
  const [templeName, setTempleName] = useState('');
  const [address, setAddress] = useState('');
  const [trustContact, setTrustContact] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [creatorContact, setCreatorContact] = useState('');
  const [isFocused, setIsFocused] = useState(null); // Track which input is focused

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {/* Temple Name Input */}
      <Text style={[styles.label, (isFocused === 'templeName' || templeName !== '') && styles.focusedLabel]}>Name of Temple</Text>
      <TextInput
        style={[styles.input, (isFocused === 'templeName' || templeName !== '') && styles.focusedInput]}
        value={templeName}
        onChangeText={(text) => setTempleName(text)}
        onFocus={() => setIsFocused('templeName')}
        onBlur={() => setIsFocused(null)}
      />

      {/* Address Input */}
      <Text style={[styles.label, (isFocused === 'address' || address !== '') && styles.focusedLabel]}>Address</Text>
      <TextInput
        style={[styles.input, (isFocused === 'address' || address !== '') && styles.focusedInput]}
        value={address}
        onChangeText={(text) => setAddress(text)}
        onFocus={() => setIsFocused('address')}
        onBlur={() => setIsFocused(null)}
      />

      {/* Trust Contact Number Input */}
      <Text style={[styles.label, (isFocused === 'trustContact' || trustContact !== '') && styles.focusedLabel]}>Trust Contact Number</Text>
      <TextInput
        style={[styles.input, (isFocused === 'trustContact' || trustContact !== '') && styles.focusedInput]}
        value={trustContact}
        maxLength={10}
        onChangeText={(text) => setTrustContact(text)}
        keyboardType="phone-pad"
        onFocus={() => setIsFocused('trustContact')}
        onBlur={() => setIsFocused(null)}
      />

      {/* Creator Name Input */}
      <Text style={[styles.label, (isFocused === 'creatorName' || creatorName !== '') && styles.focusedLabel]}>Creator Name</Text>
      <TextInput
        style={[styles.input, (isFocused === 'creatorName' || creatorName !== '') && styles.focusedInput]}
        value={creatorName}
        onChangeText={(text) => setCreatorName(text)}
        onFocus={() => setIsFocused('creatorName')}
        onBlur={() => setIsFocused(null)}
      />

      {/* Creator Contact Number Input */}
      <Text style={[styles.label, (isFocused === 'creatorContact' || creatorContact !== '') && styles.focusedLabel]}>Contact Number of Creator</Text>
      <TextInput
        style={[styles.input, (isFocused === 'creatorContact' || creatorContact !== '') && styles.focusedInput]}
        value={creatorContact}
        maxLength={10}
        onChangeText={(text) => setCreatorContact(text)}
        keyboardType="phone-pad"
        onFocus={() => setIsFocused('creatorContact')}
        onBlur={() => setIsFocused(null)}
      />

      {/* Register Button */}
      <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')}>
        <LinearGradient
          colors={['#c9170a', '#f0837f']}
          style={styles.registerButton}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Login Link */}
      <View>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink} onPress={() => props.navigation.navigate('Login')}>Log In.</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',  // Light background
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#004d40',
    fontFamily: 'sans-serif-condensed',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  label: {
    color: '#757473',
    fontSize: 16,
  },
  focusedLabel: {
    color: '#56ab2f',
    fontSize: 16,
    fontWeight: '500'
  },
  input: {
    height: 25,
    borderBottomWidth: 0.7,
    borderBottomColor: '#757473',
    marginBottom: 30,
    color: '#000',
  },
  focusedInput: {
    height: 50,
    borderBottomColor: '#56ab2f',
    borderBottomWidth: 2
  },
  registerButton: {
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 3,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loginText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B6B6B',
    marginTop: 20,
  },
  loginLink: {
    color: '#b05348',
    fontWeight: 'bold',
  },
});

export default Register;
