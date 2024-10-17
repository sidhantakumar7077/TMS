import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image, TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ViewMandap = (props) => {

  const navigation = useNavigation();
  const [mandap_details, setMandap_details] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.headerPart}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather name="chevron-left" color={'#555454'} size={30} />
          <Text style={styles.headerText}>Mandap Detail's</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.bankBox}>
          <MaterialIcons name="museum" color={'#000'} size={24} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#545353', letterSpacing: 0.6 }}>Mandap Name</Text>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#666565', letterSpacing: 0.6 }}>Event Name</Text>
          </View>
        </View>
        <View style={styles.detailBox}>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={{ width: '40%' }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>Event Name</Text>
            </View>
            <View style={{ width: '60%' }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>xxxxxxx9868</Text>
            </View>
          </View>
          <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            <View style={{ width: '40%' }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>IFSC Code</Text>
            </View>
            <View style={{ width: '60%' }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>IFSCC98997</Text>
            </View>
          </View>
          <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            <View style={{ width: '40%' }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>Branch Name</Text>
            </View>
            <View style={{ width: '60%' }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>Nayapali</Text>
            </View>
          </View>
          <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            <View style={{ width: '40%' }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#646665', letterSpacing: 0.6 }}>Status</Text>
            </View>
            <View style={{ width: '60%' }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#545353', letterSpacing: 0.6 }}>Active</Text>
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

export default ViewMandap

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
  bankBox: {
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