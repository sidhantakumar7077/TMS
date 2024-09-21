import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { launchImageLibrary } from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';

const Index = (props) => {

    const richTextAbout = useRef(); // Reference to Temple About editor
    const richTextHistory = useRef(); // Reference to Temple History editor
    const [contentAbout, setContentAbout] = useState(''); // State for Temple About content
    const [contentHistory, setContentHistory] = useState(''); // State for Temple History content
    const [isEndowmentChecked, setIsEndowmentChecked] = useState(false);
    const [isTrustChecked, setIsTrustChecked] = useState(false);
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

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Temple Information</Text>

            {/* Temple About Rich Text Editor */}
            <Text style={styles.subHeaderText}>Temple About</Text>
            <View style={styles.editorContainer}>
                <ScrollView style={styles.scrollView}>
                    <RichEditor
                        ref={richTextAbout}
                        onChange={setContentAbout}
                        placeholder="Write about the temple..."
                        editorStyle={styles.editor}
                        style={styles.richEditor}
                    />
                </ScrollView>
            </View>
            <RichToolbar
                editor={richTextAbout}
                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.insertOrderedList, actions.insertBulletsList,]}
                style={styles.richToolbar}
            />

            {/* Temple History Rich Text Editor */}
            <Text style={styles.subHeaderText}>Temple History</Text>
            <View style={styles.editorContainer}>
                <ScrollView style={styles.scrollView}>
                    <RichEditor
                        ref={richTextHistory}
                        onChange={setContentHistory}
                        placeholder="Write the history of the temple..."
                        editorStyle={styles.editor}
                        style={styles.richEditor}
                    />
                </ScrollView>
            </View>
            <RichToolbar
                editor={richTextHistory}
                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.insertOrderedList, actions.insertBulletsList,]}
                style={styles.richToolbar}
            />

            {/* Endowment Checkbox */}
            <View style={styles.checkboxContainer}>
                <CheckBox value={isEndowmentChecked} tintColors={{ true: '#0c81f5', false: '#0c81f5' }} onValueChange={setIsEndowmentChecked} />
                <Text style={styles.checkboxLabel}>Endowment</Text>
            </View>

            {isEndowmentChecked && (
                <>
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
                </>
            )}

            {/* Trust Checkbox */}
            <View style={styles.checkboxContainer}>
                <CheckBox value={isTrustChecked} tintColors={{ true: '#0c81f5', false: '#0c81f5' }} onValueChange={setIsTrustChecked} />
                <Text style={styles.checkboxLabel}>Trust</Text>
            </View>

            {isTrustChecked && (
                <>
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
                </>
            )}

            {/* Submit Button */}
            <TouchableOpacity
                onPress={() => props.navigation.navigate('SocialMedia')}
            // onPress={() => console.log({ contentAbout, contentHistory, endowmentRegNumber, trustRegNumber, endowmentImage, trustImage })}
            >
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
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
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
