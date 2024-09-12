import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';  // Gradient effect

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login!</Text>
            <Text style={styles.welcomeText}>Welcome back! please enter your phone number to get started.</Text>

            {/* Phone Number Input */}
            <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                keyboardType="phone-pad"
                placeholderTextColor="#aaa"
            />

            {/* Log In Button */}
            <TouchableOpacity onPress={() => { /* Handle login */ }}>
                <LinearGradient
                    colors={['#56ab2f', '#a8e063']}  // Gradient colors
                    style={styles.loginButton}
                >
                    <Text style={styles.loginButtonText}>Log In</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink}>Register.</Text></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',  // Light background
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#004d40',  // Dark green title color
        fontFamily: 'sans-serif-condensed',  // Custom font for a modern look
        letterSpacing: 2,  // Add spacing between letters for a stylish look
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 3,
    },
    welcomeText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#6B6B6B',  // Light grey for a welcoming tone
        marginBottom: 40,
        paddingHorizontal: 20,
        lineHeight: 26,  // More space between lines for readability
        fontStyle: 'italic',  // Italic style for the welcome message
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 20,
        marginBottom: 30,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        elevation: 3,  // Android shadow
    },
    loginButton: {
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        elevation: 3,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,  // Spacing for the button text
    },
    registerText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#6B6B6B',
        marginTop: 20,
    },
    registerLink: {
        color: '#b05348',
        fontWeight: 'bold',
    },
});

export default Login;
