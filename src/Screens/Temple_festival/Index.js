import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

const Index = (props) => {

    const [festival_name, setFestival_name] = useState('');
    const [fastival_date, setFastival_date] = useState(null);
    const [dateOpen, setDateOpen] = useState(false);
    const [festival_desc, setFestival_desc] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    const [festivalImages, setFestivalImages] = useState([]);
    const [festivalImageCount, setFestivalImageCount] = useState('Upload Festival Images');

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
                setFestivalImageCount(`Uploaded ${festivalImages.length + selectedImages.length} Images`);
            }
        });
    };

    // Remove image by index
    const removeImage = (indexToRemove) => {
        const updatedImages = festivalImages.filter((_, index) => index !== indexToRemove);
        setFestivalImages(updatedImages);
        setFestivalImageCount(updatedImages.length > 0 ? `Uploaded ${updatedImages.length} Images` : 'Upload Festival Images');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Temple Festival</Text>

            <View style={{ width: '95%', alignSelf: 'center', flex: 1 }}>
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
                    maxLength={10}
                    onChangeText={(text) => setFestival_desc(text)}
                    onFocus={() => setIsFocused('festival_desc')}
                    onBlur={() => setIsFocused(null)}
                />

                {/* Image Upload Section */}
                <View>
                    <Text style={[styles.label, (festivalImageCount !== 'Upload Festival Images') && styles.focusedLabel]}>Select Festival Images</Text>
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
                    {/* Display selected images with remove (cross) icon */}
                    <View style={styles.imagePreviewContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {festivalImages.length > 0 ? (
                                festivalImages.map((image, index) => (
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

            {/* Submit Button */}
            <TouchableOpacity onPress={() => props.navigation.navigate('Temple_news')}>
                <LinearGradient
                    colors={['#c9170a', '#f0837f']}
                    style={styles.submitButton}
                >
                    <Text style={styles.submitText}>Submit</Text>
                </LinearGradient>
            </TouchableOpacity>
        </ScrollView>
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