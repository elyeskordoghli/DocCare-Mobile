import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import * as ImagePicker from 'expo-image-picker';


LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'fr';

let DaysList = [];

const BookAppointment = ({ navigation }) => {

  const [images, setImages] = useState(null);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true, // Autoriser la sélection de plusieurs images
    });

    console.log(result);

    if (!result.canceled) {
      setImages(result.assets);
    }
  };



  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(-1);
  const [selectedGender, setSelectedGender] = useState(0);
  const [availableSlots, setAvailableSlots] = useState([]);

  const [selectedDay, setSelectedDay] = useState(-1);


  const [isNewPatient, setIsNewPatient] = useState(false);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [DateN, setDateN] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [Num, setNum] = useState("");
  const [zipBlob, setZipBlob] = useState(null);

  const availableSlotsData = {
    '2023-11-20': [
      { sloT: '10:00-12:00PM' },
      { sloT: '12:00-02:00PM' },
      { sloT: '02:00-04:00PM' },
    ],
    '2023-11-21': [
      { sloT: '09:00-11:00AM' },
      { sloT: '01:00-03:00PM' },
      { sloT: '04:00-06:00PM' },
    ],
  };

  useEffect(() => {
    if (selectedDate && availableSlotsData[selectedDate]) {
      setAvailableSlots(availableSlotsData[selectedDate]);
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setSelectedDay(day.day);
    console.log('selected day', day);
  };

  const handleBookAppointment = async () => {
    if (selectedDate && selectedSlot !== -1) {
      const selectedTimeSlot = availableSlots[selectedSlot].sloT;



      // const patientData = {
      //   Nom: isNewPatient ? newPatientName : existingPatientName,
      //   Prenom: isNewPatient ? newPatientLastName : existingPatientLastName,
      //   DateN: isNewPatient ? newPatientBirthday : existingPatientBirthday,
      //   Adresse: isNewPatient ? newPatientAddress : existingPatientAddress,
      //   Num: isNewPatient ? newPatientPhone : existingPatientPhone,
      //   // Ajoutez d'autres champs de patient en fonction de vos besoins
      //   // ...
      // };

      const formData = new FormData();

      // // Ajoutez les données du patient au formulaire
      // Object.keys(patientData).forEach((key) => {
      //   formData.append(key, patientData[key]);
      // });

      // Ajoutez d'autres champs du formulaire en fonction de vos besoins
      formData.append('Date', selectedDate);
      formData.append('Time', selectedTimeSlot);
      formData.append('Status', 'show');
      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('DateN', DateN);
      formData.append('Adresse', Adresse);
      formData.append('Num', Num);// Vous pouvez ajuster le statut selon vos besoins
      // formData.append('DossierMedical', dossierMedicalFile); // Ajoutez le fichier médical ici
      formData.append('DossierMedical', images);

      try {
        const response = await fetch('http://10.0.2.2:5149/api/Consultation/Create', {
          method: 'POST',
          body: formData,
        });
        console.log("ffffffffff", formData)
        if (response.ok) {
          const result = await response.json();
          console.log(result.message);
          // Naviguez vers l'écran de réussite ou effectuez d'autres actions après la réservation
          navigation.navigate('Success');
        } else {
          const errorResult = await response.json();
          console.error('Erreur lors de la réservation :', errorResult.message);
        }
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la réservation :', error);
      }
    } else {
      alert('Veuillez sélectionner une date et un créneau horaire avant de réserver.');
    }
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Header
          icon={require('../images/back.png')}
          title={'Book Appointment'}
        />
        <View style={styles.headerContainer}>
          <View style={styles.leftContainer}>
            <Image source={require('../images/doctor.png')} style={styles.docImg} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.name}>Doctor Jack</Text>
            <Text style={styles.spcl}>Skin Doctor</Text>
          </View>
        </View>
        <Text style={styles.heading}>Select Date</Text>
        <View>
          <Calendar
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              height: 370,
              marginTop: 20,
              marginBottom: 10
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e',
            }}
            current={'2023-11-20'}
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
              },
            }}
          />
        </View>
        {selectedDate && (
          <>
            <Text style={styles.heading}>Available Slots for {selectedDate}</Text>
            <View>
              <FlatList
                numColumns={2}
                data={availableSlots}
                keyExtractor={({ item, index }) => index}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.timeSlot,
                        { borderColor: index == selectedSlot ? 'blue' : 'black' },
                      ]}
                      onPress={() => {
                        setSelectedSlot(index);
                      }}>
                      <Text
                        style={{ color: index == selectedSlot ? 'blue' : 'black' }}>
                        {item.sloT}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </>
        )}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.NewBtn}
            onPress={() => setIsNewPatient(!isNewPatient)}>
            <Text style={styles.label}>Click if you're a new patient </Text>
          </TouchableOpacity>
        </View>
        {isNewPatient ? (
          <>
            <Text style={styles.heading}>Patient Name</Text>
            <TextInput
              style={styles.nameInput}
              placeholder={'Enter Name'}
              onChangeText={setNom} />
            <Text
              style={styles.heading}>Patient Last Name</Text>
            <TextInput
              style={styles.nameInput}
              placeholder={'Enter Last Name'}
              onChangeText={setPrenom} />
            <Text style={styles.heading}>Patient Birthday</Text>
            <TextInput style={styles.nameInput} placeholder={'Birthday'}
              onChangeText={setDateN} />
            <Text style={styles.heading}>Patient Address</Text>
            <TextInput style={styles.nameInput} placeholder={'Address'}
              onChangeText={setAdresse} />
            <Text style={styles.heading}>Phone Number</Text>
            <TextInput
              style={styles.nameInput}
              placeholder={'Phone'}
              onChangeText={setNum} />
          </>
        ) : (
          <>
            {/* Formulaire pour un patient existant */}
            <Text style={styles.heading}>Patient Name</Text>
            <TextInput
              style={styles.nameInput}
              placeholder={'Enter Name'}
              onChangeText={setNom} />
            <Text
              style={styles.heading}>Patient Last Name</Text>
            <TextInput
              style={styles.nameInput}
              placeholder={'Enter Last Name'}
              onChangeText={setPrenom} />
            <Text style={styles.heading}>Medical field</Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Button title="Pick images from camera roll" onPress={pickImages} />
              {images && images.length > 0 && images.map((img, index) => (
                <Image key={index} source={{ uri: img.uri }} style={{ width: 200, height: 200 }} />
              ))}
            </View>


            {/* Ajoutez d'autres champs selon vos besoins */}
          </>
        )}

        <View>
          <TouchableOpacity
            onPress={handleBookAppointment}
            style={styles.BookBtn}>
            <Text>Book Now</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 20,
    marginLeft: 30,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 2,
    marginLeft: 15,
  },
  docImg: {
    width: 100,
    height: 100,
    borderRadius: 50,  // La moitié de la largeur/hauteur pour rendre l'image ronde

  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },
  spcl: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
    color: '#65aad7',
    padding: 5,
    borderRadius: 10,
  },
  heading: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 30,
    marginLeft: 15,
  },
  timeSlot: {
    width: '45%',
    height: 40,
    borderRadius: 10,
    borderWidth: 0.5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameInput: {
    borderRadius: 10,
    marginTop: 10,
    width: '94%',
    height: 45,
    borderWidth: 0.5,
    alignSelf: 'center',
    paddingLeft: 20,
  },
  genderView: {
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  gender: {
    borderRadius: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BookBtn: {
    width: '80%',
    backgroundColor: '#65aad7',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 40,
    marginBottom: 20,
  },
  NewBtn: {
    width: '80%',
    backgroundColor: '#65aad7',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 40,
    marginBottom: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
