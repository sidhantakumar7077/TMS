import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';
import { base_url } from '../../../App';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const EditNews = (props) => {

    const navigation = useNavigation();
    const [notice_name, setNotice_name] = useState('');
    const [notice_date, setNotice_date] = useState(null);
    const [dateOpen, setDateOpen] = useState(false);
    const [notice_desc, setNotice_desc] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    useEffect(() => {
        // console.log("object", props.route.params);
        setNotice_name(props.route.params.notice_name);
        setNotice_date(new Date(props.route.params.notice_date));
        setNotice_desc(props.route.params.notice_descp);
    }, [])

    const showErrorToast = (message) => {
        Toast.show(message, Toast.LONG);
    };

    const submitNews = async () => {
        var access_token = await AsyncStorage.getItem('storeAccesstoken');
        if (notice_name === '' || notice_date === null) {
            showErrorToast('All fields are required');
            return;
        }

        try {
            const response = await axios.put(`${base_url}/api/news/${props.route.params.id}`,
                {
                    notice_name: notice_name,
                    notice_date: moment(notice_date).format("YYYY-MM-DD"),
                    notice_descp: notice_desc
                },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        'Content-Type': 'application/json'
                    }
                });
            if (response.status === 200) {
                Toast.show("News updated successfully", Toast.LONG);
                navigation.goBack();
            } else {
                showErrorToast('Failed to update news');
            }
        } catch (error) {
            showErrorToast('Failed to update news');
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Edit News</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.topBanner}>
                <Image style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, }} source={{ uri: 'https://images.fineartamerica.com/images/artworkimages/medium/3/jagannath-temple-in-puri-heritage.jpg' }} />
            </View>

            <View style={styles.cardBox}>
                {/* Festival Name Input */}
                <Text style={[styles.label, (isFocused === 'notice_name' || notice_name !== '') && styles.focusedLabel]}>Notice Name</Text>
                <TextInput
                    style={[styles.input, (isFocused === 'notice_name' || notice_name !== '') && styles.focusedInput]}
                    value={notice_name}
                    onChangeText={(text) => setNotice_name(text)}
                    onFocus={() => setIsFocused('notice_name')}
                    onBlur={() => setIsFocused(null)}
                />

                {/* Fastival Date */}
                <Text style={[styles.label, (notice_date !== null) && styles.focusedLabel]}>Notice Date</Text>
                <TouchableOpacity onPress={() => setDateOpen(true)} style={[styles.datePickerStyle, (notice_date !== null) && { marginTop: 14 }]}>
                    <Text style={{ color: '#000', width: '90%' }}>{notice_date ? moment(notice_date).format("DD/MM/YYYY") : null}</Text>
                    <Fontisto name="date" size={notice_date !== null ? 22 : 19} color={notice_date !== null ? '#56ab2f' : "#161c19"} />
                </TouchableOpacity>
                <View style={{ backgroundColor: notice_date !== null ? '#56ab2f' : '#757473', width: '100%', height: notice_date !== null ? 2 : 0.7, marginBottom: 30 }} />
                <View>
                    <DatePicker
                        modal
                        mode="date"
                        open={dateOpen}
                        date={notice_date || new Date()}
                        onConfirm={(data) => {
                            setDateOpen(false)
                            setNotice_date(data)
                        }}
                        onCancel={() => {
                            setDateOpen(false);
                        }}
                    />
                </View>

                {/* Festival Description Input */}
                <Text style={[styles.label, (isFocused === 'notice_desc' || notice_desc !== '') && styles.focusedLabel]}>Notice Description</Text>
                <TextInput
                    style={[styles.input, (isFocused === 'notice_desc' || notice_desc !== '') && styles.focusedInput]}
                    value={notice_desc}
                    onChangeText={(text) => setNotice_desc(text)}
                    onFocus={() => setIsFocused('notice_desc')}
                    onBlur={() => setIsFocused(null)}
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity onPress={submitNews}>
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

export default EditNews

const styles = StyleSheet.create({
    container: {
        flex: 1,
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