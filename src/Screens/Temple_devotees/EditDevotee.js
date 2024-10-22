import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import { base_url } from '../../../App';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const EditDevotee = (props) => {

  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState(null);
  const [dateOpen, setDateOpen] = useState(false);
  const [gotra, setGotra] = useState('');
  const [rashi, setRashi] = useState('');
  const [nakshatra, setNakshatra] = useState('');
  const [anniversary_date, setAnniversary_date] = useState('');
  const [anniversary_dateOpen, setAnniversary_dateOpen] = useState(false);
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

  useEffect(() => {
    console.log("Devotees Details", props.route.params);
    setName(props.route.params.name);
    setPhone(props.route.params.phone_number);
    setDob(new Date(props.route.params.dob));
    setGotra(props.route.params.gotra);
    setRashi(props.route.params.rashi);
    setNakshatra(props.route.params.nakshatra);
    setAnniversary_date(new Date(props.route.params.anniversary_date));
    setAddress(props.route.params.address);
    setPhoto(props.route.params.photo);
  }, [])

  const submitDevotee = async () => {
    var access_token = await AsyncStorage.getItem('storeAccesstoken');
    if (!name || !phone || !dob || !gotra || !rashi || !address) {
      Toast.show('Please fill all the fields', Toast.LONG);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone_number', phone);
    formData.append('dob', moment(dob).format("YYYY-MM-DD"));
    formData.append('gotra', gotra);
    formData.append('rashi', rashi);
    formData.append('nakshatra', nakshatra);
    formData.append('anniversary_date', moment(anniversary_date).format("YYYY-MM-DD"));
    formData.append('address', address);
    if (photoSource && photoSource.uri) {
      formData.append('photo', {
        uri: photoSource.uri,
        type: photoSource.type,
        name: photoSource.fileName
      });
    }

    try {
      const response = await axios.post(`${base_url}/api/update-devotee/${props.route.params.id}`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        Toast.show('Devotee updated successfully', Toast.LONG);
        navigation.goBack();
      } else {
        Toast.show('Failed to update devotee', Toast.LONG);
      }
    } catch (error) {
      Toast.show('Failed to update devotee1', Toast.LONG);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerPart}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather name="chevron-left" color={'#555454'} size={30} />
          <Text style={styles.headerText}>Edit Devotees</Text>
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
          {/* Name Input */}
          <Text style={[styles.label, (isFocused === 'name' || name) && styles.focusedLabel, { marginTop: 18 }]}>Name</Text>
          <TextInput
            style={[styles.input, (isFocused === 'name' || name) && styles.focusedInput]}
            value={name}
            onChangeText={(text) => setName(text)}
            onFocus={() => setIsFocused('name')}
            onBlur={() => setIsFocused(null)}
          />

          {/* Phone Number Input */}
          <Text style={[styles.label, (isFocused === 'phone' || phone) && styles.focusedLabel, { marginTop: 18 }]}>Phone Number</Text>
          <TextInput
            style={[styles.input, (isFocused === 'phone' || phone) && styles.focusedInput]}
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
          <Text style={[styles.label, (isFocused === 'gotra' || gotra) && styles.focusedLabel, { marginTop: 18 }]}>Gotra</Text>
          <TextInput
            style={[styles.input, (isFocused === 'gotra' || gotra) && styles.focusedInput]}
            value={gotra}
            onChangeText={(text) => setGotra(text)}
            onFocus={() => setIsFocused('gotra')}
            onBlur={() => setIsFocused(null)}
          />

          {/* Rashi Input */}
          <Text style={[styles.label, (isFocused === 'rashi' || rashi) && styles.focusedLabel, { marginTop: 18 }]}>Rashi</Text>
          <TextInput
            style={[styles.input, (isFocused === 'rashi' || rashi) && styles.focusedInput]}
            value={rashi}
            onChangeText={(text) => setRashi(text)}
            onFocus={() => setIsFocused('rashi')}
            onBlur={() => setIsFocused(null)}
          />

          {/* Nakshatra Input */}
          <Text style={[styles.label, (isFocused === 'nakshatra' || nakshatra) && styles.focusedLabel, { marginTop: 18 }]}>Nakshatra</Text>
          <TextInput
            style={[styles.input, (isFocused === 'nakshatra' || nakshatra) && styles.focusedInput]}
            value={nakshatra}
            onChangeText={(text) => setNakshatra(text)}
            onFocus={() => setIsFocused('nakshatra')}
            onBlur={() => setIsFocused(null)}
          />

          {/* Anniversary Date */}
          <Text style={[styles.label, (anniversary_date !== '') && styles.focusedLabel]}>Anniversary Date</Text>
          <TouchableOpacity onPress={() => setAnniversary_dateOpen(true)} style={[styles.datePickerStyle, (anniversary_date !== '') && { marginTop: 14 }]}>
            <Text style={{ color: '#000', width: '90%' }}>{anniversary_date ? moment(anniversary_date).format("DD/MM/YYYY") : null}</Text>
            <Fontisto name="date" size={anniversary_date !== '' ? 22 : 19} color={anniversary_date !== '' ? '#56ab2f' : "#161c19"} />
          </TouchableOpacity>
          <View style={{ backgroundColor: anniversary_date !== '' ? '#56ab2f' : '#757473', width: '100%', height: anniversary_date !== '' ? 2 : 0.7, marginBottom: 30 }} />
          <View>
            <DatePicker
              modal
              mode="date"
              open={anniversary_dateOpen}
              date={anniversary_date || new Date()}
              onConfirm={(data) => {
                setAnniversary_dateOpen(false)
                setAnniversary_date(data)
              }}
              onCancel={() => {
                setAnniversary_dateOpen(false);
              }}
            />
          </View>

          {/* Address Input */}
          <Text style={[styles.label, (isFocused === 'address' || address) && styles.focusedLabel, { marginTop: 18 }]}>Address</Text>
          <TextInput
            style={[styles.input, (isFocused === 'address' || address) && styles.focusedInput]}
            value={address}
            onChangeText={(text) => setAddress(text)}
            onFocus={() => setIsFocused('address')}
            onBlur={() => setIsFocused(null)}
          />
        </View>
        {/* Submit Button */}
        <TouchableOpacity onPress={submitDevotee}>
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

export default EditDevotee

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