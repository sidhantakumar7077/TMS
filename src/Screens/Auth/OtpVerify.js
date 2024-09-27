import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';  // Gradient effect

const OtpVerify = (props) => {
    const [otp, setOtp] = useState('');
    const [isFocused, setIsFocused] = useState(false); // Track input focus state
    const [showResendButton, setShowResendButton] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [showCountSpinner, setShowCountSpinner] = useState(false);

    // Function to handle the countdown
    const startCountdown = () => {
        setCountdown(30); // Reset countdown to 30 seconds
        setShowCountSpinner(true); // Show spinner when countdown starts
        setShowResendButton(false); // Hide Resend OTP button when countdown starts

        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 0) {
                    setShowResendButton(true); // Show Resend OTP button when countdown ends
                    clearInterval(timer); // Clear the timer when countdown reaches 0
                }
                return prevCountdown - 1;
            });
        }, 1000); // Update countdown every second
    };

    const resendOTP = async () => {
        startCountdown(); // Start the countdown
        setOtp('');
    }

    useEffect(() => {
        console.log("Phone get by props", props.route.params)

        // Show Resend OTP button after 30 seconds
        const timer = setTimeout(() => {
            setShowResendButton(true);
        }, 30000); // 30 seconds

        // Clear the timer when the component unmounts or when the dependency changes
        return () => clearTimeout(timer);
    }, [otp])

    useEffect(() => {
        startCountdown();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify OTP</Text>

            {/* OTP Input */}
            <Text style={[styles.label, (isFocused || otp) && styles.focusedLabel]}>Enter OTP</Text>
            <TextInput
                style={[styles.input, (isFocused || otp) && styles.focusedInput]}
                value={otp}
                maxLength={6}
                onChangeText={(text) => setOtp(text)}
                keyboardType="number-pad"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />

            {/* Verify Button */}
            <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')}>
                <LinearGradient
                    colors={['#c9170a', '#f0837f']}
                    style={styles.verifyButton}
                >
                    <Text style={styles.verifyButtonText}>Verify</Text>
                </LinearGradient>
            </TouchableOpacity>

            {/* Resend OTP */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                <Text style={{ fontSize: 16, fontWeight: '500', color: '#000', marginRight: 7 }}>Didn't get OTP?</Text>
                {showResendButton ?
                    <TouchableOpacity onPress={resendOTP}>
                        <Text style={{ color: '#eb344c', fontSize: 16, fontWeight: '600' }}>Resend OTP</Text>
                    </TouchableOpacity>
                    :
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#eb344c', fontSize: 16, fontWeight: '600' }}>{countdown !== 0 && `${countdown}s`}</Text>
                        {showCountSpinner &&
                            <ActivityIndicator
                                style={{ marginLeft: 4 }}
                                size={12}
                                width={4}
                                color="#eb344c"
                            />
                        }
                    </View>
                }
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
        height: 30,
        borderBottomWidth: 0.7,
        borderBottomColor: '#757473',
        marginBottom: 50,
        color: '#000',
    },
    focusedInput: {
        height: 50,
        borderBottomColor: '#56ab2f',
        borderBottomWidth: 2
    },
    verifyButton: {
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        elevation: 3,
    },
    verifyButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,  // Spacing for the button text
    },
    resendText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#6B6B6B',
        marginTop: 20,
    },
    resendLink: {
        color: '#b05348',
        fontWeight: 'bold',
    },
});

export default OtpVerify;
