import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const ViewInventory = (props) => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [inventory_details, setInventory_details] = useState(null);

    useEffect(() => {
        if (isFocused) {
            console.log("Inventory Details", props.route.params);
            setInventory_details(props.route.params);
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>View Inventory</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <View style={styles.inventoryBox}>
                    {/* <FontAwesome name="bank" color={'#000'} size={24} /> */}
                    <Image source={{uri: inventory_details?.photo_url}} style={{width: 70, height: 70, borderRadius: 5}} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: '700', color: '#545353', letterSpacing: 0.6 }}>{inventory_details?.item_name}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>{inventory_details?.item_desc}</Text>
                    </View>
                </View>
                <View style={styles.detailBox}>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ width: '40%' }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>Item Name</Text>
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>{inventory_details?.item_name}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: '40%' }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>Item Quantity</Text>
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>{inventory_details?.quantity}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: '40%' }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>Type</Text>
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>{inventory_details?.type}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: '40%' }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>Category</Text>
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>{inventory_details?.inventory_category}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <LinearGradient colors={['#c9170a', '#f0837f']} style={styles.submitButton}>
                    <Text style={styles.submitText}>Go Back</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

export default ViewInventory

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
    inventoryBox: {
        width: '95%',
        alignSelf: 'center',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 13,
        elevation: 5,
    },
    detailBox: {
        width: '95%',
        alignSelf: 'center',
        padding: 15,
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 13,
        elevation: 5,
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