import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { base_url } from '../../../App';

const { width } = Dimensions.get('window');

// Import local images for the slider
const image1 = require('../../assets/Image/slideImg1.jpeg');
const image2 = require('../../assets/Image/slideImg2.jpeg');
const image3 = require('../../assets/Image/slideImg4.jpeg');

const OtpVerify = (props) => {

    const navigation = useNavigation();
    const [otp, setOtp] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [showResendButton, setShowResendButton] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [showCountSpinner, setShowCountSpinner] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Images for the carousel
    const images = [image1, image2, image3];

    // Start countdown for resend OTP
    const startCountdown = () => {
        setCountdown(30);
        setShowCountSpinner(true);
        setShowResendButton(false);

        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 0) {
                    setShowResendButton(true);
                    clearInterval(timer);
                }
                return prevCountdown - 1;
            });
        }, 1000);
    };

    const verifyOTP = async () => {
        setIsLoading(true);
        try {
            const otpRegex = /^\d{6}$/;
            if (otp === "" || !otpRegex.test(otp)) {
                setErrorMessage('Please enter a valid OTP.');
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 5000);
                setIsLoading(false);
                return;
            }
            const bodyData = JSON.stringify({
                orderId: props.route.params.order_id,
                otp: otp,
                phoneNumber: '+91' + props.route.params.phone,
            });
            const response = await fetch(base_url + '/api/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: bodyData,
            });

            const data = await response.json();
            if (response.ok) {
                // console.log('OTP verified successfully', data);
                await AsyncStorage.setItem('storeAccesstoken', data.token);
                navigation.replace('Dashboard');
            } else {
                // Handle error response
                setErrorMessage(data.message || 'Failed to verify OTP. Please try again.');
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Failed to verify OTP', error);
            setErrorMessage('Failed to verify OTP. Please try again.');
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 5000);
        } finally {
            setIsLoading(false);
        }
    };

    const resendOTP = async () => {
        startCountdown();
        setOtp('');
    };

    useEffect(() => {
        startCountdown();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* Swiper Image Carousel */}
            <View style={styles.imageContainer}>
                <Swiper
                    style={styles.wrapper}
                    showsButtons={false}
                    autoplay={false}
                    autoplayTimeout={3}
                    dotStyle={styles.dot}
                    activeDotStyle={styles.activeDot}
                >
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            source={image}  // Use local image source
                            style={styles.image}
                            resizeMode="cover"
                        />
                    ))}
                </Swiper>
            </View>

            <Text style={styles.title}>Verify OTP</Text>

            {/* OTP Input */}
            <Text style={[styles.label, (isFocused || otp) && styles.focusedLabel]}>Enter OTP</Text>
            <View style={{ marginBottom: 45 }}>
                <TextInput
                    style={[styles.input, (isFocused || otp) && styles.focusedInput]}
                    value={otp}
                    maxLength={6}
                    onChangeText={(text) => setOtp(text)}
                    keyboardType="number-pad"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {showError && <Text style={styles.errorText}>{errorMessage}</Text>}
            </View>

            {/* Verify Button */}
            {isLoading ? (
                <ActivityIndicator size="large" color="#c80100" />
            ) : (
                <TouchableOpacity onPress={verifyOTP}>
                    <LinearGradient
                        colors={['#c9170a', '#f0837f']}
                        style={styles.verifyButton}
                    >
                        <Text style={styles.verifyButtonText}>Verify</Text>
                    </LinearGradient>
                </TouchableOpacity>
            )}

            {/* Resend OTP */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                <Text style={{ fontSize: 16, fontWeight: '500', color: '#000', marginRight: 7 }}>Didn't get OTP?</Text>
                {showResendButton ? (
                    <TouchableOpacity onPress={resendOTP}>
                        <Text style={{ color: '#eb344c', fontSize: 16, fontWeight: '600' }}>Resend OTP</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#eb344c', fontSize: 16, fontWeight: '600' }}>
                            {countdown !== 0 && `${countdown}s`}
                        </Text>
                        {showCountSpinner && (
                            <ActivityIndicator
                                style={{ marginLeft: 4 }}
                                size={12}
                                width={4}
                                color="#eb344c"
                            />
                        )}
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        paddingVertical: 30,
    },
    imageContainer: {
        width: '85%',
        height: 400,
        alignSelf: 'center',
        marginBottom: 20,
        overflow: 'hidden',
        borderRadius: 15,
    },
    image: {
        width: '100%',
        height: '100%',
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
        width: '80%',
        alignSelf: 'center',
    },
    focusedLabel: {
        color: '#56ab2f',
        fontSize: 16,
        fontWeight: '500',
    },
    input: {
        width: '80%',
        alignSelf: 'center',
        height: 40,
        borderBottomWidth: 0.7,
        borderBottomColor: '#757473',
        // marginBottom: 50,
        color: '#000',
    },
    focusedInput: {
        height: 50,
        borderBottomColor: '#56ab2f',
        borderBottomWidth: 2,
    },
    verifyButton: {
        width: '85%',
        alignSelf: 'center',
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
        letterSpacing: 1,
    },
    dot: {
        backgroundColor: 'rgba(255,255,255,.3)',
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 3,
    },
    activeDot: {
        backgroundColor: '#fff',
        width: 20,
        height: 10,
        borderRadius: 5,
        margin: 3,
    },
    errorText: {
        color: 'red',
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.5,
        marginLeft: 40,
        marginTop: 8
    },
});

export default OtpVerify;
