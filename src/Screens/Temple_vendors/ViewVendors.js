import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const ViewVendors = (props) => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [vendorsDetails, setVendorsDetails] = useState(null);
    const [vendorBankList, setVendorBankList] = useState([]);

    useEffect(() => {
        if (isFocused) {
            // console.log("Devotees Details", props.route.params);
            setVendorsDetails(props.route.params);
            setVendorBankList(props.route.params.vendor_banks);
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>View Vendor</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.inventoryBox}>
                    <FontAwesome name="bank" color={'#000'} size={24} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: '700', color: '#545353', letterSpacing: 0.6 }}>{vendorsDetails?.vendor_name}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>{vendorsDetails?.phone_no}</Text>
                    </View>
                </View>
                <View style={styles.detailBox}>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ width: '40%' }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>Name</Text>
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>{vendorsDetails?.vendor_name}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: '40%' }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>Phone Number</Text>
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>{vendorsDetails?.phone_no}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: '40%' }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>Email</Text>
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>{vendorsDetails?.email_id}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: '40%' }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>Vendor Category</Text>
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>{vendorsDetails?.vendor_category}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: '40%' }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>Payment Type</Text>
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>{vendorsDetails?.payment_type}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: '40%' }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>GST Number</Text>
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>{vendorsDetails?.vendor_gst}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: '40%' }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>Vendor Address</Text>
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>{vendorsDetails?.vendor_address}</Text>
                        </View>
                    </View>
                </View>
                {vendorBankList.length > 0 &&
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#000', fontSize: 17, fontWeight: 'bold', marginLeft: 13, marginTop: 20 }}>Vendor's Bank</Text>
                        <FlatList
                            data={vendorBankList}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <View style={[styles.detailBox, { marginTop: 10 }]}>
                                    <View style={{ width: '100%', flexDirection: 'row' }}>
                                        <View style={{ width: '40%' }}>
                                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>Bank Name</Text>
                                        </View>
                                        <View style={{ width: '60%' }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>{item?.bank_name}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ width: '40%' }}>
                                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>Account Number</Text>
                                        </View>
                                        <View style={{ width: '60%' }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>{item?.account_no}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ width: '40%' }}>
                                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>IFSC Code</Text>
                                        </View>
                                        <View style={{ width: '60%' }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>{item?.ifsc_code}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ width: '40%' }}>
                                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>UPI ID</Text>
                                        </View>
                                        <View style={{ width: '60%' }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>{item?.upi_id}</Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                }
            </ScrollView>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <LinearGradient colors={['#c9170a', '#f0837f']} style={styles.submitButton}>
                    <Text style={styles.submitText}>Go Back</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

export default ViewVendors

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