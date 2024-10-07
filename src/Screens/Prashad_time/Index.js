import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import DrawerModal from '../../Component/DrawerModal';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';

const Index = (props) => {

    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => { setModalVisible(true) };
    const closeModal = () => { setModalVisible(false) };

    const [isFocused, setIsFocused] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [openStartPicker, setOpenStartPicker] = useState(false);
    const [openEndPicker, setOpenEndPicker] = useState(false);
    const [timeError, setTimeError] = useState(null);
    const [isOnlineOrderAvailable, setIsOnlineOrderAvailable] = useState(false);
    const [isTempleProvidePreOrder, setIsTempleProvidePreOrder] = useState(false);
    const [isTempleProvideOfflineOrder, setIsTempleProvideOfflineOrder] = useState(false);
    const [prasads, setPrasads] = useState([{ name: '', price: '' }]);

    const validateEndTime = (selectedEndTime) => {
        if (startTime && selectedEndTime <= startTime) {
            setTimeError('End time must be greater than start time');
            setEndTime(null);
        } else {
            setTimeError(null);
            setEndTime(selectedEndTime);
        }
    };

    const addPrasad = () => {
        setPrasads([...prasads, { name: '', price: '' }]);
    };

    const removePrasad = (index) => {
        const updatedPrasads = prasads.filter((_, i) => i !== index);
        setPrasads(updatedPrasads);
    };

    const updatePrasad = (index, key, value) => {
        const updatedPrasads = [...prasads];
        updatedPrasads[index][key] = value;
        setPrasads(updatedPrasads);
    };

    return (
        <ScrollView style={styles.container}>
            <DrawerModal visible={isModalVisible} navigation={navigation} onClose={closeModal} />
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Temple Prashad</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={openModal} style={{ marginLeft: 8 }}>
                        <Octicons name="three-bars" color={'#000'} size={28} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.cardBox}>
                <Text style={[styles.label, startTime && styles.focusedLabel]}>Prasad Start Time</Text>
                <TouchableOpacity onPress={() => setOpenStartPicker(true)}>
                    <TextInput
                        style={[styles.input, startTime && styles.focusedInput]}
                        value={
                            startTime
                                ? startTime.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                })
                                : ''
                        }
                        placeholder="Select Start Time"
                        placeholderTextColor={'#7d7b7a'}
                        editable={false}
                    />
                </TouchableOpacity>

                <Text style={[styles.label, endTime && styles.focusedLabel]}>Prasad End Time</Text>
                <TouchableOpacity onPress={() => setOpenEndPicker(true)}>
                    <TextInput
                        style={[styles.input, endTime && styles.focusedInput, timeError && { borderBottomColor: 'red' }]}
                        value={
                            endTime
                                ? endTime.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                })
                                : ''
                        }
                        placeholder="Select End Time"
                        placeholderTextColor={'#7d7b7a'}
                        editable={false}
                    />
                </TouchableOpacity>
                {timeError && <Text style={styles.errorText}>{timeError}</Text>}
            </View>

            <DatePicker
                modal
                mode="time"
                open={openStartPicker}
                date={startTime || new Date()}
                onConfirm={(time) => {
                    setOpenStartPicker(false);
                    setStartTime(time);
                }}
                onCancel={() => setOpenStartPicker(false)}
            />

            <DatePicker
                modal
                mode="time"
                open={openEndPicker}
                date={endTime || new Date()}
                onConfirm={(time) => {
                    setOpenEndPicker(false);
                    validateEndTime(time);
                }}
                onCancel={() => setOpenEndPicker(false)}
            />

            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setIsOnlineOrderAvailable(!isOnlineOrderAvailable)}
                >
                    <View style={isOnlineOrderAvailable ? styles.checked : styles.unchecked} />
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Do your Temple Provide Online Order</Text>
            </View>

            {isOnlineOrderAvailable && prasads.map((prasad, index) => (
                <View key={index}>
                    <View style={styles.cardBox}>
                        <Text style={[styles.label, prasad.name && styles.focusedLabel]}>Prasad Name</Text>
                        <TextInput
                            style={[styles.input, prasad.name && styles.focusedInput]}
                            placeholder="Enter Prasad Name"
                            placeholderTextColor={'#7d7b7a'}
                            value={prasad.name}
                            onChangeText={(text) => updatePrasad(index, 'name', text)}
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.label, prasad.price && styles.focusedLabel]}>Prasad Price</Text>
                                <TextInput
                                    style={[styles.input, prasad.price && styles.focusedInput]}
                                    placeholder="Enter Prasad Price"
                                    placeholderTextColor={'#7d7b7a'}
                                    value={prasad.price}
                                    onChangeText={(text) => updatePrasad(index, 'price', text)}
                                    keyboardType="numeric"
                                />
                            </View>

                            {index === prasads.length - 1 && (
                                <TouchableOpacity onPress={addPrasad} style={styles.iconButton}>
                                    <Entypo name="squared-plus" size={28} color="#56ab2f" />
                                </TouchableOpacity>
                            )}

                            {index > 0 && (
                                <TouchableOpacity onPress={() => removePrasad(index)} style={styles.iconButton}>
                                    <Ionicons name="remove-circle" size={28} color="#d11a1a" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            ))}

            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setIsTempleProvidePreOrder(!isTempleProvidePreOrder)}
                >
                    <View style={isTempleProvidePreOrder ? styles.checked : styles.unchecked} />
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Do your Temple Provide Pre Order</Text>
            </View>

            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setIsTempleProvideOfflineOrder(!isTempleProvideOfflineOrder)}
                >
                    <View style={isTempleProvideOfflineOrder ? styles.checked : styles.unchecked} />
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Do your Temple Provide Online Order</Text>
            </View>

            <TouchableOpacity onPress={() => { props.navigation.navigate('Darshan_time') }}>
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
        marginTop: 15,
    },
    focusedLabel: {
        color: '#56ab2f',
        fontWeight: '500',
    },
    input: {
        height: 50,
        borderBottomWidth: 0.7,
        borderBottomColor: '#757473',
        marginBottom: 10,
        color: '#000',
        paddingHorizontal: 10,
    },
    focusedInput: {
        borderBottomColor: '#56ab2f',
        borderBottomWidth: 2,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: -5,
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginLeft: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#757473',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unchecked: {
        width: 14,
        height: 14,
    },
    checked: {
        width: 14,
        height: 14,
        backgroundColor: '#56ab2f',
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#757473',
    },
    iconButton: {
        paddingHorizontal: 5,
        marginLeft: 10,
    },
    submitButton: {
        width: '90%',
        alignSelf: 'center',
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    submitText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
});
