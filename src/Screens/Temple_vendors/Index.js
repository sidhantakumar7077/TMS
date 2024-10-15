import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker';
import DrawerModal from '../../Component/DrawerModal';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';

const Index = (props) => {

    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => { setModalVisible(true) };
    const closeModal = () => { setModalVisible(false) };

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [vendor_category, setVendor_category] = useState('');
    const [gst_number, setGst_number] = useState('');
    const [upi_id, setUpi_id] = useState('');
    const [vendor_address, setVendor_address] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    const [paymentType, setPaymentType] = useState(null);
    const [paymentTypeOpen, setPaymentTypeOpen] = useState(false);
    const [paymentTypes, setPaymentTypes] = useState([
        { label: 'UPI', value: 'upi' },
        { label: 'Bank', value: 'bank' },
        { label: 'Cash', value: 'cash' },
    ]);

    return (
        <View style={styles.container}>
            <DrawerModal visible={isModalVisible} navigation={navigation} onClose={closeModal} />
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Temple Vendors</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={openModal} style={{ marginLeft: 8 }}>
                        <Octicons name="three-bars" color={'#000'} size={28} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.topBanner}>
                    <Image
                        style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, }}
                        source={{ uri: 'https://images.fineartamerica.com/images/artworkimages/medium/3/jagannath-temple-in-puri-heritage.jpg' }}
                    />
                </View>
                <View style={styles.cardBox}>
                    {/* Vendor Name Input */}
                    <Text style={[styles.label, (isFocused === 'name' || name !== '') && styles.focusedLabel, { marginTop: 18 }]}>Name</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'name' || name !== '') && styles.focusedInput]}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        onFocus={() => setIsFocused('name')}
                        onBlur={() => setIsFocused(null)}
                    />

                    {/* Phone Number Input */}
                    <Text style={[styles.label, (isFocused === 'phone' || phone !== '') && styles.focusedLabel, { marginTop: 18 }]}>Phone Number</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'phone' || phone !== '') && styles.focusedInput]}
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                        onFocus={() => setIsFocused('phone')}
                        onBlur={() => setIsFocused(null)}
                        keyboardType='number-pad'
                        maxLength={10}
                    />

                    {/* Vendor Email Input */}
                    <Text style={[styles.label, (isFocused === 'email' || email !== '') && styles.focusedLabel, { marginTop: 18 }]}>Email</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'email' || email !== '') && styles.focusedInput]}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        onFocus={() => setIsFocused('email')}
                        onBlur={() => setIsFocused(null)}
                        keyboardType='email-address'
                    />

                    {/* vendor category Input */}
                    <Text style={[styles.label, (isFocused === 'vendor_category' || vendor_category !== '') && styles.focusedLabel, { marginTop: 18 }]}>Vendor Category</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'vendor_category' || vendor_category !== '') && styles.focusedInput]}
                        value={vendor_category}
                        onChangeText={(text) => setVendor_category(text)}
                        onFocus={() => setIsFocused('vendor_category')}
                        onBlur={() => setIsFocused(null)}
                    />

                    {/* Payment Type Dropdown */}
                    <Text style={[styles.label, { marginTop: -7 }, paymentType && styles.focusedLabel]}>Payment Type</Text>
                    <DropDownPicker
                        open={paymentTypeOpen}
                        value={paymentType}
                        items={paymentTypes}
                        setOpen={setPaymentTypeOpen}
                        setValue={setPaymentType}
                        setItems={setPaymentTypes}
                        placeholder="Select Payment Type"
                        style={[
                            styles.input,
                            styles.dropdown,
                            {
                                borderBottomColor: paymentTypeOpen ? '#56ab2f' : '#757473',
                                height: paymentTypeOpen ? 50 : 25,
                                backgroundColor: '#f4f4f4',
                                paddingHorizontal: 10,
                                width: '103%',
                                alignSelf: 'center'
                            }
                        ]}
                        textStyle={{
                            color: paymentType ? '#000' : '#757473',
                            fontSize: 16,
                        }}
                        dropDownContainerStyle={[styles.dropdownContainer, {
                            borderBottomColor: '#56ab2f',
                        }]}
                        placeholderStyle={{ color: '#757473', fontSize: 13 }}
                        zIndex={3000}
                        zIndexInverse={1000}
                    />

                    {/* GST Number Input */}
                    <Text style={[styles.label, (isFocused === 'gst_number' || gst_number !== '') && styles.focusedLabel, { marginTop: 18 }]}>GST Number</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'gst_number' || gst_number !== '') && styles.focusedInput]}
                        value={gst_number}
                        onChangeText={(text) => setGst_number(text)}
                        onFocus={() => setIsFocused('gst_number')}
                        onBlur={() => setIsFocused(null)}
                    />

                    {/* UPI Number/ID Input */}
                    <Text style={[styles.label, (isFocused === 'upi_id' || upi_id !== '') && styles.focusedLabel, { marginTop: 18 }]}>UPI Number/ID</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'upi_id' || upi_id !== '') && styles.focusedInput]}
                        value={upi_id}
                        onChangeText={(text) => setUpi_id(text)}
                        onFocus={() => setIsFocused('upi_id')}
                        onBlur={() => setIsFocused(null)}
                    />

                    {/* vendor Address Input */}
                    <Text style={[styles.label, (isFocused === 'vendor_address' || vendor_address !== '') && styles.focusedLabel, { marginTop: 18 }]}>Vendor Address</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'vendor_address' || vendor_address !== '') && styles.focusedInput]}
                        value={vendor_address}
                        onChangeText={(text) => setVendor_address(text)}
                        onFocus={() => setIsFocused('vendor_address')}
                        onBlur={() => setIsFocused(null)}
                    />

                </View>
                {/* Submit Button */}
                <TouchableOpacity onPress={() => props.navigation.navigate('Temple_devotees')}>
                    <LinearGradient
                        colors={['#c9170a', '#f0837f']}
                        style={styles.submitButton}
                    >
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
    dropdown: {
        borderWidth: 0,
        borderBottomWidth: 0.7,
        borderColor: '#757473',
        paddingHorizontal: 0,
        marginBottom: 30,
    },
    dropdownContainer: {
        borderWidth: 0.7,
        borderColor: '#757473',
        paddingHorizontal: 0,
        width: '102.5%',
        alignSelf: 'center'
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
    }
})