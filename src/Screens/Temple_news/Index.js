import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import DrawerModal from '../../Component/DrawerModal';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Index = (props) => {

    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => { setModalVisible(true) };
    const closeModal = () => { setModalVisible(false) };

    return (
        <ScrollView style={styles.container}>
            <DrawerModal visible={isModalVisible} navigation={navigation} onClose={closeModal} />
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Temple News</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={openModal} style={{ marginLeft: 8 }}>
                        <Octicons name="three-bars" color={'#000'} size={28} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: 10 }}>
                <View style={styles.addNotice}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('AddNews')} style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                        <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome6 name="plus" color={'#ffcb44'} size={22} />
                            <Text style={{ color: '#ffcb44', fontSize: 16, fontWeight: '500', marginLeft: 10 }}> Add a new notice</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ backgroundColor: '#7a7979', height: 0.4, width: 100, alignSelf: 'center', marginVertical: 10 }}></View>
                    <Text style={{ color: '#7a7979', fontSize: 14, fontWeight: '500', letterSpacing: 2 }}>SAVED NEWS</Text>
                    <View style={{ backgroundColor: '#7a7979', height: 0.4, width: 100, alignSelf: 'center', marginVertical: 10 }}></View>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.newsBox}>
                        <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d9d5d2', borderRadius: 50, height: 55 }}>
                            <FontAwesome6 name="newspaper" color={'#000'} size={25} />
                        </View>
                        <View style={{ width: '5%' }}></View>
                        <View style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#545353', letterSpacing: 0.6 }}>Demo</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>2024-10-25</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>Demo</Text>
                        </View>
                        <View style={{ width: '10%', alignItems: 'flex-end', paddingRight: 5, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('EditNews')} style={{ backgroundColor: '#fff' }}>
                                <MaterialCommunityIcons name="circle-edit-outline" color={'#ffcb44'} size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#fff' }}>
                                <MaterialCommunityIcons name="delete-circle-outline" color={'#ffcb44'} size={26} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ScrollView>
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
    addNotice: {
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
    newsBox: {
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