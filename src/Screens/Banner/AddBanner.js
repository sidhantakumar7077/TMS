import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';
import { base_url } from '../../../App';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const AddBanner = (props) => {

    const navigation = useNavigation();
    const [desc, setDesc] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    const [bannerType, setBannerType] = useState(null);
    const [bannerTypeOpen, setBannerTypeOpen] = useState(false);
    const [bannerTypeList, setBannerTypeList] = useState([
        { label: 'Web', value: 'web' },
        { label: 'Mobile App', value: 'mobile_app' },
    ]);

    const [banner_photoSource, setBanner_photoSource] = useState(null);
    const [banner_photo, setBanner_photo] = useState('Select Image');
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
                setBanner_photoSource(source);
                setBanner_photo(response.assets[0].fileName);
                // console.log("selected image-=-=", response.assets[0])
            }
        });
    };

    const submitBanner = async () => {
        var access_token = await AsyncStorage.getItem('storeAccesstoken');
        if (!banner_photoSource.uri || !desc || !bannerType) {
            Toast.show('Please fill all the fields', Toast.LONG);
            return;
        }

        const formData = new FormData();
        formData.append('banner_descp', desc);
        formData.append('banner_type', bannerType);
        formData.append('banner_image', {
            uri: banner_photoSource.uri,
            type: banner_photoSource.type,
            name: banner_photoSource.fileName
        });

        try {
            const response = await axios.post(`${base_url}/api/add-banner`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${access_token}`,
                }
            });
            if (response.status === 200) {
                Toast.show("Banner added successfully", Toast.LONG);
                navigation.goBack();
            } else {
                Toast.show('Failed to add banner', Toast.LONG);
            }
        } catch (error) {
            Toast.show('Failed to add banner', Toast.LONG);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Add Banner</Text>
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
                    {/* Upload Banner Photo */}
                    <Text style={[styles.label, (banner_photo !== 'Select Image') && styles.focusedLabel]}>Upload Banner Image</Text>
                    <TouchableOpacity style={[styles.filePicker, { marginTop: 10 }]} onPress={selectTrustImage}>
                        <TextInput
                            style={styles.filePickerText}
                            editable={false}
                            placeholder={banner_photo}
                            placeholderTextColor={'#000'}
                        />
                        <View style={styles.chooseBtn}>
                            <Text style={styles.chooseBtnText}>Choose File</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Banner Type Dropdown */}
                    <Text style={[styles.label, bannerType && styles.focusedLabel]}>Banner Type</Text>
                    <DropDownPicker
                        open={bannerTypeOpen}
                        value={bannerType}
                        items={bannerTypeList}
                        setOpen={setBannerTypeOpen}
                        setValue={setBannerType}
                        setItems={setBannerTypeList}
                        placeholder="Select Banner Type"
                        style={[
                            styles.input,
                            styles.dropdown,
                            {
                                borderBottomColor: bannerTypeOpen ? '#56ab2f' : '#757473',
                                height: bannerTypeOpen ? 50 : 25,
                                backgroundColor: '#f4f4f4',
                                paddingHorizontal: 10,
                                width: '103%',
                                alignSelf: 'center'
                            }
                        ]}
                        textStyle={{
                            color: bannerType ? '#000' : '#757473',
                            fontSize: 16,
                        }}
                        dropDownContainerStyle={[styles.dropdownContainer, {
                            borderBottomColor: '#56ab2f',
                        }]}
                        placeholderStyle={{ color: '#757473', fontSize: 13 }}
                        zIndex={3000}
                        zIndexInverse={1000}
                    />

                    {/* Description Input */}
                    <Text style={[styles.label, (isFocused === 'desc' || desc !== '') && styles.focusedLabel, { marginTop: 18 }]}>Description</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'desc' || desc !== '') && styles.focusedInput]}
                        value={desc}
                        onChangeText={(text) => setDesc(text)}
                        onFocus={() => setIsFocused('desc')}
                        onBlur={() => setIsFocused(null)}
                    />
                </View>

                {/* Submit Button */}
                <TouchableOpacity onPress={submitBanner}>
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

export default AddBanner

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