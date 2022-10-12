import { Avatar } from 'native-base';
import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { AnonymousCard } from '../component/anonymousCard';
import { CardView } from '../component/cardView';
import { GalleryModal } from '../component/galleryModal';
import { Logo } from '../component/Logo';
import NetInfo from '@react-native-community/netinfo';
import { fetchEvent } from '../actions/fetchEvent';
import EventSkeleton from '../component/skeleton/eventSkeleton';
import { fetchUpdates } from '../actions/fetchUpdates';
import { TopBar } from '../component/home/topBar';

const today = () => {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  return day + '-' + month + '-' + year;
};

export const AnonymousScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [eventData, setEventData] = React.useState(null);
  const [checkNetworkStatus, setCheckNetworkStatus] = React.useState(1);
  const [noEventMessage, setNoEventMessage] = React.useState('');
  const [loadingEvent, setLoadingEvent] = React.useState(false);
  const [updatesData, setUpdatesData] = React.useState(null);
  const [noUpdatesMessage, setNoUpdatesMessage] = React.useState('');
  const [updatesLoading, setUpdatesLoading] = React.useState(false);

  const [galleryModalOpen, setGalleryModalOpen] = React.useState(false);

  React.useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        dispatch({ type: 'CONNECTION_AVAILABLE', payload: true });
      } else {
        dispatch({ type: 'CONNECTION_NOT_AVAILABLE', payload: false });
      }
    });
  }, [checkNetworkStatus]);

  React.useEffect(async () => {
    setLoadingEvent(true);
    const res = await fetchEvent();
    setEventData(null);
    if (res.response == 'success') {
      setEventData([]);
      const data = [];
      for (let i in res.data.events) {
        const { description } = res.data.events[i];
        var event = {};
        event.subtitle = description.subtitle;
        event.title = description.title;
        event.image = description.image;
        data.push(event);
      }
      setEventData(data);
      setLoadingEvent(false);
    } else if (res.response == 'null') {
      setLoadingEvent(false);
      setNoEventMessage('No Event to Show for Today.');
    }
  }, []);

  React.useEffect(async () => {
    setUpdatesLoading(true);
    const res = await fetchUpdates();
    setUpdatesData(null);
    if (res.response == 'success') {
      setUpdatesData([]);
      const data = [];
      for (let i in res.data) {
        const { description } = res.data[i];
        var event = {};
        event.subtitle = description.subtitle;
        event.title = description.title;
        event.image = description.image;
        data.push(event);
      }
      setUpdatesData(data);
      setUpdatesLoading(false);
    } else if (res.response == 'null') {
      setUpdatesLoading(false);
      setNoUpdatesMessage('No Event to Show for Today.');
    }
  }, []);

  const openGalleryModal = () => {
    setGalleryModalOpen(true);
  };

  const closeGalleryModal = () => {
    setGalleryModalOpen(false);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('loginKey');
    await AsyncStorage.removeItem('anonymous');
    dispatch({
      type: 'ANONYMOUS_LOGIN',
      payload: null,
    });
  };
  return (
    <View style={{ flex: 1 }}>
      {galleryModalOpen && <GalleryModal close={closeGalleryModal} />}
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={{ paddingTop: 20, backgroundColor: '#fff' }}>
        <View
          style={{
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: '900',
              fontSize: 21,
              color: '#000',
            }}>
            AAP Volunteers
          </Text>
          <View style={{ position: 'absolute', right: '8%' }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={async () => {
                await logout();
              }}
              title="Logout">
              <View
                style={{
                  backgroundColor: '#5263ff',
                  height: 25,
                  width: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  shadowRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 11,
                  }}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TopBar username={'AAP Volunteers'} />
        <ScrollView
          view={{ height: '100%' }}
          style={{
            marginTop: 10,
            paddingBottom: 30,
            width: '100%',
          }}
          showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 10 }}></View>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 17,
              fontWeight: 'bold',
              color: '#727272',
            }}>
            Our Leaders.
          </Text>
          <ScrollView
            style={{
              flexDirection: 'row',
              padding: 20,
              paddingLeft: 12,
              paddingTop: 30,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {logos.map((data, index) => {
              return <Logo img={data.img} name={data.name} key={index} />;
            })}
          </ScrollView>

          <View>
            <View>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: '#727272',
                }}>
                Latest Events
              </Text>
            </View>
            <ScrollView
              style={{
                flexDirection: 'row',
                // padding: 20,
                marginLeft: 9,
                paddingTop: 5,
              }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {loadingEvent && <EventSkeleton />}
              {eventData &&
                !loadingEvent &&
                eventData.map((data, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      key={index}
                      onPress={() =>
                        navigation.navigate('AnonymousEventScreen', {
                          data,
                          title: data.title,
                          local: false,
                        })
                      }>
                      <AnonymousCard
                        title={data.title}
                        caption={data.subtitle}
                        image={data.image}
                      />
                    </TouchableOpacity>
                  );
                })}

              {!eventData && !loadingEvent && (
                <AnonymousCard
                  image={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLT830IGtqCBQ4YzkM3YZ9uCw65Av1zsa7OWfT07_CSShNYWkVONI4cqWQOFeQVoLmMxM&usqp=CAU'
                  }
                  title={'No Event Found'}
                  caption={'No Event For Today.'}
                />
              )}
            </ScrollView>
          </View>
          <View style={{ marginTop: 30 }}></View>
          <View>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginLeft: 20,
                  color: '#727272',
                }}>
                Latest Updates From Aam Aadmi Party
              </Text>
            </View>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              {updatesData &&
                updatesData.map((data, index) => (
                  <View key={index}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() =>
                        navigation.navigate('AnonymousEventScreen', {
                          data,
                          title: data.title,
                          local: false,
                        })
                      }>
                      <CardView
                        image={data.image}
                        title={data.title}
                        caption={data.subtitle}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
          </View>
          <View style={{ marginBottom: 100 }}></View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const logos = [
  {
    name: 'ARVIND KEJRIWAL JI',
    img: require('../assets/topleaders/1_ARVIND_KEJRIWAL.jpeg'),
  },
  {
    name: 'MANISH SISODIYA JI',
    img: require('../assets/topleaders/2_MANISH_SISODIYA.jpeg'),
  },
  {
    name: 'DINESH MOHANIYA JI',
    img: require('../assets/topleaders/3_DINESH_MOHANIYA.jpeg'),
  },
  {
    name: 'AJAY KOTHIYAL JI',
    img: require('../assets/topleaders/4_AJAY_KOTHIYAL.jpeg'),
  },
  {
    name: 'DEEPAL BALI JI',
    img: require('../assets/topleaders/5_DEEPAL_BALI.jpeg'),
  },
  {
    name: 'S S KALER JI',
    img: require('../assets/topleaders/6_S_S_KALER.jpeg'),
  },
  {
    name: 'RAJEEV CHAUDHARY JI',
    img: require('../assets/topleaders/7_RAJEEV_CHAUDHARY.jpeg'),
  },
  { name: 'ASWAHA JI', img: require('../assets/topleaders/8_ASWAHA.jpeg') },
  {
    name: 'ABHITABH SAXENA JI',
    img: require('../assets/topleaders/9_ABHITABH_SAXENA.jpeg'),
  },
  {
    name: 'NARENDRA GIRI JI',
    img: require('../assets/topleaders/11_NARENDRA_GIRI.jpeg'),
  },
  {
    name: 'SPS RAWAT JI',
    img: require('../assets/topleaders/12_S_P_S_RAWAT.jpeg'),
  },
  {
    name: 'BHOOPENDRA UPADHYAY JI',
    img: require('../assets/topleaders/14_BHOOPENDRA_UPADHYAY.jpeg'),
  },
  {
    name: 'YOGENDRA CHAUHAN JI',
    img: require('../assets/topleaders/16_YOGENDRA_CHAUHAN.jpeg'),
  },
  {
    name: 'DIGMOHAN NEGI JI',
    img: require('../assets/topleaders/18_DIGMOHAN_NEGI.jpeg'),
  },
];
