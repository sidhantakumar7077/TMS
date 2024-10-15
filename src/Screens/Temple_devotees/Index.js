import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import DrawerModal from '../../Component/DrawerModal';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';

const Index = (props) => {

  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => { setModalVisible(true) };
  const closeModal = () => { setModalVisible(false) };

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState(null);
  const [dateOpen, setDateOpen] = useState(false);
  const [gotra, setGotra] = useState('');
  const [rashi, setRashi] = useState('');
  const [address, setAddress] = useState('');
  const [isFocused, setIsFocused] = useState(null);

  const [photoSource, setPhotoSource] = useState(null);
  const [photo, setPhoto] = useState('Select Image');
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
        setPhotoSource(source);
        setPhoto(response.assets[0].fileName);
        // console.log("selected image-=-=", response.assets[0])
      }
    });
  };

  return (
    <View style={styles.container}>
      <DrawerModal visible={isModalVisible} navigation={navigation} onClose={closeModal} />
      <View style={styles.headerPart}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather name="chevron-left" color={'#555454'} size={30} />
          <Text style={styles.headerText}>Temple Devotees</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={openModal} style={{ marginLeft: 8 }}>
            <Octicons name="three-bars" color={'#000'} size={28} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.topBanner}>
          <Image
            style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, }}
            source={{ uri: 'https://images.fineartamerica.com/images/artworkimages/medium/3/jagannath-temple-in-puri-heritage.jpg' }}
          />
        </View>
        <View style={styles.cardBox}>
          {/* Name Input */}
          <Text style={[styles.label, (isFocused === 'name' || name !== '') && styles.focusedLabel, { marginTop: 18 }]}>Name</Text>
          <TextInput
            style={[styles.input, (isFocused === 'name' || name !== '') && styles.focusedInput]}
            value={name}
            onChangeText={(text) => setName(text)}
            onFocus={() => setIsFocused('name')}
            onBlur={() => setIsFocused(null)}
          />

          {/* Phone Number Input */}
          <Text style={[styles.label, (isFocused === 'phone' || phone !== '') && styles.focusedLabel, { marginTop: 18 }]}>Phone Number</Text>
          <TextInput
            style={[styles.input, (isFocused === 'phone' || phone !== '') && styles.focusedInput]}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            onFocus={() => setIsFocused('phone')}
            onBlur={() => setIsFocused(null)}
            keyboardType='number-pad'
            maxLength={10}
          />

          {/* DOB */}
          <Text style={[styles.label, (dob !== null) && styles.focusedLabel]}>DOB</Text>
          <TouchableOpacity onPress={() => setDateOpen(true)} style={[styles.datePickerStyle, (dob !== null) && { marginTop: 14 }]}>
            <Text style={{ color: '#000', width: '90%' }}>{dob ? moment(dob).format("DD/MM/YYYY") : null}</Text>
            <Fontisto name="date" size={dob !== null ? 22 : 19} color={dob !== null ? '#56ab2f' : "#161c19"} />
          </TouchableOpacity>
          <View style={{ backgroundColor: dob !== null ? '#56ab2f' : '#757473', width: '100%', height: dob !== null ? 2 : 0.7, marginBottom: 30 }} />
          <View>
            <DatePicker
              modal
              mode="date"
              open={dateOpen}
              date={dob || new Date()}
              onConfirm={(data) => {
                setDateOpen(false)
                setDob(data)
              }}
              onCancel={() => {
                setDateOpen(false);
              }}
            />
          </View>

          {/* Upload Photo */}
          <Text style={[styles.label, (photo !== 'Select Image') && styles.focusedLabel]}>Upload Image</Text>
          <TouchableOpacity style={[styles.filePicker, { marginTop: 10 }]} onPress={selectTrustImage}>
            <TextInput
              style={styles.filePickerText}
              editable={false}
              placeholder={photo}
              placeholderTextColor={'#000'}
            />
            <View style={styles.chooseBtn}>
              <Text style={styles.chooseBtnText}>Choose File</Text>
            </View>
          </TouchableOpacity>

          {/* Gotra Input */}
          <Text style={[styles.label, (isFocused === 'gotra' || gotra !== '') && styles.focusedLabel, { marginTop: 18 }]}>Gotra</Text>
          <TextInput
            style={[styles.input, (isFocused === 'gotra' || gotra !== '') && styles.focusedInput]}
            value={gotra}
            onChangeText={(text) => setGotra(text)}
            onFocus={() => setIsFocused('gotra')}
            onBlur={() => setIsFocused(null)}
          />

          {/* Rashi Input */}
          <Text style={[styles.label, (isFocused === 'rashi' || rashi !== '') && styles.focusedLabel, { marginTop: 18 }]}>Rashi</Text>
          <TextInput
            style={[styles.input, (isFocused === 'rashi' || rashi !== '') && styles.focusedInput]}
            value={rashi}
            onChangeText={(text) => setRashi(text)}
            onFocus={() => setIsFocused('rashi')}
            onBlur={() => setIsFocused(null)}
          />

          {/* Address Input */}
          <Text style={[styles.label, (isFocused === 'address' || address !== '') && styles.focusedLabel, { marginTop: 18 }]}>Address</Text>
          <TextInput
            style={[styles.input, (isFocused === 'address' || address !== '') && styles.focusedInput]}
            value={address}
            onChangeText={(text) => setAddress(text)}
            onFocus={() => setIsFocused('address')}
            onBlur={() => setIsFocused(null)}
          />
        </View>
        {/* Submit Button */}
        <TouchableOpacity onPress={() => props.navigation.navigate('Temple_Finance')}>
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
  datePickerStyle: {
    width: '100%',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})