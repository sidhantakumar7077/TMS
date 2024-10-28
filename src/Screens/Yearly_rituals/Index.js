import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { base_url } from '../../../App';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const Index = (props) => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [ritualList, setRitualList] = useState([]);

    const fetchYearlyRitualList = async () => {
        var access_token = await AsyncStorage.getItem('storeAccesstoken');
        try {
            const response = await axios.get(`${base_url}/api/manage-special-rituals`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            });
            if (response.status === 200) {
                setRitualList(response.data.data);
            } else {
                Toast.show('Failed to fetch vendors list', Toast.LONG);
            }
        } catch (error) {
            Toast.show('Failed to fetch vendors list', Toast.LONG);
        }
    };

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const openDeleteModal = () => setDeleteModalVisible(true);
    const closeDeleteModal = () => setDeleteModalVisible(false);
    const [selectedRitualId, setSelectedRitualId] = useState('');

    const showRitualDeleteModal = (id) => {
        setSelectedRitualId(id);
        openDeleteModal();
    };

    const deleteRitual = async () => {
        var access_token = await AsyncStorage.getItem('storeAccesstoken');
        try {
            const response = await axios.delete(`${base_url}/api/delet-special-rituals/${selectedRitualId}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            });
            if (response.status === 200) {
                Toast.show('Ritual deleted successfully', Toast.LONG);
                closeDeleteModal();
                fetchYearlyRitualList();
            } else {
                Toast.show('Failed to delete the ritual', Toast.LONG);
            }
        } catch (error) {
            Toast.show('Failed to delete the ritual', Toast.LONG);
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchYearlyRitualList();
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: 10 }}>
                <View style={styles.addRitual}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddRitual')} style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                        <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome6 name="plus" color={'#ffcb44'} size={22} />
                            <Text style={{ color: '#ffcb44', fontSize: 16, fontWeight: '500', marginLeft: 10 }}> Add a new Ritual</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ backgroundColor: '#7a7979', height: 0.4, width: 90, alignSelf: 'center', marginVertical: 10 }}></View>
                    <Text style={{ color: '#7a7979', fontSize: 14, fontWeight: '500', letterSpacing: 2 }}>SAVED RITUALS</Text>
                    <View style={{ backgroundColor: '#7a7979', height: 0.4, width: 90, alignSelf: 'center', marginVertical: 10 }}></View>
                </View>
                <View style={{ flex: 1 }}>
                    {ritualList?.length > 0 ?
                        <FlatList
                            data={ritualList}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => navigation.navigate('ViewRitual', item)} style={styles.ritualBox}>
                                    <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d9d5d2', borderRadius: 50, height: 55 }}>
                                        <Entypo name="user" color={'#000'} size={30} />
                                    </View>
                                    <View style={{ width: '5%' }}></View>
                                    <View style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16, fontWeight: '700', color: '#545353', letterSpacing: 0.6 }}>{item?.spcl_ritual_name}</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>{item?.spcl_ritual_date} {item?.spcl_ritual_time}</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>{item?.description}</Text>
                                    </View>
                                    <View style={{ width: '10%', alignItems: 'flex-end', paddingRight: 5, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('EditRitual', item)} style={{ backgroundColor: '#fff' }}>
                                            <MaterialCommunityIcons name="circle-edit-outline" color={'#ffcb44'} size={25} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => showRitualDeleteModal(item.id)} style={{ backgroundColor: '#fff' }}>
                                            <MaterialCommunityIcons name="delete-circle-outline" color={'#ffcb44'} size={26} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                        : <Text style={{ textAlign: 'center', top: 200, color: '#000', fontSize: 18 }}>No Rituals available!</Text>
                    }
                </View>
            </ScrollView>

            {/* Start Delete Area Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={closeDeleteModal}
            >
                <View style={styles.deleteModalOverlay}>
                    <View style={styles.deleteModalContainer}>
                        <View style={{ width: '90%', alignSelf: 'center', marginBottom: 10 }}>
                            <View style={{ alignItems: 'center' }}>
                                <MaterialIcons name="report-gmailerrorred" size={100} color="red" />
                                <Text style={{ color: '#000', fontSize: 23, fontWeight: 'bold', textAlign: 'center', letterSpacing: 0.3 }}>Are You Sure To Delete This Ritual?</Text>
                                <Text style={{ color: 'gray', fontSize: 17, fontWeight: '500', marginTop: 4 }}>You won't be able to revert this!</Text>
                            </View>
                        </View>
                        <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10 }}>
                            <TouchableOpacity onPress={closeDeleteModal} style={styles.cancelDeleteBtn}>
                                <Text style={styles.btnText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteRitual(selectedRitualId)} style={styles.confirmDeleteBtn}>
                                <Text style={styles.btnText}>Yes, delete it!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* End Delete Area Modal */}
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    addRitual: {
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
    ritualBox: {
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
