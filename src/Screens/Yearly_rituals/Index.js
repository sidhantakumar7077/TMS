import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Index = (props) => {

    const [isFocused, setIsFocused] = useState(null);
    const [ritual_name, setRitual_name] = useState('');
    const [ritual_tithi, setRitual_tithi] = useState('');
    const [ritual_desc, setRitual_desc] = useState('');
    const [ritualDate, setRitualDate] = useState(null);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [ritualTime, setRitualTime] = useState(null);
    const [openTimePicker, setOpenTimePicker] = useState(false);

    const [templeImages, setTempleImages] = useState([]); // Array to store selected images
    const [templeImageCount, setTempleImageCount] = useState('Upload Ritual Images');
    const [templeVideos, setTempleVideos] = useState([]); // Array to store selected videos
    const [templeVideoCount, setTempleVideoCount] = useState('Upload Ritual Videos');
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
        setTempleImageCount(updatedImages.length > 0 ? `Uploaded ${updatedImages.length} Images` : 'Upload Ritual Images');
    };

    // Remove video by index
    const removeVideo = (indexToRemove) => {
        const updatedVideos = templeVideos.filter((_, index) => index !== indexToRemove);
        const updatedPausedVideos = pausedVideos.filter((_, index) => index !== indexToRemove);
        setTempleVideos(updatedVideos);
        setPausedVideos(updatedPausedVideos);
        setTempleVideoCount(updatedVideos.length > 0 ? `Uploaded ${updatedVideos.length} Videos` : 'Upload Ritual Videos');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Yearly Rituals</Text>

            <View style={styles.cardBox}>
                <View style={{ width: '95%', alignSelf: 'center' }}>
                    <Text style={[styles.label, (isFocused === 'ritual_name' || ritual_name !== '') && styles.focusedLabel]}>Ritual Name</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'ritual_name' || ritual_name !== '') && styles.focusedInput]}
                        value={ritual_name}
                        onChangeText={(text) => setRitual_name(text)}
                        onFocus={() => setIsFocused('ritual_name')}
                        onBlur={() => setIsFocused(null)}
                    />
                </View>

                {/* Ritual Date Field */}
                <View style={{ width: '95%', alignSelf: 'center' }}>
                    <Text style={[styles.label, ritualDate && styles.focusedLabel]}>Ritual Date</Text>
                    <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                        <TextInput
                            style={[styles.input, ritualDate && styles.focusedInput]}
                            value={
                                ritualDate
                                    ? ritualDate.toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                    : ''
                            }
                            // placeholder="Select Ritual Date"
                            // placeholderTextColor={'#7d7b7a'}
                            editable={false}
                        />
                    </TouchableOpacity>
                </View>

                {/* Ritual Time Field */}
                <View style={{ width: '95%', alignSelf: 'center' }}>
                    <Text style={[styles.label, ritualTime && styles.focusedLabel]}>Ritual Time</Text>
                    <TouchableOpacity onPress={() => setOpenTimePicker(true)}>
                        <TextInput
                            style={[styles.input, ritualTime && styles.focusedInput]}
                            value={
                                ritualTime
                                    ? ritualTime.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    })
                                    : ''
                            }
                            // placeholder="Select Ritual Time"
                            // placeholderTextColor={'#7d7b7a'}
                            editable={false}
                        />
                    </TouchableOpacity>
                </View>

                {/* DatePicker Modal */}
                <DatePicker
                    modal
                    open={openDatePicker}
                    date={ritualDate || new Date()}
                    mode="date"
                    onConfirm={(date) => {
                        setOpenDatePicker(false);
                        setRitualDate(date);
                    }}
                    onCancel={() => setOpenDatePicker(false)}
                />

                {/* TimePicker Modal */}
                <DatePicker
                    modal
                    open={openTimePicker}
                    date={ritualTime || new Date()}
                    mode="time"
                    onConfirm={(time) => {
                        setOpenTimePicker(false);
                        setRitualTime(time);
                    }}
                    onCancel={() => setOpenTimePicker(false)}
                />

                <View style={{ width: '95%', alignSelf: 'center' }}>
                    <Text style={[styles.label, (isFocused === 'ritual_tithi' || ritual_tithi !== '') && styles.focusedLabel]}>Ritual Tithi</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'ritual_tithi' || ritual_tithi !== '') && styles.focusedInput]}
                        value={ritual_tithi}
                        onChangeText={(text) => setRitual_tithi(text)}
                        onFocus={() => setIsFocused('ritual_tithi')}
                        onBlur={() => setIsFocused(null)}
                    />
                </View>

                <View style={{ width: '95%', alignSelf: 'center' }}>
                    <Text style={[styles.label, (isFocused === 'ritual_desc' || ritual_desc !== '') && styles.focusedLabel]}>Description</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'ritual_desc' || ritual_desc !== '') && styles.focusedInput]}
                        value={ritual_desc}
                        onChangeText={(text) => setRitual_desc(text)}
                        onFocus={() => setIsFocused('ritual_desc')}
                        onBlur={() => setIsFocused(null)}
                    />
                </View>
            </View>

            {/* Image Upload Section */}
            <View style={styles.cardBox}>
                <Text style={styles.subHeaderText}>Ritual Images</Text>
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
            <View style={styles.cardBox}>
                <Text style={styles.subHeaderText}>Ritual Videos</Text>
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

            {/* Submit Button */}
            <TouchableOpacity onPress={() => props.navigation.navigate('Daily_rituals')}>
                <LinearGradient
                    colors={['#c9170a', '#f0837f']}
                    style={styles.submitButton}
                >
                    <Text style={styles.submitText}>Submit</Text>
                </LinearGradient>
            </TouchableOpacity>

        </ScrollView>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    label: {
        color: '#757473',
        fontSize: 16,
        marginTop: 15,
    },
    focusedLabel: {
        color: '#56ab2f',
        fontSize: 16,
        fontWeight: '500',
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
        borderBottomWidth: 2,
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
});
