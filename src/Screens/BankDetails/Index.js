import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import DrawerModal from '../../Component/DrawerModal';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Index = (props) => {

    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => { setModalVisible(true) };
    const closeModal = () => { setModalVisible(false) };

    return (
        <View style={styles.container}>
            <DrawerModal visible={isModalVisible} navigation={navigation} onClose={closeModal} />
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Temple Bank</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={openModal} style={{ marginLeft: 8 }}>
                        <Octicons name="three-bars" color={'#000'} size={28} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: 10 }}>
                <View style={styles.addBank}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('AddBank')} style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                        <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome6 name="plus" color={'#ffcb44'} size={22} />
                            <Text style={{ color: '#ffcb44', fontSize: 16, fontWeight: '500', marginLeft: 10 }}> Add a new bank</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ backgroundColor: '#7a7979', height: 0.4, width: 100, alignSelf: 'center', marginVertical: 10 }}></View>
                    <Text style={{ color: '#7a7979', fontSize: 14, fontWeight: '500', letterSpacing: 2 }}>SAVED BANK</Text>
                    <View style={{ backgroundColor: '#7a7979', height: 0.4, width: 100, alignSelf: 'center', marginVertical: 10 }}></View>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ViewBank')} style={styles.bankBox}>
                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d9d5d2', borderRadius: 50, height: 55 }}>
                            <FontAwesome name="bank" color={'#000'} size={24} />
                        </View>
                        <View style={{ width: '5%' }}></View>
                        <View style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#545353', letterSpacing: 0.6 }}>AXIS Bank</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>87655******</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>Nayapali</Text>
                        </View>
                        <View style={{ width: '10%', alignItems: 'flex-end', paddingRight: 5, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('EditBank')} style={{ backgroundColor: '#fff' }}>
                                <MaterialCommunityIcons name="circle-edit-outline" color={'#ffcb44'} size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#fff' }}>
                                <MaterialCommunityIcons name="delete-circle-outline" color={'#ffcb44'} size={26} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ViewBank')} style={styles.bankBox}>
                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d9d5d2', borderRadius: 50, height: 55 }}>
                            <FontAwesome name="bank" color={'#000'} size={24} />
                        </View>
                        <View style={{ width: '5%' }}></View>
                        <View style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#545353', letterSpacing: 0.6 }}>SBI Bank</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>68788******</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>Patia</Text>
                        </View>
                        <View style={{ width: '10%', alignItems: 'flex-end', paddingRight: 5, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('EditBank')} style={{ backgroundColor: '#fff' }}>
                                <MaterialCommunityIcons name="circle-edit-outline" color={'#ffcb44'} size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#fff' }}>
                                <MaterialCommunityIcons name="delete-circle-outline" color={'#ffcb44'} size={26} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ViewBank')} style={styles.bankBox}>
                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d9d5d2', borderRadius: 50, height: 55 }}>
                            <FontAwesome name="bank" color={'#000'} size={24} />
                        </View>
                        <View style={{ width: '5%' }}></View>
                        <View style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#545353', letterSpacing: 0.6 }}>ECO Bank</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>98789******</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>Niladri Vihar</Text>
                        </View>
                        <View style={{ width: '10%', alignItems: 'flex-end', paddingRight: 5, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('EditBank')} style={{ backgroundColor: '#fff' }}>
                                <MaterialCommunityIcons name="circle-edit-outline" color={'#ffcb44'} size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#fff' }}>
                                <MaterialCommunityIcons name="delete-circle-outline" color={'#ffcb44'} size={26} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ViewBank')} style={styles.bankBox}>
                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d9d5d2', borderRadius: 50, height: 55 }}>
                            <FontAwesome name="bank" color={'#000'} size={24} />
                        </View>
                        <View style={{ width: '5%' }}></View>
                        <View style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#545353', letterSpacing: 0.6 }}>HDFC Bank</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>46657******</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>Nayapali</Text>
                        </View>
                        <View style={{ width: '10%', alignItems: 'flex-end', paddingRight: 5, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('EditBank')} style={{ backgroundColor: '#fff' }}>
                                <MaterialCommunityIcons name="circle-edit-outline" color={'#ffcb44'} size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#fff' }}>
                                <MaterialCommunityIcons name="delete-circle-outline" color={'#ffcb44'} size={26} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ViewBank')} style={styles.bankBox}>
                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d9d5d2', borderRadius: 50, height: 55 }}>
                            <FontAwesome name="bank" color={'#000'} size={24} />
                        </View>
                        <View style={{ width: '5%' }}></View>
                        <View style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#545353', letterSpacing: 0.6 }}>INDIAN Bank</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>588996******</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>Jaydev Vihar</Text>
                        </View>
                        <View style={{ width: '10%', alignItems: 'flex-end', paddingRight: 5, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('EditBank')} style={{ backgroundColor: '#fff' }}>
                                <MaterialCommunityIcons name="circle-edit-outline" color={'#ffcb44'} size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#fff' }}>
                                <MaterialCommunityIcons name="delete-circle-outline" color={'#ffcb44'} size={26} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    {/* <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={allAddresses.reverse()}
                        scrollEnabled={false}
                        keyExtractor={(key) => {
                            return key.id
                        }}
                        renderItem={(address) => {
                            return (
                                <View style={styles.addressBox}>
                                    <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                                        {address.item.address_type === "Home" && <AntDesign name="home" color={'#555454'} size={22} />}
                                        {address.item.address_type === "Work" && <MaterialIcons name="work-outline" color={'#555454'} size={22} />}
                                        {address.item.address_type === "Other" && <Fontisto name="world-o" color={'#555454'} size={22} />}

                                        {address.item.address_type === "Home" && <Text style={{ fontSize: 13, fontWeight: '400', color: '#616161' }}>Home</Text>}
                                        {address.item.address_type === "Work" && <Text style={{ fontSize: 13, fontWeight: '400', color: '#616161' }}>Work</Text>}
                                        {address.item.address_type === "Other" && <Text style={{ fontSize: 13, fontWeight: '400', color: '#616161' }}>Other</Text>}
                                    </View>
                                    <View style={{ width: '3%' }}></View>
                                    <View style={{ width: '72%', alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#545353', letterSpacing: 0.6 }}>{address.item.area},  {address.item.city}</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#545353', letterSpacing: 0.6 }}>{address.item.state},  {address.item.pincode}</Text>
                                        {address.item.default === 1 ?
                                            <View style={{ marginTop: 4, flexDirection: 'row', alignItems: 'center' }}>
                                                <FontAwesome name='check-circle' color='#5286f7' size={18} />
                                                <Text style={{ fontSize: 15, fontWeight: '500', color: '#5286f7', letterSpacing: 0.6, marginLeft: 5 }}>Default Address</Text>
                                            </View>
                                            :
                                            <TouchableOpacity onPress={() => handleDefaultAddress(address.item.id)} style={{ marginTop: 4 }}>
                                                <Text style={{ fontSize: 15, fontWeight: '500', color: '#5286f7', letterSpacing: 0.6 }}>Set as default</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                    <View style={{ width: '10%', alignItems: 'flex-end', paddingRight: 5, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                        <TouchableOpacity onPress={() => getAddressById(address.item)} style={{ backgroundColor: '#fff' }}>
                                            <MaterialCommunityIcons name="circle-edit-outline" color={'#ffcb44'} size={25} />
                                        </TouchableOpacity>
                                        {address.item.default === 0 &&
                                            <TouchableOpacity onPress={() => confirmDelete(address.item.id)} style={{ backgroundColor: '#fff' }}>
                                                <MaterialCommunityIcons name="delete-circle-outline" color={'#ffcb44'} size={26} />
                                            </TouchableOpacity>
                                        }
                                    </View>
                                </View>
                            )
                        }}
                    /> */}
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
        </View>
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
    addBank: {
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
    bankBox: {
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
})