import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerModal from '../../Component/DrawerModal';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { base_url } from '../../../App';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const Index = (props) => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => { setModalVisible(true) };
    const closeModal = () => { setModalVisible(false) };
    const [mandapList, setMandapList] = useState([]);

    const fetchMandapList = async () => {
        var access_token = await AsyncStorage.getItem('storeAccesstoken');
        try {
            const response = await axios.get(`${base_url}/api/mandaps`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            });
            if (response.status === 200) {
                console.log("mandap list", response.data.data);
                setMandapList(response.data.data);
            } else {
                Toast.show('Failed to fetch mandap list', Toast.LONG);
            }
        } catch (error) {
            Toast.show('Failed to fetch mandap list', Toast.LONG);
        }
    }

    const [isMandapDeleteModal, setIsMandapDeleteModal] = useState(false);
    const openMandapDeleteModal = () => { setIsMandapDeleteModal(true) };
    const closeMandapDeleteModal = () => { setIsMandapDeleteModal(false) };
    const [selectedMandapId, setSelectedMandapId] = useState(null);

    const showMandapDeleteModal = (id) => {
        setSelectedMandapId(id);
        openMandapDeleteModal();
    }

    const deleteMandap = async (id) => {
        var access_token = await AsyncStorage.getItem('storeAccesstoken');
        try {
            const response = await axios.delete(`${base_url}/api/mandaps/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            });
            if (response.status === 200) {
                Toast.show("Mandap deleted successfully", Toast.LONG);
                closeMandapDeleteModal();
                fetchMandapList();
            } else {
                Toast.show('Failed to delete mandap', Toast.LONG);
            }
        } catch (error) {
            Toast.show('Failed to delete mandap', Toast.LONG);
        }
    }

    useEffect(() => {
        if (isFocused) {
            fetchMandapList();
        };
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <DrawerModal visible={isModalVisible} navigation={navigation} onClose={closeModal} />
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Temple Mandap</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={openModal} style={{ marginLeft: 8 }}>
                        <Octicons name="three-bars" color={'#000'} size={28} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: 10 }}>
                <View style={styles.addMandap}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('AddMandap')} style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                        <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome6 name="plus" color={'#ffcb44'} size={22} />
                            <Text style={{ color: '#ffcb44', fontSize: 16, fontWeight: '500', marginLeft: 10 }}> Add a new mandap</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ backgroundColor: '#7a7979', height: 0.4, width: 100, alignSelf: 'center', marginVertical: 10 }}></View>
                    <Text style={{ color: '#7a7979', fontSize: 14, fontWeight: '500', letterSpacing: 2 }}>SAVED MANDAP</Text>
                    <View style={{ backgroundColor: '#7a7979', height: 0.4, width: 100, alignSelf: 'center', marginVertical: 10 }}></View>
                </View>
                <View style={{ flex: 1 }}>
                    {mandapList.length > 0 ?
                        <FlatList
                            data={mandapList}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <View onPress={() => props.navigation.navigate('ViewMandap')} style={styles.mandapBox}>
                                    <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d9d5d2', borderRadius: 50, height: 55 }}>
                                        <MaterialIcons name="museum" color={'#000'} size={30} />
                                    </View>
                                    <View style={{ width: '5%' }}></View>
                                    <View style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16, fontWeight: '700', color: '#545353', letterSpacing: 0.6 }}>{item.mandap_name}</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>{item.mandap_description}</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>₹{item.price_per_day}</Text>
                                    </View>
                                    <View style={{ width: '10%', alignItems: 'flex-end', paddingRight: 5, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('EditMandap', item)} style={{ backgroundColor: '#fff' }}>
                                            <MaterialCommunityIcons name="circle-edit-outline" color={'#ffcb44'} size={25} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => showMandapDeleteModal(item.id)} style={{ backgroundColor: '#fff' }}>
                                            <MaterialCommunityIcons name="delete-circle-outline" color={'#ffcb44'} size={26} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        /> : <Text style={{ textAlign: 'center', top: 200, color: '#000', fontSize: 18 }}>No Mandap available!</Text>
                    }
                </View>
            </ScrollView>
            <View style={{ padding: 0, height: 58, borderRadius: 0, backgroundColor: '#fff', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', margin: 0 }}>
                    <View style={{ padding: 0, width: '25%' }}>
                        <View activeOpacity={0.6} underlayColor="#DDDDDD" style={{ backgroundColor: '#fff', padding: 10, flexDirection: 'column', alignItems: 'center' }}>
                            <View style={{ alignItems: 'center' }}>
                                <Octicons name="home" color={'#dc3545'} size={21} />
                                <Text style={{ color: '#dc3545', fontSize: 11, fontWeight: '500', marginTop: 4, height: 17 }}>Home</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 0, width: '25%' }}>
                        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{ backgroundColor: '#fff', padding: 10, flexDirection: 'column', alignItems: 'center' }}>
                            <View style={{ alignItems: 'center' }}>
                                <MaterialCommunityIcons name="finance" color={'#000'} size={23} />
                                <Text style={{ color: '#000', fontSize: 11, fontWeight: '500', marginTop: 4, height: 17 }}>Finance</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{ padding: 0, width: '25%' }}>
                        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{ backgroundColor: '#fff', padding: 10, flexDirection: 'column', alignItems: 'center' }}>
                            <View style={{ alignItems: 'center' }}>
                                <MaterialIcons name="work-history" color={'#000'} size={22} />
                                <Text style={{ color: '#000', fontSize: 11, fontWeight: '500', marginTop: 4, height: 17 }}>Booking</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{ padding: 0, width: '25%' }}>
                        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{ backgroundColor: '#fff', padding: 10, flexDirection: 'column', alignItems: 'center' }}>
                            <View style={{ alignItems: 'center', marginTop: 3 }}>
                                <Fontisto name="date" color={'#000'} size={20} />
                                <Text style={{ color: '#000', fontSize: 11, fontWeight: '500', marginTop: 4, height: 17 }}>Panji</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>

            {/* Start Delete Area Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isMandapDeleteModal}
                onRequestClose={closeMandapDeleteModal}
            >
                <View style={styles.deleteModalOverlay}>
                    <View style={styles.deleteModalContainer}>
                        <View style={{ width: '90%', alignSelf: 'center', marginBottom: 10 }}>
                            <View style={{ alignItems: 'center' }}>
                                <MaterialIcons name="report-gmailerrorred" size={100} color="red" />
                                <Text style={{ color: '#000', fontSize: 23, fontWeight: 'bold', textAlign: 'center', letterSpacing: 0.3 }}>Are You Sure To Delete This Mandap?</Text>
                                <Text style={{ color: 'gray', fontSize: 17, fontWeight: '500', marginTop: 4 }}>You won't be able to revert this!</Text>
                            </View>
                        </View>
                        <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10 }}>
                            <TouchableOpacity onPress={closeMandapDeleteModal} style={styles.cancelDeleteBtn}>
                                <Text style={styles.btnText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteMandap(selectedMandapId)} style={styles.confirmDeleteBtn}>
                                <Text style={styles.btnText}>Yes, delete it!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* End Delete Area Modal */}
        </View>
    )
}

export default Index;

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
    addMandap: {
        backgroundColor: '#fff',
        marginTop: 15,
        width: '95%',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 13,
        elevation: 5,
    },
    mandapBox: {
        width: '95%',
        alignSelf: 'center',
        padding: 12,
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 13,
        elevation: 5,
    },
    deleteModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteModalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 15, // Slightly more rounded corners
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 }, // More pronounced shadow
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
        padding: 20,
    },
    cancelDeleteBtn: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 7
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },
    confirmDeleteBtn: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 7
    },
});
