import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import DrawerModal from '../../Component/DrawerModal';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';

const Index = (props) => {

    const richTextAbout = useRef(); // Reference to Temple About editor
    const richTextHistory = useRef(); // Reference to Temple History editor
    const [contentAbout, setContentAbout] = useState(''); // State for Temple About content
    const [contentHistory, setContentHistory] = useState(''); // State for Temple History content
    const [isEndowmentChecked, setIsEndowmentChecked] = useState(true);
    const [isTrustChecked, setIsTrustChecked] = useState(true);
    const [endowmentRegNumber, setEndowmentRegNumber] = useState('');
    const [trustRegNumber, setTrustRegNumber] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    const [endowmentImageSource, setEndowmentImageSource] = useState(null);
    const [endowmentImage, setEndowmentImage] = useState('Upload Endowment Document');
    // Handle document upload using react-native-image-picker
    const selectEndowmentImage = async () => {
        // var access_token = await AsyncStorage.getItem('storeAccesstoken');
        const options = {
            title: 'Select Image',
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
                const source = response.assets[0]
                setEndowmentImageSource(source);
                setEndowmentImage(response.assets[0].fileName);
                // console.log("selected image-=-=", response.assets[0])
            }
        });
    };

    const [trustImageSource, setTrustImageSource] = useState(null);
    const [trustImage, setTrustImage] = useState('Upload Trust Document');
    // Handle document upload using react-native-image-picker
    const selectTrustImage = async () => {
        // var access_token = await AsyncStorage.getItem('storeAccesstoken');
        const options = {
            title: 'Select Image',
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
                const source = response.assets[0]
                setTrustImageSource(source);
                setTrustImage(response.assets[0].fileName);
                // console.log("selected image-=-=", response.assets[0])
            }
        });
    };

    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => { setModalVisible(true) };
    const closeModal = () => { setModalVisible(false) };

    return (
        <View style={styles.container}>
            <DrawerModal visible={isModalVisible} navigation={navigation} onClose={closeModal} />
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Temple Information</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={openModal} style={{ marginLeft: 8 }}>
                        <Octicons name="three-bars" color={'#000'} size={28} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{flex: 1}}>
                {/* Temple About Rich Text Editor */}
                <View style={[styles.cardBox, { marginTop: 10 }]}>
                    <Text style={styles.subHeaderText}>Temple Details</Text>
                    <Text style={[styles.label, (isFocused === 'contentAbout' || contentAbout !== '') && styles.focusedLabel]}>Temple About</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'contentAbout' || contentAbout !== '') && styles.focusedInput]}
                        value={contentAbout}
                        onChangeText={(text) => setContentAbout(text)}
                        onFocus={() => setIsFocused('contentAbout')}
                        onBlur={() => setIsFocused(null)}
                        multiline={true}
                        numberOfLines={4}
                    />
                    <Text style={[styles.label, (isFocused === 'contentHistory' || contentHistory !== '') && styles.focusedLabel]}>Temple About</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'contentHistory' || contentHistory !== '') && styles.focusedInput]}
                        value={contentHistory}
                        onChangeText={(text) => setContentHistory(text)}
                        onFocus={() => setIsFocused('contentHistory')}
                        onBlur={() => setIsFocused(null)}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                {/* Temple History Rich Text Editor */}
                {/* <View style={[styles.cardBox, { marginTop: 10 }]}>
                <Text style={[styles.label, (isFocused === 'contentHistory' || contentHistory !== '') && styles.focusedLabel]}>Temple About</Text>
                <TextInput
                    style={[styles.input, (isFocused === 'contentHistory' || contentHistory !== '') && styles.focusedInput]}
                    value={contentHistory}
                    onChangeText={(text) => setContentHistory(text)}
                    onFocus={() => setIsFocused('contentHistory')}
                    onBlur={() => setIsFocused(null)}
                />
            </View> */}

                {/* Endowment Checkbox */}
                <View style={styles.checkboxContainer}>
                    <CheckBox value={isEndowmentChecked} tintColors={{ true: '#0c81f5', false: '#0c81f5' }} onValueChange={setIsEndowmentChecked} />
                    <Text style={styles.checkboxLabel}>Endowment</Text>
                </View>

                {isEndowmentChecked && (
                    <View style={styles.cardBox}>
                        <Text style={[styles.label, (isFocused === 'endowmentRegNumber' || endowmentRegNumber !== '') && styles.focusedLabel]}>Enter Endowment Register Number</Text>
                        <TextInput
                            style={[styles.input, (isFocused === 'endowmentRegNumber' || endowmentRegNumber !== '') && styles.focusedInput]}
                            value={endowmentRegNumber}
                            onChangeText={setEndowmentRegNumber}
                            onFocus={() => setIsFocused('endowmentRegNumber')}
                            onBlur={() => setIsFocused(null)}
                        />

                        <TouchableOpacity style={styles.filePicker} onPress={selectEndowmentImage}>
                            <TextInput
                                style={styles.filePickerText}
                                editable={false}
                                placeholder={endowmentImage}
                                placeholderTextColor={'#000'}
                            />
                            <View style={styles.chooseBtn}>
                                <Text style={styles.chooseBtnText}>Choose File</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Trust Checkbox */}
                <View style={styles.checkboxContainer}>
                    <CheckBox value={isTrustChecked} tintColors={{ true: '#0c81f5', false: '#0c81f5' }} onValueChange={setIsTrustChecked} />
                    <Text style={styles.checkboxLabel}>Trust</Text>
                </View>

                {isTrustChecked && (
                    <View style={styles.cardBox}>
                        <Text style={[styles.label, (isFocused === 'trustRegNumber' || trustRegNumber != '') && styles.focusedLabel]}>Enter Trust Register Number</Text>
                        <TextInput
                            style={[styles.input, (isFocused === 'trustRegNumber' || trustRegNumber != '') && styles.focusedInput]}
                            value={trustRegNumber}
                            onChangeText={setTrustRegNumber}
                            onFocus={() => setIsFocused('trustRegNumber')}
                            onBlur={() => setIsFocused(null)}
                        />
                        <TouchableOpacity style={styles.filePicker} onPress={selectTrustImage}>
                            <TextInput
                                style={styles.filePickerText}
                                editable={false}
                                placeholder={trustImage}
                                placeholderTextColor={'#000'}
                            />
                            <View style={styles.chooseBtn}>
                                <Text style={styles.chooseBtnText}>Choose File</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Submit Button */}
                <TouchableOpacity onPress={() => props.navigation.navigate('SocialMedia')}>
                    <LinearGradient colors={['#c9170a', '#f0837f']} style={styles.submitButton}>
                        <Text style={styles.submitText}>Submit</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 20,
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
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 10,
        borderRadius: 10
    },
    editorContainer: {
        minHeight: 100, // Set minHeight for the RichEditor container
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 10,
    },
    scrollView: {
        flex: 1,
    },
    richEditor: {
        height: 200,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#333',
    },
    richToolbar: {
        backgroundColor: '#a9aaab',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 20
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
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
    filePicker: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
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
    label: {
        color: '#757473',
        fontSize: 16,
        marginTop: 10
    },
    focusedLabel: {
        color: '#56ab2f',
        fontSize: 16,
        fontWeight: '500'
    },
    input: {
        height: 30,
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
});
