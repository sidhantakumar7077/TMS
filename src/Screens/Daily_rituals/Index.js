import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';

const Index = (props) => {

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [activeIndex, setActiveIndex] = useState(null);
  const [ritualDetails, setRitualDetails] = useState({});
  const [isFocused, setIsFocused] = useState({});
  const [openStartPicker, setOpenStartPicker] = useState({}); // For opening start time picker for each day
  const [openEndPicker, setOpenEndPicker] = useState({}); // For opening end time picker for each day
  const [timeError, setTimeError] = useState({}); // For handling time errors for each day
  const [ritualImages, setRitualImages] = useState({});

  const handleFocus = (day, field) => {
    setIsFocused(prevState => ({ ...prevState, [day]: field }));
  };

  const validateEndTime = (day, selectedEndTime) => {
    if (ritualDetails[day]?.startTime && selectedEndTime <= ritualDetails[day]?.startTime) {
      setTimeError(prevState => ({ ...prevState, [day]: 'End time must be greater than start time' }));
      setRitualDetails(prevState => ({
        ...prevState,
        [day]: { ...prevState[day], endTime: null }
      }));
    } else {
      setTimeError(prevState => ({ ...prevState, [day]: null }));
      setRitualDetails(prevState => ({
        ...prevState,
        [day]: { ...prevState[day], endTime: selectedEndTime }
      }));
    }
  };

  const openTimePicker = (day, type) => {
    if (type === 'start') {
      setOpenStartPicker(prevState => ({ ...prevState, [day]: true }));
    } else {
      setOpenEndPicker(prevState => ({ ...prevState, [day]: true }));
    }
  };

  const selectTempleImages = async (day) => { // Pass day as an argument
    const options = {
      title: 'Select Images',
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
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
        const selectedImages = response.assets;
        // Update the state for images corresponding to the selected day
        setRitualImages(prevState => ({
          ...prevState,
          [day]: [...(prevState[day] || []), ...selectedImages],
        }));
      }
    });
  };

  const removeImage = (day, indexToRemove) => {
    const updatedImages = ritualImages[day].filter((_, index) => index !== indexToRemove);
    setRitualImages(prevState => ({
      ...prevState,
      [day]: updatedImages,
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Daily Rituals</Text>

      {daysOfWeek.map((day, index) => (
        <Collapse key={index} isExpanded={activeIndex === index} onToggle={() => setActiveIndex(activeIndex === index ? null : index)}>

          <CollapseHeader>
            <View style={[styles.collapseHeader, activeIndex === index && styles.activeHeader]}>
              <Text style={styles.collapseHeaderText}>{day}</Text>
              <Icon name={activeIndex === index ? 'remove' : 'add'} size={24} color="#000" />
            </View>
          </CollapseHeader>

          <CollapseBody style={styles.cardBox}>
            <View style={[styles.formGroup, { marginTop: 10 }]}>
              <Text style={[styles.label, (isFocused[day] === 'ritualName' || ritualDetails[day]?.ritualName) && styles.focusedLabel]}>Ritual Name</Text>
              <TextInput
                style={[styles.input, (isFocused[day] === 'ritualName' || ritualDetails[day]?.ritualName) && styles.focusedInput]}
                onFocus={() => handleFocus(day, 'ritualName')}
                onBlur={() => handleFocus(day, null)}
                onChangeText={(text) => setRitualDetails(prevState => ({
                  ...prevState,
                  [day]: { ...prevState[day], ritualName: text }
                }))}
                value={ritualDetails[day]?.ritualName || ''}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, ritualDetails[day]?.startTime && styles.focusedLabel]}>Prasad Start Time</Text>
              <TouchableOpacity onPress={() => openTimePicker(day, 'start')}>
                <TextInput
                  style={[styles.input, ritualDetails[day]?.startTime && styles.focusedInput]}
                  value={
                    ritualDetails[day]?.startTime
                      ? ritualDetails[day].startTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })
                      : ''
                  }
                  editable={false}
                />
              </TouchableOpacity>

              <Text style={[styles.label, ritualDetails[day]?.endTime && styles.focusedLabel]}>Prasad End Time</Text>
              <TouchableOpacity onPress={() => openTimePicker(day, 'end')}>
                <TextInput
                  style={[styles.input, ritualDetails[day]?.endTime && styles.focusedInput, timeError[day] && { borderBottomColor: 'red' }]}
                  value={
                    ritualDetails[day]?.endTime
                      ? ritualDetails[day].endTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })
                      : ''
                  }
                  editable={false}
                />
              </TouchableOpacity>
              {timeError[day] && <Text style={styles.errorText}>{timeError[day]}</Text>}
            </View>

            {/* Start Time Picker */}
            <DatePicker
              modal
              mode="time"
              open={openStartPicker[day]}
              date={ritualDetails[day]?.startTime || new Date()}
              onConfirm={(time) => {
                setOpenStartPicker(prevState => ({ ...prevState, [day]: false }));
                setRitualDetails(prevState => ({
                  ...prevState,
                  [day]: { ...prevState[day], startTime: time }
                }));
              }}
              onCancel={() => setOpenStartPicker(prevState => ({ ...prevState, [day]: false }))}
            />

            {/* End Time Picker */}
            <DatePicker
              modal
              mode="time"
              open={openEndPicker[day]}
              date={ritualDetails[day]?.endTime || new Date()}
              onConfirm={(time) => {
                setOpenEndPicker(prevState => ({ ...prevState, [day]: false }));
                validateEndTime(day, time);
              }}
              onCancel={() => setOpenEndPicker(prevState => ({ ...prevState, [day]: false }))}
            />

            {/* Image Upload Section */}
            <View>
              <Text style={styles.subHeaderText}>Ritual Images</Text>
              <TouchableOpacity style={styles.filePicker} onPress={() => selectTempleImages(day)}>
                <TextInput
                  style={styles.filePickerText}
                  editable={false}
                  placeholder={`Uploaded ${ritualImages[day]?.length || 0} Images`}
                  placeholderTextColor={'#000'}
                />
                <View style={styles.chooseBtn}>
                  <Text style={styles.chooseBtnText}>Choose Files</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.imagePreviewContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {ritualImages[day]?.map((image, index) => (
                    <View key={index} style={styles.imageWrapper}>
                      <Image source={{ uri: image.uri }} style={styles.imagePreview} />
                      <TouchableOpacity style={styles.removeIcon} onPress={() => removeImage(day, index)}>
                        <Icon name="cancel" size={24} color="red" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, (isFocused[day] === 'description' || ritualDetails[day]?.description) && styles.focusedLabel]}>Description</Text>
              <TextInput
                style={[styles.textArea, (isFocused[day] === 'description' || ritualDetails[day]?.description) && styles.focusedInput]}
                multiline={true}
                onFocus={() => handleFocus(day, 'description')}
                onBlur={() => handleFocus(day, null)}
                onChangeText={(text) => setRitualDetails(prevState => ({
                  ...prevState,
                  [day]: { ...prevState[day], description: text }
                }))}
                value={ritualDetails[day]?.description || ''}
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.addButton}>
                <Entypo name="plus" size={30} color={'#fff'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate('Darshan_time')} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </CollapseBody>
        </Collapse>
      ))}
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginVertical: 20,
  },
  collapseHeader: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ffe3e3',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  activeHeader: {
    backgroundColor: '#ffd1d1',
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
  collapseHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  formGroup: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#757473',
    marginBottom: 10,
    color: '#333',
  },
  focusedInput: {
    borderBottomColor: '#56ab2f',
    borderBottomWidth: 2,
  },
  focusedLabel: {
    color: '#56ab2f',
  },
  textArea: {
    borderBottomWidth: 1,
    borderBottomColor: '#757473',
    marginBottom: 10,
    color: '#333',
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20
  },
  addButton: {
    backgroundColor: '#028A0F',
    borderRadius: 8,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#FF0000',
    width: 100,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitButtonText: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -5,
    marginBottom: 20,
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
});
