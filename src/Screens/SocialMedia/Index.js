import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import DrawerModal from '../../Component/DrawerModal';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import { base_url } from '../../../App';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const Index = (props) => {

    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => { setModalVisible(true) };
    const closeModal = () => { setModalVisible(false) };

    const [utubeURL, setUtubeURL] = useState('');
    const [instaURL, setInstaURL] = useState('');
    const [facebookURL, setFacebookURL] = useState('');
    const [twitterURL, setTwitterURL] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    const showErrorToast = (message) => {
        Toast.show(message, Toast.LONG);
    };

    const handleSubmit = async () => {
        const data = {
            temple_yt_url: utubeURL,
            temple_ig_url: instaURL,
            temple_fb_url: facebookURL,
            temple_x_url: twitterURL,
        };

        try {
            const response = await axios.post(`${base_url}/api/social-media/update`, data, {
                headers: {
                    Authorization: `Bearer 1|gOOSULybwMTV74JdEHRbPz7aShtfHMDO6EBU9CBn`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // console.log('Data posted successfully:', response.data);
                showErrorToast('Data posted successfully');
            } else {
                // console.error('Error posting data: Unexpected response status', response.status);
                showErrorToast('Error posting data: Unexpected response status', response.status);
            }
        } catch (error) {
            // console.error('Error posting data:', error);
            showErrorToast('Error posting data:', error);
        }
    };

    useEffect(() => {
        const fetchSocialMediaLinks = async () => {
            try {
                const response = await axios.get(`${base_url}/api/social-media`, {
                    headers: {
                        Authorization: `Bearer 1|gOOSULybwMTV74JdEHRbPz7aShtfHMDO6EBU9CBn`
                    }
                });
                // console.log("object", response.data.data);
                // return;
                if (response.status === 200) {
                    setUtubeURL(response.data.data.temple_yt_url);
                    setInstaURL(response.data.data.temple_ig_url);
                    setFacebookURL(response.data.data.temple_fb_url);
                    setTwitterURL(response.data.data.temple_x_url);
                } else {
                    console.error('Error fetching social media links: Unexpected response status', response.status);
                }
            } catch (error) {
                console.error('Error fetching social media links:', error);
            }
        };

        fetchSocialMediaLinks();
    }, []);

    return (
        <View style={styles.container}>
            <DrawerModal visible={isModalVisible} navigation={navigation} onClose={closeModal} />
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Social Media</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={openModal} style={{ marginLeft: 8 }}>
                        <Octicons name="three-bars" color={'#000'} size={28} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.topBanner}>
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }} source={{ uri: 'https://images.fineartamerica.com/images/artworkimages/medium/3/jagannath-temple-in-puri-heritage.jpg' }} />
                </View>
                <View style={{ width: '100%', alignSelf: 'center', flex: 1, marginTop: 10 }}>
                    <View style={styles.cardBox}>
                        <Text style={styles.subHeaderText}>Social Media</Text>
                        <Text style={[styles.label, (isFocused === 'utubeURL' || utubeURL !== '') && styles.focusedLabel]}>Youtube URL</Text>
                        <TextInput
                            style={[styles.input, (isFocused === 'utubeURL' || utubeURL !== '') && styles.focusedInput]}
                            value={utubeURL}
                            onChangeText={(text) => setUtubeURL(text)}
                            onFocus={() => setIsFocused('utubeURL')}
                            onBlur={() => setIsFocused(null)}
                        />

                        <Text style={[styles.label, (isFocused === 'instaURL' || instaURL !== '') && styles.focusedLabel]}>Instagram URL</Text>
                        <TextInput
                            style={[styles.input, (isFocused === 'instaURL' || instaURL !== '') && styles.focusedInput]}
                            value={instaURL}
                            onChangeText={(text) => setInstaURL(text)}
                            onFocus={() => setIsFocused('instaURL')}
                            onBlur={() => setIsFocused(null)}
                        />

                        <Text style={[styles.label, (isFocused === 'facebookURL' || facebookURL !== '') && styles.focusedLabel]}>Facebook URL</Text>
                        <TextInput
                            style={[styles.input, (isFocused === 'facebookURL' || facebookURL !== '') && styles.focusedInput]}
                            value={facebookURL}
                            onChangeText={(text) => setFacebookURL(text)}
                            onFocus={() => setIsFocused('facebookURL')}
                            onBlur={() => setIsFocused(null)}
                        />

                        <Text style={[styles.label, (isFocused === 'twitterURL' || twitterURL !== '') && styles.focusedLabel]}>Twitter URL</Text>
                        <TextInput
                            style={[styles.input, (isFocused === 'twitterURL' || twitterURL !== '') && styles.focusedInput]}
                            value={twitterURL}
                            onChangeText={(text) => setTwitterURL(text)}
                            onFocus={() => setIsFocused('twitterURL')}
                            onBlur={() => setIsFocused(null)}
                        />
                    </View>
                </View>
                {/* Submit Button */}
                <TouchableOpacity onPress={handleSubmit}>
                    <LinearGradient colors={['#c9170a', '#f0837f']} style={styles.submitButton}>
                        <Text style={styles.submitText}>Submit</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 20,
        backgroundColor: '#f4f4f4',
    },
    topBanner: {
        width: '93%',
        alignSelf: 'center',
        height: 150,
        backgroundColor: 'red',
        borderRadius: 10,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    headerPart: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: 13,
        paddingLeft: 5,
        paddingRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 13,
        elevation: 5,
    },
    headerText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 3,
        // marginLeft: 5,
    },
    subHeaderText: {
        fontSize: 18,
        marginVertical: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    cardBox: {
        width: '93%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 10,
        borderRadius: 10
    },
    filePicker: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    filePickerText: {
        width: '70%',
        height: 45,
        lineHeight: 45,
        color: '#000',
    },
    chooseBtn: {
        backgroundColor: '#bbb',
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    chooseBtnText: {
        color: '#fff',
        fontWeight: '500',
    },
    imagePreviewContainer: {
        flexDirection: 'row',
        // flexWrap: 'wrap',
        justifyContent: 'center',
    },
    imageWrapper: {
        position: 'relative',
        margin: 5,
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    removeIcon: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 2,
    },
    videoPreviewContainer: {
        flexDirection: 'row',
        // flexWrap: 'wrap',
        justifyContent: 'center',
    },
    videoWrapper: {
        position: 'relative',
        margin: 5,
        alignItems: 'center',
    },
    videoPreview: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    playPauseBtn: {
        position: 'absolute',
        top: '40%',
        left: '45%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 5,
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
    submitButton: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        elevation: 3,
        marginVertical: 10,
    },
    submitText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,  // Spacing for the button text
    },
});
