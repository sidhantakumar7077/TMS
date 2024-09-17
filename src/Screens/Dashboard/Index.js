import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { launchImageLibrary } from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';

const Index = () => {
    const richTextAbout = useRef(); // Reference to Temple About editor
    const richTextHistory = useRef(); // Reference to Temple History editor
    const [contentAbout, setContentAbout] = useState(''); // State for Temple About content
    const [contentHistory, setContentHistory] = useState(''); // State for Temple History content
    const [isEndowmentChecked, setIsEndowmentChecked] = useState(false);
    const [isTrustChecked, setIsTrustChecked] = useState(false);
    const [endowmentRegNumber, setEndowmentRegNumber] = useState('');
    const [trustRegNumber, setTrustRegNumber] = useState('');
    const [endowmentDoc, setEndowmentDoc] = useState(null);
    const [trustDoc, setTrustDoc] = useState(null);

    // Handle document upload using react-native-image-picker
    const pickDocument = async (setDocument) => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'mixed', // Allows both images and documents
                includeBase64: false, // You can include this if you need base64 data
            });

            if (result.didCancel) {
                console.log('User canceled the picker');
            } else if (result.errorCode) {
                console.log('Error picking document: ', result.errorMessage);
            } else {
                const file = result.assets[0];
                setDocument(file);
            }
        } catch (err) {
            console.log('Unknown error:', err);
        }
    };

    return (
        <View style={styles.container}>
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
                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, actions.insertBulletsList]}
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
                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, actions.insertBulletsList]}
                style={styles.richToolbar}
            />

            {/* Endowment Checkbox */}
            <View style={styles.checkboxContainer}>
                <CheckBox value={isEndowmentChecked} onValueChange={setIsEndowmentChecked} />
                <Text style={styles.checkboxLabel}>Endowment</Text>
            </View>

            {isEndowmentChecked && (
                <>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter Endowment Register Number"
                        value={endowmentRegNumber}
                        onChangeText={setEndowmentRegNumber}
                    />
                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={() => pickDocument(setEndowmentDoc)}
                    >
                        <Text style={styles.uploadButtonText}>
                            {endowmentDoc ? endowmentDoc.fileName : 'Upload Endowment Document'}
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            {/* Trust Checkbox */}
            <View style={styles.checkboxContainer}>
                <CheckBox value={isTrustChecked} onValueChange={setIsTrustChecked} />
                <Text style={styles.checkboxLabel}>Trust</Text>
            </View>

            {isTrustChecked && (
                <>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter Trust Register Number"
                        value={trustRegNumber}
                        onChangeText={setTrustRegNumber}
                    />
                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={() => pickDocument(setTrustDoc)}
                    >
                        <Text style={styles.uploadButtonText}>
                            {trustDoc ? trustDoc.fileName : 'Upload Trust Document'}
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            {/* Submit Button */}
            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => console.log({ contentAbout, contentHistory, endowmentRegNumber, trustRegNumber, endowmentDoc, trustDoc })}
            >
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
        flex: 1,
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
        backgroundColor: '#007bff',
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
    inputField: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 15,
        fontSize: 16,
        paddingVertical: 5,
    },
    uploadButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#ff6347',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    submitText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
