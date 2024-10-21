import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';
import { base_url } from '../../../App';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const EditInventory = (props) => {

    const navigation = useNavigation();
    const [item_name, setItem_name] = useState('');
    const [quantity, setQuantity] = useState('');
    const [desc, setDesc] = useState('');
    const [isFocused, setIsFocused] = useState(null);

    const [inventory_category, setInventory_category] = useState(null);
    const [inventory_categoryOpen, setInventory_categoryOpen] = useState(false);
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
                const formattedData = response.data.data.map(item => ({
                    label: item.inventory_categoy,
                    value: item.id,
                }));
                setInventory_categoryList(formattedData);
            } else {
                Toast.show('Failed to fetch inventory category list', Toast.LONG);
            }
        } catch (error) {
            Toast.show('Failed to fetch inventory category list', Toast.LONG);
        }
    };

    const [inventory_type, setInventory_type] = useState(null);
    const [inventory_typeOpen, setInventory_typeOpen] = useState(false);
    const [inventory_typeList, setInventory_typeList] = useState([
        { label: 'Donated', value: 'donated' },
        { label: 'Purchased', value: 'purchased' },
    ]);

    const [item_photoSource, setItem_photoSource] = useState(null);
    const [item_photo, setItem_photo] = useState('Select Image');
    // Handle document upload using react-native-image-picker
    const selectTrustImage = async () => {
        // var access_token = await AsyncStorage.getItem('storeAccesstoken');
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = response.assets[0]
                setItem_photoSource(source);
                setItem_photo(response.assets[0].fileName);
                // console.log("selected image-=-=", response.assets[0])
            }
        });
    };

    const updateInventory = async () => {
        var access_token = await AsyncStorage.getItem('storeAccesstoken');
        const data = new FormData();
        data.append('item_name', item_name);
        data.append('quantity', quantity);
        data.append('item_desc', desc);
        data.append('inventory_category', inventory_category);
        data.append('type', inventory_type);
        if (item_photoSource && item_photoSource.uri) {
            formData.append('photo', {
                uri: item_photoSource.uri,
                type: item_photoSource.type,
                name: item_photoSource.fileName
            });
        }
        try {
            const response = await axios.post(`${base_url}/api/update-inventory/${props.route.params.id}`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.status === 200) {
                Toast.show('Inventory updated successfully', Toast.LONG);
                navigation.goBack();
            } else {
                Toast.show('Failed to update inventory', Toast.LONG);
            }
        } catch (error) {
            Toast.show('Failed to update inventory', Toast.LONG);
        }
    };

    useEffect(() => {
        fetchInventory_categoryList();
        // console.log("Inventory Details", props.route.params.quantity);
        setItem_name(props.route.params.item_name);
        setDesc(props.route.params.item_desc);
        setInventory_category(props.route.params.inventorycategory.id);
        setInventory_type(props.route.params.type);
        setItem_photo(props.route.params.photo_url);
        setQuantity(props.route.params.quantity);
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.headerPart}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="chevron-left" color={'#555454'} size={30} />
                    <Text style={styles.headerText}>Add Inventory</Text>
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
                    {/* Item Name Input */}
                    <Text style={[styles.label, (isFocused === 'item_name' || item_name) && styles.focusedLabel, { marginTop: 18 }]}>Item Name</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'item_name' || item_name) && styles.focusedInput]}
                        value={item_name}
                        onChangeText={(text) => setItem_name(text)}
                        onFocus={() => setIsFocused('item_name')}
                        onBlur={() => setIsFocused(null)}
                    />

                    {/* Quantity Input */}
                    <Text style={[styles.label, (isFocused === 'quantity' || quantity) && styles.focusedLabel, { marginTop: 18 }]}>Quantity</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'quantity' || quantity) && styles.focusedInput]}
                        value={quantity}
                        keyboardType='numeric'
                        onChangeText={(text) => setQuantity(text)}
                        onFocus={() => setIsFocused('quantity')}
                        onBlur={() => setIsFocused(null)}
                    />

                    {/* Description Input */}
                    <Text style={[styles.label, (isFocused === 'desc' || desc) && styles.focusedLabel, { marginTop: 18 }]}>Description</Text>
                    <TextInput
                        style={[styles.input, (isFocused === 'desc' || desc) && styles.focusedInput]}
                        value={desc}
                        onChangeText={(text) => setDesc(text)}
                        onFocus={() => setIsFocused('desc')}
                        onBlur={() => setIsFocused(null)}
                    />

                    {/* Upload Banner Photo */}
                    <Text style={[styles.label, (item_photo !== 'Select Image') && styles.focusedLabel]}>Upload Item Image</Text>
                    <TouchableOpacity style={[styles.filePicker, { marginTop: 10 }]} onPress={selectTrustImage}>
                        <TextInput
                            style={styles.filePickerText}
                            editable={false}
                            placeholder={item_photo}
                            placeholderTextColor={'#000'}
                        />
                        <View style={styles.chooseBtn}>
                            <Text style={styles.chooseBtnText}>Choose File</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Inventory Category Dropdown */}
                    <Text style={[styles.label, inventory_category && styles.focusedLabel, { marginBottom: 10 }]}>Inventory Category</Text>
                    <DropDownPicker
                        open={inventory_categoryOpen}
                        value={inventory_category}
                        items={inventory_categoryList}
                        setOpen={setInventory_categoryOpen}
                        setValue={setInventory_category}
                        setItems={setInventory_categoryList}
                        placeholder="Select Inventory Category"
                        style={[
                            styles.input,
                            styles.dropdown,
                            {
                                borderBottomColor: inventory_categoryOpen ? '#56ab2f' : '#757473',
                                height: inventory_categoryOpen ? 50 : 25,
                                backgroundColor: '#f4f4f4',
                                paddingHorizontal: 10,
                                width: '103%',
                                alignSelf: 'center'
                            }
                        ]}
                        textStyle={{
                            color: inventory_category ? '#000' : '#757473',
                            fontSize: 16,
                        }}
                        dropDownContainerStyle={[styles.dropdownContainer, {
                            borderBottomColor: '#56ab2f',
                        }]}
                        placeholderStyle={{ color: '#757473', fontSize: 13 }}
                        zIndex={3000}
                        zIndexInverse={1000}
                    />

                    {/* Inventory Type Dropdown */}
                    <Text style={[styles.label, inventory_type && styles.focusedLabel, { marginBottom: 10, marginTop: 20 }]}>Inventory Type</Text>
                    <DropDownPicker
                        open={inventory_typeOpen}
                        value={inventory_type}
                        items={inventory_typeList}
                        setOpen={setInventory_typeOpen}
                        setValue={setInventory_type}
                        setItems={setInventory_typeList}
                        placeholder="Select Inventory Type"
                        style={[
                            styles.input,
                            styles.dropdown,
                            {
                                borderBottomColor: inventory_typeOpen ? '#56ab2f' : '#757473',
                                height: inventory_typeOpen ? 50 : 25,
                                backgroundColor: '#f4f4f4',
                                paddingHorizontal: 10,
                                width: '103%',
                                alignSelf: 'center'
                            }
                        ]}
                        textStyle={{
                            color: inventory_type ? '#000' : '#757473',
                            fontSize: 16,
                        }}
                        dropDownContainerStyle={[styles.dropdownContainer, {
                            borderBottomColor: '#56ab2f',
                        }]}
                        placeholderStyle={{ color: '#757473', fontSize: 13 }}
                        zIndex={3000}
                        zIndexInverse={1000}
                    />
                </View>

                {/* Submit Button */}
                <TouchableOpacity onPress={updateInventory}>
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

export default EditInventory

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
    dropdown: {
        borderWidth: 0,
        borderBottomWidth: 0.7,
        borderColor: '#757473',
        paddingHorizontal: 0,
        marginBottom: 30,
    },
    dropdownContainer: {
        borderWidth: 0.7,
        borderColor: '#757473',
        paddingHorizontal: 0,
        width: '102.5%',
        alignSelf: 'center'
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
    filePicker: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    filePickerText: {
        width: '70%',
        height: 45,
        lineHeight: 45,
        color: '#000',
    },
    chooseBtn: {
        backgroundColor: '#bbb',
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    chooseBtnText: {
        color: '#fff',
        fontWeight: '500',
    },
})