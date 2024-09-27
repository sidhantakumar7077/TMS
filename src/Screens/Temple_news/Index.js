import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

const Index = (props) => {

    const [notice_name, setNotice_name] = useState('');
    const [notice_date, setNotice_date] = useState(null);
    const [dateOpen, setDateOpen] = useState(false);
    const [notice_desc, setNotice_desc] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Temple News</Text>

            <View style={{ width: '95%', alignSelf: 'center', flex: 1 }}>
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
                    maxLength={10}
                    onChangeText={(text) => setNotice_desc(text)}
                    onFocus={() => setIsFocused('notice_desc')}
                    onBlur={() => setIsFocused(null)}
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity onPress={() => props.navigation.navigate('Mandap_booking')}>
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