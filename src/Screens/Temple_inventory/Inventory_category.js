import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { base_url } from '../../../App';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const Inventory_category = (props) => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [inventory_categoryList, setInventory_categoryList] = useState([]);

    const fetchInventory_categoryList = async () => {
        var access_token = await AsyncStorage.getItem('storeAccesstoken');
        try {
            const response = await axios.get(`${base_url}/api/manage-inventory-category`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            });
            if (response.status === 200) {
                setInventory_categoryList(response.data.data);
                // console.log("Category List", response.data.data);
            } else {
                Toast.show('Failed to fetch inventory category list', Toast.LONG);
            }
        } catch (error) {
            Toast.show('Failed to fetch inventory category list', Toast.LONG);
        }
    };

    const [isInventory_categoryDeleteModal, setIsInventory_categoryDeleteModal] = useState(false);
    const openInventory_categoryDeleteModal = () => { setIsInventory_categoryDeleteModal(true) };
    const closeInventory_categoryDeleteModal = () => { setIsInventory_categoryDeleteModal(false) };
    const [selectedInventory_categoryId, setSelectedInventory_categoryId] = useState(null);

    const showInventoryCategoryDeleteModal = (id) => {
        setSelectedInventory_categoryId(id);
        openInventory_categoryDeleteModal();
    };

    const deleteInventory_category = async (id) => {
        var access_token = await AsyncStorage.getItem('storeAccesstoken');
        try {
            const response = await axios.delete(`${base_url}/api/delete-inventory-category/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            });
            if (response.status === 200) {
                fetchInventory_categoryList();
                closeInventory_categoryDeleteModal();
            } else {
                Toast.show('Failed to delete inventory category', Toast.LONG);
            }
        } catch (error) {
            Toast.show('Failed to delete inventory category', Toast.LONG);
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchInventory_categoryList();
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Inventory Category</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: 10 }}>
                <View style={styles.addCategory}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('AddInventory_category')} style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                        <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome6 name="plus" color={'#ffcb44'} size={22} />
                            <Text style={{ color: '#ffcb44', fontSize: 16, fontWeight: '500', marginLeft: 10 }}> Add a new category</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ backgroundColor: '#7a7979', height: 0.4, width: 80, alignSelf: 'center', marginVertical: 10 }}></View>
                    <Text style={{ color: '#7a7979', fontSize: 14, fontWeight: '500', letterSpacing: 2 }}>SAVED CATEGORY</Text>
                    <View style={{ backgroundColor: '#7a7979', height: 0.4, width: 80, alignSelf: 'center', marginVertical: 10 }}></View>
                </View>
                <View style={{ flex: 1 }}>
                    {inventory_categoryList?.length > 0 ?
                        <FlatList
                            data={inventory_categoryList}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <View style={styles.categoryBox}>
                                    <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d9d5d2', borderRadius: 50, height: 55 }}>
                                        <MaterialIcons name="category" color={'#000'} size={25} />
                                    </View>
                                    <View style={{ width: '5%' }}></View>
                                    <View style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16, fontWeight: '700', color: '#545353', letterSpacing: 0.6 }}>{item.inventory_categoy}</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>{item.inventory_descrp}</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>{item.status}</Text>
                                    </View>
                                    <View style={{ width: '10%', alignItems: 'flex-end', paddingRight: 5, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('EditInventory_category', item)} style={{ backgroundColor: '#fff' }}>
                                            <MaterialCommunityIcons name="circle-edit-outline" color={'#ffcb44'} size={25} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => showInventoryCategoryDeleteModal(item.id)} style={{ backgroundColor: '#fff' }}>
                                            <MaterialCommunityIcons name="delete-circle-outline" color={'#ffcb44'} size={26} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                        : <Text style={{ textAlign: 'center', top: 200, color: '#000', fontSize: 18 }}>No Category available!</Text>
                    }
                </View>
            </ScrollView>

            {/* Start Inventory Category Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isInventory_categoryDeleteModal}
                onRequestClose={closeInventory_categoryDeleteModal}
            >
                <View style={styles.deleteModalOverlay}>
                    <View style={styles.deleteModalContainer}>
                        <View style={{ width: '90%', alignSelf: 'center', marginBottom: 10 }}>
                            <View style={{ alignItems: 'center' }}>
                                <MaterialIcons name="report-gmailerrorred" size={100} color="red" />
                                <Text style={{ color: '#000', fontSize: 23, fontWeight: 'bold', textAlign: 'center', letterSpacing: 0.3 }}>Are You Sure To Delete This Category?</Text>
                                <Text style={{ color: 'gray', fontSize: 17, fontWeight: '500', marginTop: 4 }}>You won't be able to revert this!</Text>
                            </View>
                        </View>
                        <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10 }}>
                            <TouchableOpacity onPress={closeInventory_categoryDeleteModal} style={styles.cancelDeleteBtn}>
                                <Text style={styles.btnText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteInventory_category(selectedInventory_categoryId)} style={styles.confirmDeleteBtn}>
                                <Text style={styles.btnText}>Yes, delete it!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* End Inventory Category Modal */}
        </View>
    )
}

export default Inventory_category

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
    },
    addCategory: {
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
    categoryBox: {
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
})