import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useIsFocused } from '@react-navigation/native'
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

    const [templeImages, setTempleImages] = useState([]); // Array to store selected images
    const [templeImageCount, setTempleImageCount] = useState('Select Images');
    const [templeVideos, setTempleVideos] = useState([]); // Array to store selected videos
    const [templeVideoCount, setTempleVideoCount] = useState('Select Videos');
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
        setTempleImageCount(updatedImages.length > 0 ? `Uploaded ${updatedImages.length} Images` : 'Select Images');
    };

    // Remove video by index
    const removeVideo = (indexToRemove) => {
        const updatedVideos = templeVideos.filter((_, index) => index !== indexToRemove);
        const updatedPausedVideos = pausedVideos.filter((_, index) => index !== indexToRemove);
        setTempleVideos(updatedVideos);
        setPausedVideos(updatedPausedVideos);
        setTempleVideoCount(updatedVideos.length > 0 ? `Uploaded ${updatedVideos.length} Videos` : 'Select Videos');
    };

    const showErrorToast = (message) => {
        Toast.show(message, Toast.LONG);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        templeImages.forEach((image, index) => {
            formData.append('temple_images[]', {
                uri: image.uri,
                type: image.type,
                name: image.fileName,
            });
        });
        templeVideos.forEach((video, index) => {
            formData.append('temple_videos[]', {
                uri: video.uri,
                type: video.type,
                name: video.fileName,
            });
        });

        try {
            const response = await axios.post(`${base_url}/api/update-photos-videos`, formData, {
                headers: {
                    Authorization: `Bearer 4|Zbbp4OHk9kdowMDwzTw4L7vcm8JUXQP3g7Hq2VI2360b0f76`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                console.log("object", response.data);
                showErrorToast('Data posted successfully');
            } else {
                showErrorToast('Error posting data: Unexpected response status', response.status);
            }
        } catch (error) {
            showErrorToast('Error posting data:', error);
        }
    }

    const fetchTempleMedia = async () => {
        try {
            const response = await axios.get(`${base_url}/api/temple-photos-videos`, {
                headers: {
                    Authorization: `Bearer 4|Zbbp4OHk9kdowMDwzTw4L7vcm8JUXQP3g7Hq2VI2360b0f76`,
                },
            });

            if (response.status === 200) {
                setTempleImages(response.data.data.temple_images);
                setTempleImageCount(`Uploaded ${response.data.data.temple_images.length} Images`);
                setTempleVideos(response.data.data.temple_videos);
                setTempleVideoCount(`Uploaded ${response.data.data.temple_videos.length} Videos`);
                setPausedVideos(response.data.data.temple_videos.map(() => true));
            } else {
                showErrorToast('Error fetching data: Unexpected response status', response.status);
            }
        } catch (error) {
            showErrorToast('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchTempleMedia();
    }, []);

    return (
        <View style={styles.container}>
            <DrawerModal visible={isModalVisible} navigation={navigation} onClose={closeModal} />
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Temple Image & Video</Text>
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
                    {/* Image Upload Section */}
                    <View style={styles.cardBox}>
                        <Text style={styles.subHeaderText}>Upload Temple Images</Text>
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
                                            <Image source={{ uri: `${base_url}${image.uri}` }} style={styles.imagePreview} />
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
                    <View style={styles.cardBox}>
                        <Text style={styles.subHeaderText}>Upload Temple Videos</Text>
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
                                                source={{ uri: `${base_url}${video.uri}` }}
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

export default Index

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
})