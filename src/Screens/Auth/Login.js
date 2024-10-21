import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { base_url } from '../../../App';

const { width } = Dimensions.get('window');

const image1 = require('../../assets/Image/slideImg1.jpeg');
const image2 = require('../../assets/Image/slideImg2.jpeg');
const image3 = require('../../assets/Image/slideImg4.jpeg');

const Login = (props) => {

    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const isActive = isFocused || phoneNumber !== '';

    // Images for the carousel
    const images = [image1, image2, image3];

    const templeLogin = async () => {
        setIsLoading(true);
        try {
            const phoneRegex = /^[6-9]\d{9}$/;
            if (phoneNumber === "" || !phoneRegex.test(phoneNumber)) {
                setErrorMessage('Please enter a valid phone number.');
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 5000);
                setIsLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append('phone', phoneNumber);

            const response = await fetch(base_url + '/api/send-otp', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                console.log('OTP sent successfully', data);
                let phone_orderId = {
                    phone: phoneNumber,
                    order_id: data.order_id
                }
                navigation.navigate('OtpVerify', phone_orderId);
            } else {
                // Handle error response
                setErrorMessage(data.message || 'Failed to send OTP. Please try again.');
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 5000);
            }
        } catch (error) {
            setErrorMessage('Failed to send OTP. Please try again.');
            setShowError(true);
            console.log("Error", error);
            setTimeout(() => {
                setShowError(false);
            }, 5000);
        } finally {
            setIsLoading(false);
        }
    }

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

            <Text style={styles.title}>Login!</Text>

            {/* Phone Number Input */}
            <Text style={[styles.label, isActive && styles.focusedLabel]}>Enter your phone number</Text>
            <View style={styles.inputContainer}>
                <View style={[styles.countryCode, isActive && styles.focuseCountryCode]}>
                    <Text style={{ color: '#000' }}>+91</Text>
                </View>
                <TextInput
                    style={[styles.input, isActive && styles.focusedInput, showError && { marginBottom: 5 }]}
                    value={phoneNumber}
                    maxLength={10}
                    onChangeText={(text) => setPhoneNumber(text)}
                    keyboardType="phone-pad"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </View>
            {/* Error Message */}
            {showError && <Text style={styles.errorText}>{errorMessage}</Text>}

            {/* Log In Button */}
            {isLoading ? (
                <ActivityIndicator size="large" color="#c80100" />
            ) : (
                <TouchableOpacity onPress={templeLogin}>
                    <LinearGradient
                        colors={['#c9170a', '#f0837f']}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginButtonText}>Log In</Text>
                    </LinearGradient>
                </TouchableOpacity>
            )}

            {/* Register Link */}
            <View>
                <Text style={styles.registerText}>
                    Don't have an account? <Text style={styles.registerLink} onPress={() => props.navigation.navigate('Register')}>Register.</Text>
                </Text>
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
    inputContainer: {
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    countryCode: {
        backgroundColor: '#dbdbd9',
        width: '15%',
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5.7,
        borderBottomWidth: 0.7,
        borderBlockColor: '#757473',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    focuseCountryCode: {
        height: 45,
        marginTop: 5,
        borderBottomWidth: 2,
        borderBlockColor: '#56ab2f',
    },
    input: {
        width: '85%',
        alignSelf: 'center',
        height: 40,
        borderBottomWidth: 0.7,
        borderBottomColor: '#757473',
        marginBottom: 50,
        color: '#000',
        paddingLeft: 10
    },
    focusedInput: {
        height: 50,
        borderBottomColor: '#56ab2f',
        borderBottomWidth: 2,
    },
    loginButton: {
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
    loginButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    registerText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#6B6B6B',
        marginTop: 15,
    },
    registerLink: {
        color: '#b05348',
        fontWeight: 'bold',
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
        marginBottom: 30
    },
});

export default Login;
