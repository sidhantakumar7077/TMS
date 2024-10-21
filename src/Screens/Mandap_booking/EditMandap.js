import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';
import { base_url } from '../../../App';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const EditMandap = (props) => {

    const navigation = useNavigation();
    const [mandap_name, setMandap_name] = useState('');
    const [price, setPrice] = useState('');
    const [mandap_desc, setMandap_desc] = useState('');
    const [eventName, setEventName] = useState(''); // New state for Event Name
    const [isFocused, setIsFocused] = useState(null);

    const [mandapType, setMandapType] = useState(null);
    const [mandapTypeOpen, setMandapTypeOpen] = useState(false);
    const [mandapTypes, setMandapTypes] = useState([
        { label: 'Day Basis', value: 'day-basis' },
        { label: 'Event Basis', value: 'event-basis' },
    ]);

    const [mandapImages, setMandapImages] = useState([]);
    const [mandapImageCount, setMandapImageCount] = useState('Select Images');

    // Handle image selection using react-native-image-picker
    const selectTempleImages = async () => {
        const options = {
            title: 'Select Images',
            selectionLimit: 0, // Allows multiple image selection
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
                setMandapImages([...mandapImages, ...selectedImages]); // Add new images to the array
                setMandapImageCount(`Select ${mandapImages.length + selectedImages.length} Images`);
            }
        });
    };

    // Remove image by index
    const removeImage = (indexToRemove) => {
        const updatedImages = mandapImages.filter((_, index) => index !== indexToRemove);
        setMandapImages(updatedImages);
        setMandapImageCount(updatedImages.length > 0 ? `Select ${updatedImages.length} Images` : 'Select Images');
    };

    useEffect(() => {
        // console.log("Mandap Details", props.route.params);
        setMandap_name(props.route.params.mandap_name);
        setPrice(props.route.params.price_per_day);
        setMandap_desc(props.route.params.mandap_description);
        setEventName(props.route.params.event_name);
        setMandapType(props.route.params.booking_type);
    }, []);

    const submitMandap = async () => {
        var access_token = await AsyncStorage.getItem('storeAccesstoken');
        if (mandap_name === '') {
            Toast.show('Mandap name is required', Toast.LONG);
            return;
        } if (mandapType === null) {
            Toast.show('Mandap type is required', Toast.LONG);
            return;
        } if (price === '') {
            Toast.show('Price is required', Toast.LONG);
            return;
        } if (mandap_desc === '') {
            Toast.show('Mandap description is required', Toast.LONG);
            return;
        }

        try {
            const requestData = {
                mandap_name: mandap_name,
                mandap_description: mandap_desc,
                booking_type: mandapType,
                price_per_day: price,
            };

            if (mandapType === 'event-basis') {
                requestData.event_name = eventName;
            }

            const response = await axios.put(`${base_url}/api/mandaps/${props.route.params.id}`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    }
                });
            // console.log("object", response.data);
            // return;
            if (response.data.status === 200) {
                Toast.show("Mandap updated successfully", Toast.LONG);
                navigation.goBack();
            } else {
                Toast.show('Failed to update mandap', Toast.LONG);
                console.log("Failed to update mandap", response);
            }
        } catch (error) {
            Toast.show('Failed to update mandap', Toast.LONG);
            console.log("Failed to update mandap", error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Edit Mandap</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.topBanner}>
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, }} source={{ uri: 'https://images.fineartamerica.com/images/artworkimages/medium/3/jagannath-temple-in-puri-heritage.jpg' }} />
                </View>

                <View style={styles.cardBox}>
                    <Text style={[styles.label, (isFocused === 'mandap_name' || mandap_name !== '') && styles.focusedLabel]}>Mandap Name</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'mandap_name' || mandap_name !== '') && styles.focusedInput]}
                        value={mandap_name}
                        onChangeText={(text) => setMandap_name(text)}
                        onFocus={() => setIsFocused('mandap_name')}
                        onBlur={() => setIsFocused(null)}
                    />

                    {/* Mandap Type Dropdown */}
                    <Text style={[styles.label, { marginTop: -7 }, mandapType && styles.focusedLabel]}>Mandap Type</Text>
                    <DropDownPicker
                        open={mandapTypeOpen}
                        value={mandapType}
                        items={mandapTypes}
                        setOpen={setMandapTypeOpen}
                        setValue={setMandapType}
                        setItems={setMandapTypes}
                        placeholder="Select Mandap Type"
                        style={[
                            styles.input,
                            styles.dropdown,
                            {
                                borderBottomColor: mandapTypeOpen ? '#56ab2f' : '#757473',
                                height: mandapTypeOpen ? 50 : 25,
                                backgroundColor: '#f4f4f4',
                                paddingHorizontal: 10,
                                width: '103%',
                                alignSelf: 'center'
                            }
                        ]}
                        textStyle={{
                            color: mandapType ? '#000' : '#757473',
                            fontSize: 16,
                        }}
                        dropDownContainerStyle={[styles.dropdownContainer, {
                            borderBottomColor: '#56ab2f',
                        }]}
                        placeholderStyle={{ color: '#757473', fontSize: 13 }}
                        zIndex={3000}
                        zIndexInverse={1000}
                    />

                    {/* Conditionally render Event Name field if "Event Basis" is selected */}
                    {mandapType === 'event-basis' && (
                        <>
                            <Text style={[styles.label, (isFocused === 'event-name' || eventName !== '') && styles.focusedLabel]}>Event Name</Text>
                            <TextInput
                                style={[styles.input, (isFocused === 'event-name' || eventName !== '') && styles.focusedInput]}
                                value={eventName}
                                onChangeText={(text) => setEventName(text)}
                                onFocus={() => setIsFocused('event-name')}
                                onBlur={() => setIsFocused(null)}
                            />
                        </>
                    )}

                    <Text style={[styles.label, (isFocused === 'price' || price !== '') && styles.focusedLabel]}>Price</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'price' || price !== '') && styles.focusedInput]}
                        value={price}
                        onChangeText={(text) => setPrice(text)}
                        onFocus={() => setIsFocused('price')}
                        onBlur={() => setIsFocused(null)}
                        keyboardType='numeric'
                    />

                    <Text style={[styles.label, (isFocused === 'mandap_desc' || mandap_desc !== '') && styles.focusedLabel]}>Mandap Description</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'mandap_desc' || mandap_desc !== '') && styles.focusedInput]}
                        value={mandap_desc}
                        onChangeText={(text) => setMandap_desc(text)}
                        onFocus={() => setIsFocused('mandap_desc')}
                        onBlur={() => setIsFocused(null)}
                    />
                    {/* Image Upload Section */}
                    {/* <View>
                        <Text style={[styles.label, (mandapImageCount !== 'Select Images') && styles.focusedLabel]}>Upload Mandap Images</Text>
                        <TouchableOpacity style={[styles.filePicker, { marginTop: 10 }]} onPress={selectTempleImages}>
                            <TextInput
                                style={styles.filePickerText}
                                editable={false}
                                placeholder={mandapImageCount}
                                placeholderTextColor={'#000'}
                            />
                            <View style={styles.chooseBtn}>
                                <Text style={styles.chooseBtnText}>Choose Files</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.imagePreviewContainer}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {mandapImages.length > 0 ? (
                                    mandapImages.map((image, index) => (
                                        <View key={index} style={styles.imageWrapper}>
                                            <Image source={{ uri: image.uri }} style={styles.imagePreview} />
                                            <TouchableOpacity style={styles.removeIcon} onPress={() => removeImage(index)}>
                                                <Icon name="cancel" size={24} color="red" />
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                ) : null}
                            </ScrollView>
                        </View>
                    </View> */}
                </View>

                <TouchableOpacity onPress={submitMandap}>
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

export default EditMandap;

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
});
