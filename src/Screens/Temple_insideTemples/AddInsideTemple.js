import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';
import { base_url } from '../../../App';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const AddInsideTemple = (props) => {

    const navigation = useNavigation();
    const [temple_name, setTemple_name] = useState('');
    const [temple_about, setTemple_about] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    const [temple_photoSource, setTemple_photoSource] = useState(null);
    const [temple_photo, setTemple_photo] = useState('Select Image');
    // Handle document upload using react-native-image-picker
    const selectTrustImage = async () => {
        // var access_token = await AsyncStorage.getItem('storeAccesstoken');
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = response.assets[0]
                setTemple_photoSource(source);
                setTemple_photo(response.assets[0].fileName);
                // console.log("selected image-=-=", response.assets[0])
            }
        });
    };

    const submitInsideTemple = async () => {
        if (!temple_photoSource.uri || !temple_name || !temple_about) {
            Toast.show('Please fill all the fields', Toast.LONG);
            return;
        }

        const formData = new FormData();
        formData.append('inside_temple_name', temple_name);
        formData.append('inside_temple_about', temple_about);
        formData.append('inside_temple_image', {
            uri: temple_photoSource.uri,
            type: temple_photoSource.type,
            name: temple_photoSource.fileName
        });

        try {
            const response = await axios.post(`${base_url}/api/add-inside-temple`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer 4|Zbbp4OHk9kdowMDwzTw4L7vcm8JUXQP3g7Hq2VI2360b0f76'
                }
            });
            if (response.status === 200) {
                Toast.show('Inside Temple added successfully', Toast.LONG);
                navigation.goBack();
            } else {
                Toast.show('Failed to add inside temple', Toast.LONG);
            }
        } catch (error) {
            Toast.show('Failed to add inside temple', Toast.LONG);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Add Inside Temples</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.topBanner}>
                    <Image
                        style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, }}
                        source={{ uri: 'https://images.fineartamerica.com/images/artworkimages/medium/3/jagannath-temple-in-puri-heritage.jpg' }}
                    />
                </View>

                <View style={styles.cardBox}>
                    {/* Temple Name Input */}
                    <Text style={[styles.label, (isFocused === 'temple_name' || temple_name !== '') && styles.focusedLabel, { marginTop: 18 }]}>Inside Temple Name</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'temple_name' || temple_name !== '') && styles.focusedInput]}
                        value={temple_name}
                        onChangeText={(text) => setTemple_name(text)}
                        onFocus={() => setIsFocused('temple_name')}
                        onBlur={() => setIsFocused(null)}
                    />

                    {/* Upload Banner Photo */}
                    <Text style={[styles.label, (temple_photo !== 'Select Image') && styles.focusedLabel]}>Upload Inside Temple Image</Text>
                    <TouchableOpacity style={[styles.filePicker, { marginTop: 10 }]} onPress={selectTrustImage}>
                        <TextInput
                            style={styles.filePickerText}
                            editable={false}
                            placeholder={temple_photo}
                            placeholderTextColor={'#000'}
                        />
                        <View style={styles.chooseBtn}>
                            <Text style={styles.chooseBtnText}>Choose File</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Temple About Input */}
                    <Text style={[styles.label, (isFocused === 'temple_about' || temple_about !== '') && styles.focusedLabel, { marginTop: 18 }]}>Temple About</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'temple_about' || temple_about !== '') && styles.focusedInput]}
                        value={temple_about}
                        onChangeText={(text) => setTemple_about(text)}
                        onFocus={() => setIsFocused('temple_about')}
                        onBlur={() => setIsFocused(null)}
                    />
                </View>

                {/* Submit Button */}
                <TouchableOpacity onPress={submitInsideTemple}>
                    <LinearGradient
                        colors={['#c9170a', '#f0837f']}
                        style={styles.submitButton}
                    >
                        <Text style={styles.submitText}>Submit</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default AddInsideTemple

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginVertical: 10,
        borderRadius: 10
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
    dropdown: {
        borderWidth: 0,
        borderBottomWidth: 0.7,
        borderColor: '#757473',
        paddingHorizontal: 0,
        marginBottom: 30,
    },
    dropdownContainer: {
        borderWidth: 0.7,
        borderColor: '#757473',
        paddingHorizontal: 0,
        width: '102.5%',
        alignSelf: 'center'
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
    filePicker: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
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
})