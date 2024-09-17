import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';  // Gradient effect

const Login = (props) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isFocused, setIsFocused] = useState(false); // Track input focus state

    // If the phone number is not empty or the input is focused, highlight the input and label
    const isActive = isFocused || phoneNumber !== '';

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login!</Text>

            {/* Phone Number Label */}
            <Text style={[styles.label, isActive && styles.focusedLabel]}>Enter your phone number</Text>

            {/* Phone Number Input */}
            <TextInput
                style={[styles.input, isActive && styles.focusedInput]}
                value={phoneNumber}
                maxLength={10}
                onChangeText={(text) => setPhoneNumber(text)}
                keyboardType="phone-pad"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />

            {/* Log In Button */}
            <TouchableOpacity onPress={() => { props.navigation.navigate('OtpVerify') }}>
                <LinearGradient
                    colors={['#c9170a', '#f0837f']}
                    style={styles.loginButton}
                >
                    <Text style={styles.loginButtonText}>Log In</Text>
                </LinearGradient>
            </TouchableOpacity>

            {/* Register Link */}
            <View>
                <Text style={styles.registerText}>
                    Don't have an account? <Text style={styles.registerLink} onPress={() => props.navigation.navigate('Register')}>Register.</Text>
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
        fontWeight: '500',
    },
    input: {
        height: 30,
        borderBottomWidth: 0.7,
        borderBottomColor: '#757473',
        marginBottom: 50,
        color: '#000',
    },
    focusedInput: {
        height: 50,
        borderBottomColor: '#56ab2f',
        borderBottomWidth: 2,
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
