import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';
import { base_url } from '../../../App';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const AddPooja = (props) => {

    const navigation = useNavigation();
    const [pooja_name, setPooja_name] = useState('');
    const [price, setPrice] = useState('');
    const [pooja_desc, setPooja_desc] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    const [poojaImages, setPoojaImages] = useState([]);
    const [poojaImageName, setPoojaImageName] = useState('Select Images');

    // Handle image selection using react-native-image-picker
    const selectTempleImages = async () => {
        const options = {
            title: 'Select Images',
            mediaType: 'photo',
            includeBase64: false,
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
                const selectedImages = response.assets;
                setPoojaImages(selectedImages[0]);
                // console.log("object", selectedImages);
                setPoojaImageName(selectedImages[0].fileName);
            }
        });
    };

    const submitPooja = async () => {
        var access_token = await AsyncStorage.getItem('storeAccesstoken');
        if (!pooja_name || !price) {
            Toast.show('Please fill all the fields', Toast.LONG);
            return;
        }
        const formData = new FormData();
        formData.append('pooja_name', pooja_name);
        formData.append('pooja_price', price);
        formData.append('pooja_descp', pooja_desc);
        formData.append('inside_temple_id', ''); // Ensure this field is not null
        if (poojaImages && poojaImages.uri) {
            formData.append('pooja_image', {
                uri: poojaImages.uri,
                type: poojaImages.type,
                name: poojaImages.fileName,
            });
        }

        try {
            const response = await axios.post(`${base_url}/api/add-pooja`, formData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.status === 200) {
                Toast.show('Pooja added successfully', Toast.LONG);
                navigation.goBack();
            } else {
                Toast.show('Failed to add pooja', Toast.LONG);
            }
        } catch (error) {
            Toast.show('Failed to add pooja', Toast.LONG);
            console.log("Error", error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Add Pooja</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.topBanner}>
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }} source={{ uri: 'https://images.fineartamerica.com/images/artworkimages/medium/3/jagannath-temple-in-puri-heritage.jpg' }} />
                </View>

                <View style={styles.cardBox}>
                    <Text style={[styles.label, (isFocused === 'pooja_name' || pooja_name !== '') && styles.focusedLabel]}>Pooja Name</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'pooja_name' || pooja_name !== '') && styles.focusedInput]}
                        value={pooja_name}
                        onChangeText={(text) => setPooja_name(text)}
                        onFocus={() => setIsFocused('pooja_name')}
                        onBlur={() => setIsFocused(null)}
                    />

                    <Text style={[styles.label, (isFocused === 'pooja_desc' || pooja_desc !== '') && styles.focusedLabel]}>Pooja Description</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'pooja_desc' || pooja_desc !== '') && styles.focusedInput]}
                        value={pooja_desc}
                        onChangeText={(text) => setPooja_desc(text)}
                        onFocus={() => setIsFocused('pooja_desc')}
                        onBlur={() => setIsFocused(null)}
                    />

                    <Text style={[styles.label, (isFocused === 'price' || price !== '') && styles.focusedLabel]}>Price</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'price' || price !== '') && styles.focusedInput]}
                        value={price}
                        onChangeText={(text) => setPrice(text)}
                        onFocus={() => setIsFocused('price')}
                        onBlur={() => setIsFocused(null)}
                        keyboardType='numeric'
                    />

                    {/* Image Upload Section */}
                    <View>
                        <Text style={[styles.label, (poojaImageName !== 'Select Images') && styles.focusedLabel]}>Upload Pooja Images</Text>
                        <TouchableOpacity style={[styles.filePicker, { marginTop: 10 }]} onPress={selectTempleImages}>
                            <TextInput
                                style={styles.filePickerText}
                                editable={false}
                                placeholder={poojaImageName}
                                placeholderTextColor={'#000'}
                            />
                            <View style={styles.chooseBtn}>
                                <Text style={styles.chooseBtnText}>Choose Files</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={submitPooja}>
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

export default AddPooja

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
        marginTop: 15,
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
        letterSpacing: 1,
    },
})