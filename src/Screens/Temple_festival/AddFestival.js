import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';
import { base_url } from '../../../App';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const AddFestival = (props) => {

    const navigation = useNavigation();
    const [festival_name, setFestival_name] = useState('');
    const [fastival_date, setFastival_date] = useState(null);
    const [dateOpen, setDateOpen] = useState(false);
    const [festival_desc, setFestival_desc] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    const [festivalImages, setFestivalImages] = useState([]);
    const [festivalImageCount, setFestivalImageCount] = useState('Select Images');

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
                setFestivalImages([...festivalImages, ...selectedImages]); // Add new images to the array
                setFestivalImageCount(`Select ${festivalImages.length + selectedImages.length} Images`);
            }
        });
    };

    // Remove image by index
    const removeImage = (indexToRemove) => {
        const updatedImages = festivalImages.filter((_, index) => index !== indexToRemove);
        setFestivalImages(updatedImages);
        setFestivalImageCount(updatedImages.length > 0 ? `Select ${updatedImages.length} Images` : 'Select Images');
    };

    const showErrorToast = (message) => {
        Toast.show(message, Toast.LONG);
    };

    const handleSubmit = async () => {
        var access_token = await AsyncStorage.getItem('storeAccesstoken');
        if (!festival_name || !fastival_date || !festival_desc) {
            showErrorToast("Please fill all the fields");
            return;
        }

        const formData = new FormData();
        formData.append('festival_name', festival_name);
        formData.append('festival_date', moment(fastival_date).format('YYYY-MM-DD'));
        formData.append('festival_descp', festival_desc);
        festivalImages.forEach((image, index) => {
            formData.append(`festival_image_${index}`, {
                name: image.fileName,
                type: image.type,
                uri: image.uri
            });
        });

        try {
            const response = await axios.post(
                `${base_url}/api/save-festival`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.status === 200) {
                Toast.show("Festival added successfully", Toast.LONG);
                navigation.goBack();
            } else {
                showErrorToast(response.data.message || "Failed to add festival");
            }
        } catch (error) {
            showErrorToast("An error occurred. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Add Festival</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.topBanner}>
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, }} source={{ uri: 'https://images.fineartamerica.com/images/artworkimages/medium/3/jagannath-temple-in-puri-heritage.jpg' }} />
                </View>
                <View style={styles.cardBox}>
                    {/* Festival Name Input */}
                    <Text style={[styles.label, (isFocused === 'festival_name' || festival_name !== '') && styles.focusedLabel]}>Festival Name</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'festival_name' || festival_name !== '') && styles.focusedInput]}
                        value={festival_name}
                        onChangeText={(text) => setFestival_name(text)}
                        onFocus={() => setIsFocused('festival_name')}
                        onBlur={() => setIsFocused(null)}
                    />

                    {/* Fastival Date */}
                    <Text style={[styles.label, (fastival_date !== null) && styles.focusedLabel]}>Festival Date</Text>
                    <TouchableOpacity onPress={() => setDateOpen(true)} style={[styles.datePickerStyle, (fastival_date !== null) && { marginTop: 14 }]}>
                        <Text style={{ color: '#000', width: '90%' }}>{fastival_date ? moment(fastival_date).format("DD/MM/YYYY") : null}</Text>
                        <Fontisto name="date" size={fastival_date !== null ? 22 : 19} color={fastival_date !== null ? '#56ab2f' : "#161c19"} />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: fastival_date !== null ? '#56ab2f' : '#757473', width: '100%', height: fastival_date !== null ? 2 : 0.7, marginBottom: 30 }} />
                    <View>
                        <DatePicker
                            modal
                            mode="date"
                            open={dateOpen}
                            date={fastival_date || new Date()}
                            onConfirm={(data) => {
                                setDateOpen(false)
                                setFastival_date(data)
                            }}
                            onCancel={() => {
                                setDateOpen(false);
                            }}
                        />
                    </View>

                    {/* Festival Description Input */}
                    <Text style={[styles.label, (isFocused === 'festival_desc' || festival_desc !== '') && styles.focusedLabel]}>Festival Description</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'festival_desc' || festival_desc !== '') && styles.focusedInput]}
                        value={festival_desc}
                        onChangeText={(text) => setFestival_desc(text)}
                        onFocus={() => setIsFocused('festival_desc')}
                        onBlur={() => setIsFocused(null)}
                    />

                    {/* Image Upload Section */}
                    {/* <View>
                        <Text style={[styles.label, (festivalImageCount !== 'Select Images') && styles.focusedLabel]}>Upload Festival Images</Text>
                        <TouchableOpacity style={[styles.filePicker, { marginTop: 10 }]} onPress={selectTempleImages}>
                            <TextInput
                                style={styles.filePickerText}
                                editable={false}
                                placeholder={festivalImageCount}
                                placeholderTextColor={'#000'}
                            />
                            <View style={styles.chooseBtn}>
                                <Text style={styles.chooseBtnText}>Choose Files</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.imagePreviewContainer}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {festivalImages.length > 0 ? (
                                    festivalImages.map((image, index) => (
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
                {/* Submit Button */}
                <TouchableOpacity onPress={handleSubmit}>
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

export default AddFestival

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
    subHeaderText: {
        fontSize: 18,
        marginVertical: 10,
        fontWeight: 'bold',
        color: '#333',
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
    datePickerStyle: {
        width: '100%',
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})