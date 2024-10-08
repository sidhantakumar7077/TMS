import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
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

    const [bank_name, setBank_name] = useState('');
    const [ifsc_code, setIfsc_code] = useState('');
    const [account_number, setAccount_number] = useState('');
    const [upi_id, setUpi_id] = useState('');
    const [holder_name, setHolder_name] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    return (
        <ScrollView style={styles.container}>
            <DrawerModal visible={isModalVisible} navigation={navigation} onClose={closeModal} />
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Temple Bank Details</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={openModal} style={{ marginLeft: 8 }}>
                        <Octicons name="three-bars" color={'#000'} size={28} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.cardBox}>
                <View style={{width: '100%', backgroundColor: '#cfd0d1', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, marginBottom: 10}}>
                    <Text style={{ color: '#000', fontWeight: '700', fontSize: 18 }}>Bank Details</Text>
                </View>
                {/* Bank Name Input */}
                <Text style={[styles.label, (isFocused === 'bank_name' || bank_name !== '') && styles.focusedLabel]}>Bank Name</Text>
                <TextInput
                    style={[styles.input, (isFocused === 'bank_name' || bank_name !== '') && styles.focusedInput]}
                    value={bank_name}
                    onChangeText={(text) => setBank_name(text)}
                    onFocus={() => setIsFocused('bank_name')}
                    onBlur={() => setIsFocused(null)}
                />

                {/* IFSC Code Input */}
                <Text style={[styles.label, (isFocused === 'ifsc_code' || ifsc_code !== '') && styles.focusedLabel]}>IFSC Code</Text>
                <TextInput
                    style={[styles.input, (isFocused === 'ifsc_code' || ifsc_code !== '') && styles.focusedInput]}
                    value={ifsc_code}
                    onChangeText={(text) => setIfsc_code(text)}
                    onFocus={() => setIsFocused('ifsc_code')}
                    onBlur={() => setIsFocused(null)}
                />

                {/* Account Number Input */}
                <Text style={[styles.label, (isFocused === 'account_number' || account_number !== '') && styles.focusedLabel]}>Account Number</Text>
                <TextInput
                    style={[styles.input, (isFocused === 'account_number' || account_number !== '') && styles.focusedInput]}
                    value={account_number}
                    maxLength={10}
                    onChangeText={(text) => setAccount_number(text)}
                    onFocus={() => setIsFocused('account_number')}
                    onBlur={() => setIsFocused(null)}
                />

                {/* UPI Id Input */}
                <Text style={[styles.label, (isFocused === 'upi_id' || upi_id !== '') && styles.focusedLabel]}>UPI Id</Text>
                <TextInput
                    style={[styles.input, (isFocused === 'upi_id' || upi_id !== '') && styles.focusedInput]}
                    value={upi_id}
                    onChangeText={(text) => setUpi_id(text)}
                    onFocus={() => setIsFocused('upi_id')}
                    onBlur={() => setIsFocused(null)}
                />

                {/* Account Holder Name Input */}
                <Text style={[styles.label, (isFocused === 'holder_name' || holder_name !== '') && styles.focusedLabel]}>Account Holder Name</Text>
                <TextInput
                    style={[styles.input, (isFocused === 'holder_name' || holder_name !== '') && styles.focusedInput]}
                    value={holder_name}
                    onChangeText={(text) => setHolder_name(text)}
                    onFocus={() => setIsFocused('holder_name')}
                    onBlur={() => setIsFocused(null)}
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity onPress={() => props.navigation.navigate('Management')}>
                <LinearGradient colors={['#c9170a', '#f0837f']} style={styles.submitButton}>
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
})