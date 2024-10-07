import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import DrawerModal from '../../Component/DrawerModal';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';

const Index = (props) => {

    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => { setModalVisible(true) };
    const closeModal = () => { setModalVisible(false) };

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [activeIndex, setActiveIndex] = useState(null);
    const [darshanDetails, setDarshanDetails] = useState({});
    const [isFocused, setIsFocused] = useState({});
    const [openStartPicker, setOpenStartPicker] = useState({}); // For opening start time picker for each day
    const [openEndPicker, setOpenEndPicker] = useState({}); // For opening end time picker for each day
    const [timeError, setTimeError] = useState({}); // For handling time errors for each day
    const [darshanImages, setDarshanImages] = useState({});

    const handleFocus = (day, field) => {
        setIsFocused(prevState => ({ ...prevState, [day]: field }));
    };

    const validateEndTime = (day, selectedEndTime) => {
        if (darshanDetails[day]?.startTime && selectedEndTime <= darshanDetails[day]?.startTime) {
            setTimeError(prevState => ({ ...prevState, [day]: 'End time must be greater than start time' }));
            setDarshanDetails(prevState => ({
                ...prevState,
                [day]: { ...prevState[day], endTime: null }
            }));
        } else {
            setTimeError(prevState => ({ ...prevState, [day]: null }));
            setDarshanDetails(prevState => ({
                ...prevState,
                [day]: { ...prevState[day], endTime: selectedEndTime }
            }));
        }
    };

    const openTimePicker = (day, type) => {
        if (type === 'start') {
            setOpenStartPicker(prevState => ({ ...prevState, [day]: true }));
        } else {
            setOpenEndPicker(prevState => ({ ...prevState, [day]: true }));
        }
    };

    const selectDarshanImages = async (day) => {
        const options = {
            title: 'Select Images',
            selectionLimit: 0,
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
                // Update the state for images corresponding to the selected day
                setDarshanImages(prevState => ({
                    ...prevState,
                    [day]: [...(prevState[day] || []), ...selectedImages],
                }));
            }
        });
    };

    const removeImage = (day, indexToRemove) => {
        const updatedImages = darshanImages[day].filter((_, index) => index !== indexToRemove);
        setDarshanImages(prevState => ({
            ...prevState,
            [day]: updatedImages,
        }));
    };

    return (
        <ScrollView style={styles.container}>
            <DrawerModal visible={isModalVisible} navigation={navigation} onClose={closeModal} />
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Temple Darshan</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={openModal} style={{ marginLeft: 8 }}>
                        <Octicons name="three-bars" color={'#000'} size={28} />
                    </TouchableOpacity>
                </View>
            </View>

            {daysOfWeek.map((day, index) => (
                <Collapse key={index} isExpanded={activeIndex === index} onToggle={() => setActiveIndex(activeIndex === index ? null : index)}>

                    <CollapseHeader>
                        <View style={[styles.collapseHeader, activeIndex === index && styles.activeHeader]}>
                            <Text style={styles.collapseHeaderText}>{day}</Text>
                            <Icon name={activeIndex === index ? 'remove' : 'add'} size={24} color="#000" />
                        </View>
                    </CollapseHeader>

                    <CollapseBody style={styles.cardBox}>
                        <View style={[styles.formGroup, { marginTop: 10 }]}>
                            <Text style={[styles.label, (isFocused[day] === 'darshanName' || darshanDetails[day]?.darshanName) && styles.focusedLabel]}>Darshan Name</Text>
                            <TextInput
                                style={[styles.input, (isFocused[day] === 'darshanName' || darshanDetails[day]?.darshanName) && styles.focusedInput]}
                                onFocus={() => handleFocus(day, 'darshanName')}
                                onBlur={() => handleFocus(day, null)}
                                onChangeText={(text) => setDarshanDetails(prevState => ({
                                    ...prevState,
                                    [day]: { ...prevState[day], darshanName: text }
                                }))}
                                value={darshanDetails[day]?.darshanName || ''}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={[styles.label, darshanDetails[day]?.startTime && styles.focusedLabel]}>Darshan Start Time</Text>
                            <TouchableOpacity onPress={() => openTimePicker(day, 'start')}>
                                <TextInput
                                    style={[styles.input, darshanDetails[day]?.startTime && styles.focusedInput]}
                                    value={
                                        darshanDetails[day]?.startTime
                                            ? darshanDetails[day].startTime.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })
                                            : ''
                                    }
                                    editable={false}
                                />
                            </TouchableOpacity>

                            <Text style={[styles.label, darshanDetails[day]?.endTime && styles.focusedLabel]}>Darshan End Time</Text>
                            <TouchableOpacity onPress={() => openTimePicker(day, 'end')}>
                                <TextInput
                                    style={[styles.input, darshanDetails[day]?.endTime && styles.focusedInput, timeError[day] && { borderBottomColor: 'red' }]}
                                    value={
                                        darshanDetails[day]?.endTime
                                            ? darshanDetails[day].endTime.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })
                                            : ''
                                    }
                                    editable={false}
                                />
                            </TouchableOpacity>
                            {timeError[day] && <Text style={styles.errorText}>{timeError[day]}</Text>}
                        </View>

                        {/* Start Time Picker */}
                        <DatePicker
                            modal
                            mode="time"
                            open={openStartPicker[day]}
                            date={darshanDetails[day]?.startTime || new Date()}
                            onConfirm={(time) => {
                                setOpenStartPicker(prevState => ({ ...prevState, [day]: false }));
                                setDarshanDetails(prevState => ({
                                    ...prevState,
                                    [day]: { ...prevState[day], startTime: time }
                                }));
                            }}
                            onCancel={() => setOpenStartPicker(prevState => ({ ...prevState, [day]: false }))}
                        />

                        {/* End Time Picker */}
                        <DatePicker
                            modal
                            mode="time"
                            open={openEndPicker[day]}
                            date={darshanDetails[day]?.endTime || new Date()}
                            onConfirm={(time) => {
                                setOpenEndPicker(prevState => ({ ...prevState, [day]: false }));
                                validateEndTime(day, time);
                            }}
                            onCancel={() => setOpenEndPicker(prevState => ({ ...prevState, [day]: false }))}
                        />

                        {/* Image Upload Section */}
                        <View>
                            <Text style={styles.subHeaderText}>Darshan Images</Text>
                            <TouchableOpacity style={styles.filePicker} onPress={() => selectDarshanImages(day)}>
                                <TextInput
                                    style={styles.filePickerText}
                                    editable={false}
                                    placeholder={`Uploaded ${darshanImages[day]?.length || 0} Images`}
                                    placeholderTextColor={'#000'}
                                />
                                <View style={styles.chooseBtn}>
                                    <Text style={styles.chooseBtnText}>Choose Files</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.imagePreviewContainer}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {darshanImages[day]?.map((image, index) => (
                                        <View key={index} style={styles.imageWrapper}>
                                            <Image source={{ uri: image.uri }} style={styles.imagePreview} />
                                            <TouchableOpacity style={styles.removeIcon} onPress={() => removeImage(day, index)}>
                                                <Icon name="cancel" size={24} color="red" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={[styles.label, (isFocused[day] === 'description' || darshanDetails[day]?.description) && styles.focusedLabel]}>Description</Text>
                            <TextInput
                                style={[styles.textArea, (isFocused[day] === 'description' || darshanDetails[day]?.description) && styles.focusedInput]}
                                multiline={true}
                                onFocus={() => handleFocus(day, 'description')}
                                onBlur={() => handleFocus(day, null)}
                                onChangeText={(text) => setDarshanDetails(prevState => ({
                                    ...prevState,
                                    [day]: { ...prevState[day], description: text }
                                }))}
                                value={darshanDetails[day]?.description || ''}
                            />
                        </View>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.addButton}>
                                <Entypo name="plus" size={30} color={'#fff'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Darshan_time')} style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </CollapseBody>
                </Collapse>
            ))}
        </ScrollView>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
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
        marginBottom: 10
    },
    headerText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 3,
        // marginLeft: 5,
    },
    collapseHeader: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#ffe3e3',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
    },
    activeHeader: {
        backgroundColor: '#ffd1d1',
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
    collapseHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    formGroup: {
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#757473',
        marginBottom: 10,
        color: '#333',
    },
    focusedInput: {
        borderBottomColor: '#56ab2f',
        borderBottomWidth: 2,
    },
    focusedLabel: {
        color: '#56ab2f',
    },
    textArea: {
        borderBottomWidth: 1,
        borderBottomColor: '#757473',
        marginBottom: 10,
        color: '#333',
        textAlignVertical: 'top',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 20
    },
    addButton: {
        backgroundColor: '#028A0F',
        borderRadius: 8,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#FF0000',
        width: 100,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitButtonText: {
        alignSelf: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: -5,
        marginBottom: 20,
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
});
