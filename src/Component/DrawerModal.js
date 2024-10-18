import { StyleSheet, Text, View, Modal, Button, TouchableWithoutFeedback, TouchableOpacity, Alert, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerModal = ({ visible, onClose }) => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [accessToken, setAccessToken] = useState(null);

    return (
        <View>
            <Modal
                visible={visible}
                animationType="none"
                transparent={true}
                onRequestClose={onClose}
            >
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ScrollView style={styles.variantModalContainer}>
                            <View style={{ width: '100%', height: 60, backgroundColor: '#000' }}>
                                <View style={{ width: '92%', height: '100%', alignSelf: 'flex-start', justifyContent: 'center' }}>
                                    <Image style={{ width: '80%', height: '80%', resizeMode: 'contain' }} source={require('../assets/Image/whitelogo.png')} />
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => { navigation.navigate('Dashboard'); onClose(); }} style={styles.drawerCell}>
                                <AntDesign name="home" color={'#fff'} size={25} />
                                <Text style={styles.drawerLable}>Dashboard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Temple_about'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Temple About</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('SocialMedia'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Social Media</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Temple_image_video'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Temple Image & Video</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('BankDetails'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Temple Bank</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Temple_festival'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Temple Festival</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Temple_news'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Temple News</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Mandap_booking'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Temple Mandap</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Pooja_booking'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Temple Pooja</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Banner'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Banner</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Temple_insideTemples'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Temple Inside Temple</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Temple_devotees'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Temple Devotees</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Management'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Temple Trust</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Prashad_time'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Temple Prasad</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Yearly_rituals'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Temple Ritual</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Darshan_time'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Temple Darshan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Donation'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Donation</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Temple_inventory'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Temple Inventory</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Temple_vendors'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Temple Vendors</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Temple_Finance'); onClose(); }} style={styles.drawerCell}>
                                <Feather name="grid" color={'#fff'} size={22} />
                                <Text style={styles.drawerLable}>Temple Finance</Text>
                            </TouchableOpacity>

                            {accessToken ?
                                <TouchableOpacity style={styles.drawerCell}>
                                    <MaterialCommunityIcons name="logout" color={'#fff'} size={25} />
                                    <Text style={styles.drawerLable}>Logout</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.drawerCell}>
                                    <MaterialCommunityIcons name="login" color={'#fff'} size={25} />
                                    <Text style={styles.drawerLable}>Login</Text>
                                </TouchableOpacity>
                            }
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

export default DrawerModal

const styles = StyleSheet.create({
    variantModalContainer: {
        width: '70%',
        height: '100%',
        left: 0,
        backgroundColor: '#fff',
        bottom: 0,
        position: 'absolute',
        alignSelf: 'center',
    },
    drawerCell: {
        width: '100%',
        height: 60,
        backgroundColor: '#dc3545',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20
    },
    drawerLable: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 0.6,
        marginLeft: 15
    }
})