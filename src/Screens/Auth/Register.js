import { Image, ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { base_url } from '../../../App';

const Register = (props) => {

  const navigation = useNavigation();
  const [templeName, setTempleName] = useState('');
  const [address, setAddress] = useState('');
  const [trustName, setTrustName] = useState('');
  const [trustContact, setTrustContact] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [creatorContact, setCreatorContact] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const templeRegister = async () => {
    setIsLoading(true);
    try {
      if (templeName === '') {
        setErrorMessage('Please Enter Temple Name');
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
        setIsLoading(false);
        return;
      }
      if (address === '') {
        setErrorMessage('Please Enter Temple Address');
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
        setIsLoading(false);
        return;
      }
      if (trustName === '') {
        setErrorMessage('Please Enter Trust Name');
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
        setIsLoading(false);
        return;
      }
      if (trustContact === '') {
        setErrorMessage('Please Enter Trust Contact Number');
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
        setIsLoading(false);
        return;
      }
      if (creatorName === '') {
        setErrorMessage('Please Enter Create Name');
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
        setIsLoading(false);
        return;
      }
      if (creatorContact === '') {
        setErrorMessage('Please Enter Creator Contact Number');
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
        setIsLoading(false);
        return;
      }

      const response = await fetch(base_url + 'api/register-temple', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          temple_name: templeName,
          user_name: creatorName,
          mobile_no: creatorContact,
          temple_trust_name: trustName,
          trust_contact_no: trustContact,
          temple_address: address
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Temple Register successfully', data);
        navigation.navigate('Login');
      } else {
        // Handle error response
        setErrorMessage(data.message || 'Failed to Temple Register. Please try again.');
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
      }
    } catch (error) {
      setErrorMessage('Failed to Temple Register. Please try again.');
      setShowError(true);
      console.log("Error", error);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.imgContainer}>
          <Image style={{ width: '100%', height: '100%', borderRadius: 50 }} source={{ uri: 'https://www.tamilnadutourism.tn.gov.in/img/pages/vertical/1008-lingam-temple-1656323981_27fd6e6ff5c87c2bede2.webp' }} />
        </View>
        <Text style={styles.mainTitle}>Register</Text>
        <Text style={styles.subTitle}>Temple Management System</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={{ width: '100%' }}>
          {/* <Text style={{ color: '#000', fontSize: 17, marginLeft: 8, fontWeight: '500' }}>Temple Name</Text> */}
          <CardView style={styles.cardStyle} cardElevation={5} cardMaxElevation={2} cornerRadius={10}>
            <MaterialIcons name="temple-hindu" size={25} color={'#3d3d3c'} />
            <TextInput
              style={styles.inputs}
              onChangeText={setTempleName}
              value={templeName}
              placeholder="Temple Name"
              placeholderTextColor="#3d3d3c"
              underlineColorAndroid="transparent"
            />
          </CardView>
        </View>
        <View style={{ width: '100%' }}>
          {/* <Text style={{ color: '#000', fontSize: 17, marginLeft: 8, fontWeight: '500' }}>Address</Text> */}
          <CardView style={styles.cardStyle} cardElevation={5} cardMaxElevation={2} cornerRadius={10}>
            <Ionicons name="location-sharp" size={25} color={'#3d3d3c'} />
            <TextInput
              style={styles.inputs}
              onChangeText={setAddress}
              value={address}
              placeholder="Temple Address"
              placeholderTextColor="#3d3d3c"
              underlineColorAndroid="transparent"
            />
          </CardView>
        </View>
        <View style={{ width: '100%' }}>
          {/* <Text style={{ color: '#000', fontSize: 17, marginLeft: 8, fontWeight: '500' }}>Trust Name</Text> */}
          <CardView style={styles.cardStyle} cardElevation={5} cardMaxElevation={2} cornerRadius={10}>
            <FontAwesome name="group" size={22} color={'#3d3d3c'} />
            <TextInput
              style={styles.inputs}
              onChangeText={setTrustName}
              value={trustName}
              placeholder="Trust Name"
              placeholderTextColor="#3d3d3c"
              underlineColorAndroid="transparent"
            />
          </CardView>
        </View>
        <View style={{ width: '100%' }}>
          {/* <Text style={{ color: '#000', fontSize: 17, marginLeft: 8, fontWeight: '500' }}>Trust Contact Number</Text> */}
          <CardView style={styles.cardStyle} cardElevation={5} cardMaxElevation={2} cornerRadius={10}>
            <FontAwesome name="phone" size={25} color={'#3d3d3c'} />
            <TextInput
              style={styles.inputs}
              onChangeText={setTrustContact}
              value={trustContact}
              placeholder="Trust Contact Number"
              placeholderTextColor="#3d3d3c"
              underlineColorAndroid="transparent"
            />
          </CardView>
        </View>
        <View style={{ width: '100%' }}>
          {/* <Text style={{ color: '#000', fontSize: 17, marginLeft: 8, fontWeight: '500' }}>Creator Name</Text> */}
          <CardView style={styles.cardStyle} cardElevation={5} cardMaxElevation={2} cornerRadius={10}>
            <Entypo name="user" size={25} color={'#3d3d3c'} />
            <TextInput
              style={styles.inputs}
              onChangeText={setCreatorName}
              value={creatorName}
              placeholder="Creator Name"
              placeholderTextColor="#3d3d3c"
              underlineColorAndroid="transparent"
            />
          </CardView>
        </View>
        <View style={{ width: '100%' }}>
          {/* <Text style={{ color: '#000', fontSize: 17, marginLeft: 8, fontWeight: '500' }}>Contact Number of Creator</Text> */}
          <CardView style={styles.cardStyle} cardElevation={5} cardMaxElevation={2} cornerRadius={10}>
            <FontAwesome name="phone" size={25} color={'#3d3d3c'} />
            <TextInput
              style={styles.inputs}
              onChangeText={setCreatorContact}
              value={creatorContact}
              placeholder="Contact Number of Creator"
              placeholderTextColor="#3d3d3c"
              underlineColorAndroid="transparent"
            />
          </CardView>
        </View>
      </View>

      {/* Error Message */}
      {showError && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Register Button */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#c80100" />
      ) : (
        <TouchableOpacity onPress={templeRegister}>
          <LinearGradient
            colors={['#c9170a', '#f0837f']}
            style={styles.registerButton}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {/* Login Link */}
      <View style={{ marginBottom: 40, marginTop: 10 }}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink} onPress={() => props.navigation.navigate('Login')}>Log In.</Text>
        </Text>
      </View>
    </ScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebeae8'
  },
  topContainer: {
    width: '80%',
    // height: 200,
    alignSelf: 'center',
    // backgroundColor: 'red',
    alignItems: 'center',
    marginTop: 20
  },
  imgContainer: {
    // backgroundColor: 'green',
    height: 100,
    width: 100,
    borderRadius: 50
  },
  mainTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginBottom: 20,
    color: '#004d40',
    fontFamily: 'sans-serif-condensed',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#004d40',
    fontFamily: 'sans-serif-condensed',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  cardStyle: {
    backgroundColor: '#c4c3c0',
    width: '100%',
    marginTop: 5,
    marginBottom: 15,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  inputs: {
    height: 50,
    width: '80%',
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  registerButton: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 3,
    marginTop: 10
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loginText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B6B6B',
    marginTop: 10,
  },
  loginLink: {
    color: '#b05348',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginLeft: 20
  },
})