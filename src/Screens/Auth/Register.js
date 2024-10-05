import { Image, ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Register = (props) => {

  const [templeName, setTempleName] = useState('');
  const [address, setAddress] = useState('');
  const [trustContact, setTrustContact] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [creatorContact, setCreatorContact] = useState('');

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
          <Text style={{ color: '#000', fontSize: 17, marginLeft: 8, fontWeight: '500' }}>Temple Name</Text>
          <CardView style={styles.cardStyle} cardElevation={5} cardMaxElevation={2} cornerRadius={10}>
            <MaterialIcons name="temple-hindu" size={25} color={'#3d3d3c'} />
            <TextInput
              style={styles.inputs}
              // onChangeText={setMail}
              // value={mail}
              placeholder="Temple Name"
              placeholderTextColor="#3d3d3c"
              underlineColorAndroid="transparent"
            />
          </CardView>
        </View>
        <View style={{ width: '100%' }}>
          <Text style={{ color: '#000', fontSize: 17, marginLeft: 8, fontWeight: '500' }}>Address</Text>
          <CardView style={styles.cardStyle} cardElevation={5} cardMaxElevation={2} cornerRadius={10}>
            <Ionicons name="location-sharp" size={25} color={'#3d3d3c'} />
            <TextInput
              style={styles.inputs}
              // onChangeText={setMail}
              // value={mail}
              placeholder="Temple Address"
              placeholderTextColor="#3d3d3c"
              underlineColorAndroid="transparent"
            />
          </CardView>
        </View>
        <View style={{ width: '100%' }}>
          <Text style={{ color: '#000', fontSize: 17, marginLeft: 8, fontWeight: '500' }}>Trust Contact Number</Text>
          <CardView style={styles.cardStyle} cardElevation={5} cardMaxElevation={2} cornerRadius={10}>
            <FontAwesome name="phone" size={25} color={'#3d3d3c'} />
            <TextInput
              style={styles.inputs}
              // onChangeText={setMail}
              // value={mail}
              placeholder="Trust Contact Number"
              placeholderTextColor="#3d3d3c"
              underlineColorAndroid="transparent"
            />
          </CardView>
        </View>
        <View style={{ width: '100%' }}>
          <Text style={{ color: '#000', fontSize: 17, marginLeft: 8, fontWeight: '500' }}>Creator Name</Text>
          <CardView style={styles.cardStyle} cardElevation={5} cardMaxElevation={2} cornerRadius={10}>
            <Entypo name="user" size={25} color={'#3d3d3c'} />
            <TextInput
              style={styles.inputs}
              // onChangeText={setMail}
              // value={mail}
              placeholder="Creator Name"
              placeholderTextColor="#3d3d3c"
              underlineColorAndroid="transparent"
            />
          </CardView>
        </View>
        <View style={{ width: '100%' }}>
          <Text style={{ color: '#000', fontSize: 17, marginLeft: 8, fontWeight: '500' }}>Contact Number of Creator</Text>
          <CardView style={styles.cardStyle} cardElevation={5} cardMaxElevation={2} cornerRadius={10}>
            <FontAwesome name="phone" size={25} color={'#3d3d3c'} />
            <TextInput
              style={styles.inputs}
              // onChangeText={setMail}
              // value={mail}
              placeholder="Contact Number of Creator"
              placeholderTextColor="#3d3d3c"
              underlineColorAndroid="transparent"
            />
          </CardView>
        </View>
      </View>

      {/* Register Button */}
      <TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')}>
        <LinearGradient
          colors={['#c9170a', '#f0837f']}
          style={styles.registerButton}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Login Link */}
      <View>
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
    color: '#b6b6b6',
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
})