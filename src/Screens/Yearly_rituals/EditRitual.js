import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { base_url } from '../../../App';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import moment from 'moment';

const EditRitual = (props) => {

  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(null);
  const [ritual_name, setRitual_name] = useState('');
  const [ritual_tithi, setRitual_tithi] = useState('');
  const [ritual_desc, setRitual_desc] = useState('');
  const [ritualDate, setRitualDate] = useState(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [ritualTime, setRitualTime] = useState(null);
  const [openTimePicker, setOpenTimePicker] = useState(false);

  const [templeImageSource, setTempleImageSource] = useState(null);
  const [templeImage, setTempleImage] = useState('Select Images');
  const [templeVideoSource, setTempleVideoSource] = useState(null);
  const [templeVideo, setTempleVideo] = useState('Select Videos');
  const [videoPaused, setVideoPaused] = useState(true);

  const selectImage = () => {
    let options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selectedImages = response.assets;
        setTempleImage(selectedImages[0].fileName);
        // console.log("object", selectedImages);
        setTempleImageSource(selectedImages[0]);
      }
    });
  };

  const selectTempleVideos = () => {
    let options = {
      mediaType: 'video',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('VideoPicker Error: ', response.error);
      } else {
        const selectedVideos = response.assets;
        setTempleVideo(selectedVideos[0].fileName);
        setTempleVideoSource(selectedVideos[0]);
      }
    });
  };

  const submitRitual = async () => {
    try {
      var access_token = await AsyncStorage.getItem('storeAccesstoken');
      if (ritual_name === '' || ritual_tithi === '' || ritual_desc === '' || !ritualDate || !ritualTime) {
        Toast.show('Please fill all the fields', Toast.LONG);
        return;
      }

      const formData = new FormData();
      formData.append('spcl_ritual_name', ritual_name);
      formData.append('spcl_ritual_tithi', ritual_tithi);
      formData.append('description', ritual_desc);
      formData.append('spcl_ritual_date', moment(ritualDate).format('YYYY-MM-DD'));
      formData.append('spcl_ritual_time', moment(ritualTime).format('h:mm a'));
      {
        templeImageSource && formData.append('spcl_ritual_image', {
          uri: templeImageSource.uri,
          type: templeImageSource.type,
          name: templeImageSource.fileName,
        });
      }
      {
        templeVideoSource && formData.append('spcl_ritual_video', {
          uri: templeVideoSource.uri,
          type: templeVideoSource.type,
          name: templeVideoSource.fileName,
        });
      }

      const response = await axios.put(`${base_url}/update-special-rituals/${props.route.params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${access_token}`,
        },
      });

      if (response.status === 200) {
        Toast.show('Ritual updated successfully', Toast.LONG);
        navigation.goBack();
      } else {
        console.error('Failed to update ritual:', response.data);
        Toast.show('Failed to update ritual', Toast.LONG);
      }
    } catch (error) {
      console.error('Error updating ritual:', error);
      Toast.show('Failed to update ritual', Toast.LONG);
    }
  };

  useEffect(() => {
    // console.log("Ritual details", props.route.params);
    setRitual_name(props.route.params.spcl_ritual_name);
    setRitual_tithi(props.route.params.spcl_ritual_tithi);
    setRitual_desc(props.route.params.description);
    const ritualDate = new Date(props.route.params.spcl_ritual_date);
    const ritualTime = moment(props.route.params.spcl_ritual_time, 'h:mm A').toDate();

    if (!isNaN(ritualDate.getTime())) {
      setRitualDate(ritualDate);
    } else {
      console.error('Invalid ritual date:', props.route.params.spcl_ritual_date);
    }

    if (moment(ritualTime).isValid()) {
      setRitualTime(ritualTime);
    } else {
      console.error('Invalid ritual time:', props.route.params.spcl_ritual_time);
    }
    setTempleImage(props.route.params.spcl_ritual_image);
    setTempleVideo(props.route.params.spcl_ritual_video);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerPart}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather name="chevron-left" color={'#555454'} size={30} />
          <Text style={styles.headerText}>Edit Ritual</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.topBanner}>
          <Image style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, }} source={{ uri: 'https://images.fineartamerica.com/images/artworkimages/medium/3/jagannath-temple-in-puri-heritage.jpg' }} />
        </View>
        <View style={styles.cardBox}>
          <View style={{ width: '95%', alignSelf: 'center' }}>
            <Text style={[styles.label, (isFocused === 'ritual_name' || ritual_name !== '') && styles.focusedLabel]}>Ritual Name</Text>
            <TextInput
              style={[styles.input, (isFocused === 'ritual_name' || ritual_name !== '') && styles.focusedInput]}
              value={ritual_name}
              onChangeText={(text) => setRitual_name(text)}
              onFocus={() => setIsFocused('ritual_name')}
              onBlur={() => setIsFocused(null)}
            />
          </View>

          {/* Ritual Date Field */}
          <View style={{ width: '95%', alignSelf: 'center' }}>
            <Text style={[styles.label, ritualDate && styles.focusedLabel]}>Ritual Date</Text>
            <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
              <TextInput
                style={[styles.input, ritualDate && styles.focusedInput]}
                value={ritualDate ? moment(ritualDate).format('DD-MM-YYYY') : ''}
                // placeholder="Select Ritual Date"
                // placeholderTextColor={'#7d7b7a'}
                editable={false}
              />
            </TouchableOpacity>
          </View>

          {/* Ritual Time Field */}
          <View style={{ width: '95%', alignSelf: 'center' }}>
            <Text style={[styles.label, ritualTime && styles.focusedLabel]}>Ritual Time</Text>
            <TouchableOpacity onPress={() => setOpenTimePicker(true)}>
              <TextInput
                style={[styles.input, ritualTime && styles.focusedInput]}
                value={ritualTime ? moment(ritualTime).format('hh:mm A') : ''}
                // placeholder="Select Ritual Time"
                // placeholderTextColor={'#7d7b7a'}
                editable={false}
              />
            </TouchableOpacity>
          </View>

          {/* DatePicker Modal */}
          <DatePicker
            modal
            open={openDatePicker}
            date={ritualDate || new Date()}
            mode="date"
            onConfirm={(date) => {
              setOpenDatePicker(false);
              setRitualDate(date);
            }}
            onCancel={() => setOpenDatePicker(false)}
          />

          {/* TimePicker Modal */}
          <DatePicker
            modal
            open={openTimePicker}
            date={ritualTime || new Date()}
            mode="time"
            onConfirm={(time) => {
              setOpenTimePicker(false);
              setRitualTime(time);
            }}
            onCancel={() => setOpenTimePicker(false)}
          />

          <View style={{ width: '95%', alignSelf: 'center' }}>
            <Text style={[styles.label, (isFocused === 'ritual_tithi' || ritual_tithi !== '') && styles.focusedLabel]}>Ritual Tithi</Text>
            <TextInput
              style={[styles.input, (isFocused === 'ritual_tithi' || ritual_tithi !== '') && styles.focusedInput]}
              value={ritual_tithi}
              onChangeText={(text) => setRitual_tithi(text)}
              onFocus={() => setIsFocused('ritual_tithi')}
              onBlur={() => setIsFocused(null)}
            />
          </View>

          <View style={{ width: '95%', alignSelf: 'center' }}>
            <Text style={[styles.label, (isFocused === 'ritual_desc' || ritual_desc !== '') && styles.focusedLabel]}>Description</Text>
            <TextInput
              style={[styles.input, (isFocused === 'ritual_desc' || ritual_desc !== '') && styles.focusedInput]}
              value={ritual_desc}
              onChangeText={(text) => setRitual_desc(text)}
              onFocus={() => setIsFocused('ritual_desc')}
              onBlur={() => setIsFocused(null)}
            />
          </View>
        </View>

        {/* Image Upload Section */}
        <View style={styles.cardBox}>
          <Text style={styles.subHeaderText}>Upload Ritual Images</Text>
          <TouchableOpacity style={styles.filePicker} onPress={selectImage}>
            <TextInput
              style={styles.filePickerText}
              editable={false}
              placeholder={templeImage}
              placeholderTextColor={'#000'}
            />
            <View style={styles.chooseBtn}>
              <Text style={styles.chooseBtnText}>Choose Files</Text>
            </View>
          </TouchableOpacity>
          {/* Display selected images with remove (cross) icon */}
          <View style={styles.imagePreviewContainer}>
            {templeImageSource ? (
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: templeImageSource.uri }}
                  style={styles.imagePreview}
                />
                <TouchableOpacity
                  style={styles.removeIcon}
                  onPress={() => setTempleImageSource(null)}
                >
                  <Icon name="close" size={20} color="black" />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>

        {/* Video Upload Section */}
        <View style={styles.cardBox}>
          <Text style={styles.subHeaderText}>Upload Ritual Videos</Text>
          <TouchableOpacity style={styles.filePicker} onPress={selectTempleVideos}>
            <TextInput
              style={styles.filePickerText}
              editable={false}
              placeholder={templeVideo}
              placeholderTextColor={'#000'}
            />
            <View style={styles.chooseBtn}>
              <Text style={styles.chooseBtnText}>Choose Files</Text>
            </View>
          </TouchableOpacity>

          {/* Display selected videos with custom play/pause control */}
          <View style={styles.videoPreviewContainer}>
            {templeVideoSource ? (
              <View style={styles.videoWrapper}>
                <Video
                  source={{ uri: templeVideoSource.uri }}
                  style={styles.videoPreview}
                  paused={videoPaused}
                />
                <TouchableOpacity
                  style={styles.playPauseBtn}
                  onPress={() => setVideoPaused(!videoPaused)}
                >
                  <Icon
                    name={videoPaused ? 'play-arrow' : 'pause'}
                    size={30}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity onPress={submitRitual}>
          <LinearGradient
            colors={['#c9170a', '#f0837f']}
            style={styles.submitButton}
          >
            <Text style={styles.submitText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditRitual;

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
    // marginBottom: 10
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 3,
    // marginLeft: 5,
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
    marginBottom: 15
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
    marginBottom: 10,
    borderRadius: 10
  },
  label: {
    color: '#757473',
    fontSize: 16,
    marginTop: 15,
  },
  focusedLabel: {
    color: '#56ab2f',
    fontSize: 16,
    fontWeight: '500',
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
    borderBottomWidth: 2,
  },
  subHeaderText: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  filePicker: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  imagePreviewContainer: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageWrapper: {
    position: 'relative',
    margin: 5,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeIcon: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 2,
  },
  videoPreviewContainer: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'center',
  },
  videoWrapper: {
    position: 'relative',
    margin: 5,
    alignItems: 'center',
  },
  videoPreview: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  playPauseBtn: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
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
});
