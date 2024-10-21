import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';
import { base_url } from '../../../App';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const EditInventory_category = (props) => {

    const navigation = useNavigation();
    const [inventory_category, setInventory_category] = useState('');
    const [inventory_desc, setInventory_desc] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    useEffect(() => {
        // console.log("Category details", props.route.params);
        setInventory_category(props.route.params.inventory_categoy);
        setInventory_desc(props.route.params.inventory_descrp);
    }, []);

    const submitCategory = async () => {
        var access_token = await AsyncStorage.getItem('storeAccesstoken');

        if (inventory_category === '') {
            Toast.show('Please enter inventory category', Toast.LONG);
            return;
        } if (inventory_desc === '') {
            Toast.show('Please enter inventory description', Toast.LONG);
            return;
        }
        try {
            const response = await axios.post(`${base_url}/api/update-inventory-category/${props.route.params.id}`, {
                inventory_categoy: inventory_category,
                inventory_descrp: inventory_desc
            }, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            });
            if (response.status === 200) {
                Toast.show('Inventory category updated successfully', Toast.LONG);
                navigation.goBack();
            } else {
                Toast.show('Failed to update inventory category', Toast.LONG);
            }
        } catch (error) {
            Toast.show('Failed to update inventory category', Toast.LONG);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Edit Category</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.topBanner}>
                    <Image
                        style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, }}
                        source={{ uri: 'https://images.fineartamerica.com/images/artworkimages/medium/3/jagannath-temple-in-puri-heritage.jpg' }}
                    />
                </View>

                <View style={styles.cardBox}>
                    {/* Item inventory_category Input */}
                    <Text style={[styles.label, (isFocused === 'inventory_category' || inventory_category) && styles.focusedLabel, { marginTop: 18 }]}>Inventory Category</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'inventory_category' || inventory_category) && styles.focusedInput]}
                        value={inventory_category}
                        onChangeText={(text) => setInventory_category(text)}
                        onFocus={() => setIsFocused('inventory_category')}
                        onBlur={() => setIsFocused(null)}
                    />
                    {/* Item inventory_desc Input */}
                    <Text style={[styles.label, (isFocused === 'inventory_desc' || inventory_desc) && styles.focusedLabel, { marginTop: 18 }]}>Inventory Description</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'inventory_desc' || inventory_desc) && styles.focusedInput]}
                        value={inventory_desc}
                        onChangeText={(text) => setInventory_desc(text)}
                        onFocus={() => setIsFocused('inventory_desc')}
                        onBlur={() => setIsFocused(null)}
                    />
                </View>

                {/* Submit Button */}
                <TouchableOpacity onPress={submitCategory}>
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

export default EditInventory_category

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
})