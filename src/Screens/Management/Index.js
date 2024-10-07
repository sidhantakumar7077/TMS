import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import DrawerModal from '../../Component/DrawerModal';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';

const Index = (props) => {

    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => { setModalVisible(true) };
    const closeModal = () => { setModalVisible(false) };

    const [member_name, setMember_name] = useState('');
    const [contact_number, setContact_number] = useState('');
    const [about, setAbout] = useState('');
    const [designation, setDesignation] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    const [member_photoSource, setMember_photoSource] = useState(null);
    const [member_photo, setMember_photo] = useState('Upload Photo');
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
                setMember_photoSource(source);
                setMember_photo(response.assets[0].fileName);
                // console.log("selected image-=-=", response.assets[0])
            }
        });
    };

    return (
        <ScrollView style={styles.container}>
            <DrawerModal visible={isModalVisible} navigation={navigation} onClose={closeModal} />
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Temple Trust</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={openModal} style={{ marginLeft: 8 }}>
                        <Octicons name="three-bars" color={'#000'} size={28} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.cardBox}>
                {/* Upload Member Photo */}
                <Text style={[styles.label, (member_photo !== 'Upload Photo') && styles.focusedLabel]}>Member Photo</Text>
                <TouchableOpacity style={[styles.filePicker, { marginTop: 10 }]} onPress={selectTrustImage}>
                    <TextInput
                        style={styles.filePickerText}
                        editable={false}
                        placeholder={member_photo}
                        placeholderTextColor={'#000'}
                    />
                    <View style={styles.chooseBtn}>
                        <Text style={styles.chooseBtnText}>Choose File</Text>
                    </View>
                </TouchableOpacity>

                {/* Member Name Input */}
                <Text style={[styles.label, (isFocused === 'member_name' || member_name !== '') && styles.focusedLabel]}>Member Name</Text>
                <TextInput
                    style={[styles.input, (isFocused === 'member_name' || member_name !== '') && styles.focusedInput]}
                    value={member_name}
                    onChangeText={(text) => setMember_name(text)}
                    onFocus={() => setIsFocused('member_name')}
                    onBlur={() => setIsFocused(null)}
                />

                {/* Contact Number Input */}
                <Text style={[styles.label, (isFocused === 'contact_number' || contact_number !== '') && styles.focusedLabel]}>Contact Number</Text>
                <TextInput
                    style={[styles.input, (isFocused === 'contact_number' || contact_number !== '') && styles.focusedInput]}
                    value={contact_number}
                    onChangeText={(text) => setContact_number(text)}
                    onFocus={() => setIsFocused('contact_number')}
                    onBlur={() => setIsFocused(null)}
                />

                {/* About Input */}
                <Text style={[styles.label, (isFocused === 'about' || about !== '') && styles.focusedLabel]}>About</Text>
                <TextInput
                    style={[styles.input, (isFocused === 'about' || about !== '') && styles.focusedInput]}
                    value={about}
                    maxLength={10}
                    onChangeText={(text) => setAbout(text)}
                    onFocus={() => setIsFocused('about')}
                    onBlur={() => setIsFocused(null)}
                />

                {/* Designation Input */}
                <Text style={[styles.label, (isFocused === 'designation' || designation !== '') && styles.focusedLabel]}>Designation</Text>
                <TextInput
                    style={[styles.input, (isFocused === 'designation' || designation !== '') && styles.focusedInput]}
                    value={designation}
                    onChangeText={(text) => setDesignation(text)}
                    onFocus={() => setIsFocused('designation')}
                    onBlur={() => setIsFocused(null)}
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity onPress={() => props.navigation.navigate('Temple_festival')}>
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
})