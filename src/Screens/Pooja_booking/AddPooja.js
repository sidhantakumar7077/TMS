import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';

const AddPooja = (props) => {

    const navigation = useNavigation();
    const [pooja_name, setPooja_name] = useState('');
    const [price, setPrice] = useState('');
    const [pooja_desc, setPooja_desc] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    const [poojaImages, setPoojaImages] = useState([]);
    const [poojaImageCount, setPoojaImageCount] = useState('Select Images');

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
                setPoojaImages([...poojaImages, ...selectedImages]); // Add new images to the array
                setPoojaImageCount(`Select ${poojaImages.length + selectedImages.length} Images`);
            }
        });
    };

    // Remove image by index
    const removeImage = (indexToRemove) => {
        const updatedImages = poojaImages.filter((_, index) => index !== indexToRemove);
        setPoojaImages(updatedImages);
        setPoojaImageCount(updatedImages.length > 0 ? `Select ${updatedImages.length} Images` : 'Select Images');
    };

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
                    />

                    {/* Image Upload Section */}
                    <View>
                        <Text style={[styles.label, (poojaImageCount !== 'Select Images') && styles.focusedLabel]}>Upload Pooja Images</Text>
                        <TouchableOpacity style={[styles.filePicker, { marginTop: 10 }]} onPress={selectTempleImages}>
                            <TextInput
                                style={styles.filePickerText}
                                editable={false}
                                placeholder={poojaImageCount}
                                placeholderTextColor={'#000'}
                            />
                            <View style={styles.chooseBtn}>
                                <Text style={styles.chooseBtnText}>Choose Files</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Display selected images with remove (cross) icon */}
                        <View style={styles.imagePreviewContainer}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {poojaImages.length > 0 ? (
                                    poojaImages.map((image, index) => (
                                        <View key={index} style={styles.imageWrapper}>
                                            <Image source={{ uri: image.uri }} style={styles.imagePreview} />
                                            {/* Cross icon to remove the image */}
                                            <TouchableOpacity style={styles.removeIcon} onPress={() => removeImage(index)}>
                                                <Icon name="cancel" size={24} color="red" />
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                ) : null}
                            </ScrollView>
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={() => props.navigation.goBack()}>
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