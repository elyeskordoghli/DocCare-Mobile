import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import CommonBtn from '../components/CommonBtn';
const Home = ({ navigation }) => {
  const categories = [
    { id: '1', image: require('../images/cardiology.png'), name: 'Cardiology', availability: true },
    { id: '2', image: require('../images/pulmonlogy.png'), name: 'Pulmonlogy', availability: false },
    { id: '2', image: require('../images/Dental_care.png'), name: 'Dental Care', availability: false },

    // Add more categories as needed
  ];

  const onPressApplyPrediction = (categoryId) => {
    // Navigate to the form page for the selected category
    navigation.navigate('PredictionForm', { categoryId });
  };
  const onPressBookAppointment= () => {
    // Navigate to the form page for the selected category
    navigation.navigate('BookAppointment');
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Header title={'DocCareApp'} icon={require('../images/logo.png')} />
          <Image
            source={require('../images/banner.jpg')}
            style={styles.banner}
          />
          <Text style={styles.heading}>Select Category</Text>
          <View style={{ marginTop: 20 }}>
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.categoryItem}>
                  <Image source={item.image} style={styles.categoryImage} />
                  <Text style={styles.categoryName}>{item.name}</Text>

                  <TouchableOpacity
                    onPress={() => onPressApplyPrediction(item.id)}
                    style={styles.categoryButton}>
                    <Text>Apply Prediction</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          <Text style={styles.heading}>Top Rated Doctors</Text>
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <FlatList
              numColumns={2}
              data={[1, 1, 1, 1, 1, 1]}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.docItem}>
                    <Image
                      source={require('../images/doctor.png')}
                      style={styles.docImg}
                    />
                    <Text style={styles.docName}>Doctor {index + 1}</Text>
                    <Text style={styles.docSpl}>Skin Specialist</Text>
                    <Text
                      style={[
                        styles.status,
                        {
                          color: index / 2 == 0 ? 'green' : 'red',
                          opacity: index / 2 == 0 ? 1 : 0.5,
                        },
                      ]}>
                      {index / 2 == 0 ? 'Available' : 'Busy'}
                    </Text>
                    <TouchableOpacity
                      onPress={onPressBookAppointment}
                      style={styles.SignUpBtn}>
                      <Text>Book Appointment</Text>
                    </TouchableOpacity>
                    {/* <CommonBtn
                      w={150}
                      h={40}
                      status={index / 2 == 0 ? true : false}
                      txt={'Book Appointment'}
                      onClick={() => {
                        if (index / 2 == 0) {
                          navigation.navigate('BookAppointment');
                        }
                      }}
                    /> */}
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Completed');
          }}>
          <Image
            source={require('../images/completed.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Pending');
          }}>
          <Image
            source={require('../images/pending.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CallAmb');
          }}>
          <Image
            source={require('../images/ambulance.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  heading: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 15,
    marginLeft: 15,
  },
  linearGradient: {
    width: 120,
    height: 80,
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  categoryItem: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  categoryImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  categorySpecialist: {
    fontSize: 14,
    color: '#555',
  },
  categoryStatus: {
    fontSize: 12,
    marginTop: 5,
  },
  categoryButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#65aad7',
    borderRadius: 5,
    alignItems: 'center',
  },
  docItem: {
    width: '45%',

    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.2,
    margin: 10,
  },
  docImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20,
  },
  docName: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 10,
  },
  docSpl: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '600',
    alignSelf: 'center',
    color: 'green',
    backgroundColor: '#f2f2f2',
    padding: 5,
    borderRadius: 10,
  },
  status: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '600',
    alignSelf: 'center',
  },
  bottomView: {
    width: '90%',
    height: 60,
    borderRadius: 10,
    elevation: 5,
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bottomIcon: {
    width: 30,
    height: 30,
  },
  SignUpBtn: {
    width: "80%",
    backgroundColor: "#65aad7",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10
  },
});
