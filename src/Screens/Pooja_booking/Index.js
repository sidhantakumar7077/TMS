import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Index = () => {

    const [pooja_name, setPooja_name] = useState('');
    const [price, setPrice] = useState('');
    const [pooja_desc, setPooja_desc] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    const [poojaImages, setPoojaImages] = useState([]);
    const [poojaImageCount, setPoojaImageCount] = useState('Upload Pooja Images');

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
                setPoojaImageCount(`Uploaded ${poojaImages.length + selectedImages.length} Images`);
            }
        });
    };

    // Remove image by index
    const removeImage = (indexToRemove) => {
        const updatedImages = poojaImages.filter((_, index) => index !== indexToRemove);
        setPoojaImages(updatedImages);
        setPoojaImageCount(updatedImages.length > 0 ? `Uploaded ${updatedImages.length} Images` : 'Upload Pooja Images');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Pooja Booking</Text>

            <View style={{ width: '95%', alignSelf: 'center' }}>
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
                    <Text style={[styles.label, (poojaImageCount !== 'Upload Pooja Images') && styles.focusedLabel]}>Select Pooja Images</Text>
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
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#f4f4f4',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginVertical: 20,
        fontFamily: 'sans-serif-medium',
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
})