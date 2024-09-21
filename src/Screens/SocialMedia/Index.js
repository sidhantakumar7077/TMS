import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';

const Index = (props) => {

    const [utubeURL, setUtubeURL] = useState('');
    const [instaURL, setInstaURL] = useState('');
    const [facebookURL, setFacebookURL] = useState('');
    const [twitterURL, setTwitterURL] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    const [templeImages, setTempleImages] = useState([]); // Array to store selected images
    const [templeImageCount, setTempleImageCount] = useState('Upload Temple Images');
    const [templeVideos, setTempleVideos] = useState([]); // Array to store selected videos
    const [templeVideoCount, setTempleVideoCount] = useState('Upload Temple Videos');
    const [pausedVideos, setPausedVideos] = useState([]); // Array to track paused videos

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
                setTempleImages([...templeImages, ...selectedImages]); // Add new images to the array
                setTempleImageCount(`Uploaded ${templeImages.length + selectedImages.length} Images`);
            }
        });
    };

    // Handle video selection using react-native-image-picker
    const selectTempleVideos = async () => {
        const options = {
            title: 'Select Videos',
            selectionLimit: 0, // Allows multiple video selection
            mediaType: 'video', // Restrict to video selection
            includeBase64: false,
            storageOptions: {
                skipBackup: true,
                path: 'videos',
            },
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled video picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const selectedVideos = response.assets;
                setTempleVideos([...templeVideos, ...selectedVideos]); // Add new videos to the array
                setTempleVideoCount(`Uploaded ${templeVideos.length + selectedVideos.length} Videos`);
                setPausedVideos([...pausedVideos, ...selectedVideos.map(() => true)]); // Initialize paused state for each video
            }
        });
    };

    // Toggle play/pause state for a video by index
    const togglePlayPause = (index) => {
        const updatedPausedVideos = pausedVideos.map((paused, i) => (i === index ? !paused : paused));
        setPausedVideos(updatedPausedVideos);
    };

    // Remove image by index
    const removeImage = (indexToRemove) => {
        const updatedImages = templeImages.filter((_, index) => index !== indexToRemove);
        setTempleImages(updatedImages);
        setTempleImageCount(updatedImages.length > 0 ? `Uploaded ${updatedImages.length} Images` : 'Upload Temple Images');
    };

    // Remove video by index
    const removeVideo = (indexToRemove) => {
        const updatedVideos = templeVideos.filter((_, index) => index !== indexToRemove);
        const updatedPausedVideos = pausedVideos.filter((_, index) => index !== indexToRemove);
        setTempleVideos(updatedVideos);
        setPausedVideos(updatedPausedVideos);
        setTempleVideoCount(updatedVideos.length > 0 ? `Uploaded ${updatedVideos.length} Videos` : 'Upload Temple Videos');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Social Media</Text>
            <View style={{ width: '95%', alignSelf: 'center', flex: 1 }}>
                {/* Image Upload Section */}
                <View>
                    <Text style={styles.subHeaderText}>Select Images</Text>
                    <TouchableOpacity style={styles.filePicker} onPress={selectTempleImages}>
                        <TextInput
                            style={styles.filePickerText}
                            editable={false}
                            placeholder={templeImageCount}
                            placeholderTextColor={'#000'}
                        />
                        <View style={styles.chooseBtn}>
                            <Text style={styles.chooseBtnText}>Choose Files</Text>
                        </View>
                    </TouchableOpacity>
                    {/* Display selected images with remove (cross) icon */}
                    <View style={styles.imagePreviewContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {templeImages.length > 0 ? (
                                templeImages.map((image, index) => (
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

                {/* Video Upload Section */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.subHeaderText}>Select Videos</Text>
                    <TouchableOpacity style={styles.filePicker} onPress={selectTempleVideos}>
                        <TextInput
                            style={styles.filePickerText}
                            editable={false}
                            placeholder={templeVideoCount}
                            placeholderTextColor={'#000'}
                        />
                        <View style={styles.chooseBtn}>
                            <Text style={styles.chooseBtnText}>Choose Files</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Display selected videos with custom play/pause control */}
                    <View style={styles.videoPreviewContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {templeVideos.length > 0 ? (
                                templeVideos.map((video, index) => (
                                    <View key={index} style={styles.videoWrapper}>
                                        <Video
                                            source={{ uri: video.uri }}
                                            style={styles.videoPreview}
                                            paused={pausedVideos[index]} // Control play/pause based on state
                                            resizeMode="cover"
                                        />
                                        {/* Play/Pause button */}
                                        <TouchableOpacity style={styles.playPauseBtn} onPress={() => togglePlayPause(index)}>
                                            <Icon name={pausedVideos[index] ? "play-arrow" : "pause"} size={24} color="white" />
                                        </TouchableOpacity>
                                        {/* Cross icon to remove the video */}
                                        <TouchableOpacity style={styles.removeIcon} onPress={() => removeVideo(index)}>
                                            <Icon name="cancel" size={24} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                ))
                            ) : null}
                        </ScrollView>
                    </View>
                </View>

                <Text style={[styles.label, (isFocused === 'utubeURL' || utubeURL !== '') && styles.focusedLabel]}>Youtube URL</Text>
                <TextInput
                    style={[styles.input, (isFocused === 'utubeURL' || utubeURL !== '') && styles.focusedInput]}
                    value={utubeURL}
                    onChangeText={(text) => setUtubeURL(text)}
                    onFocus={() => setIsFocused('utubeURL')}
                    onBlur={() => setIsFocused(null)}
                />

                {/* Address Input */}
                <Text style={[styles.label, (isFocused === 'instaURL' || instaURL !== '') && styles.focusedLabel]}>Instagram URL</Text>
                <TextInput
                    style={[styles.input, (isFocused === 'instaURL' || instaURL !== '') && styles.focusedInput]}
                    value={instaURL}
                    onChangeText={(text) => setInstaURL(text)}
                    onFocus={() => setIsFocused('instaURL')}
                    onBlur={() => setIsFocused(null)}
                />

                {/* Trust Contact Number Input */}
                <Text style={[styles.label, (isFocused === 'facebookURL' || facebookURL !== '') && styles.focusedLabel]}>Facebook URL</Text>
                <TextInput
                    style={[styles.input, (isFocused === 'facebookURL' || facebookURL !== '') && styles.focusedInput]}
                    value={facebookURL}
                    maxLength={10}
                    onChangeText={(text) => setFacebookURL(text)}
                    onFocus={() => setIsFocused('facebookURL')}
                    onBlur={() => setIsFocused(null)}
                />

                {/* Creator Name Input */}
                <Text style={[styles.label, (isFocused === 'twitterURL' || twitterURL !== '') && styles.focusedLabel]}>Twitter URL</Text>
                <TextInput
                    style={[styles.input, (isFocused === 'twitterURL' || twitterURL !== '') && styles.focusedInput]}
                    value={twitterURL}
                    onChangeText={(text) => setTwitterURL(text)}
                    onFocus={() => setIsFocused('twitterURL')}
                    onBlur={() => setIsFocused(null)}
                />

            </View>

            {/* Submit Button */}
            <TouchableOpacity onPress={() => props.navigation.navigate('BankDetails')}>
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

export default Index;

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
