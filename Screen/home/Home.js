import { Avatar, Image, StatusBar } from 'native-base';
import React from 'react';
import { Text, View, ScrollView, AsyncStorage, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../component/card';
import { DownloadedComponent } from '../../component/Downloaded';
import { GalleryModal } from '../../component/galleryModal';
import { ProfileModal } from '../../component/ProfileModal';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import NetInfo from '@react-native-community/netinfo';
import { fetchEvent } from '../../actions/fetchEvent';
import EventSkeleton from '../../component/skeleton/eventSkeleton';
import { configData } from '../../config';
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from '../../component/home/topBar';

const today = () => {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  return day + '-' + month + '-' + year;
};

export default Home = ({ navigation }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = React.useState(false);
  const { user, downloaded } = useSelector((state) => ({
    ...state,
  }));
  const dispatch = useDispatch();
  const [galleryPermissions, setGalleryPermissions] = React.useState(false);
  const [checkNetworkStatus, setCheckNetworkStatus] = React.useState(1);
  const [validImages, setValidImages] = React.useState(null);
  const [eventData, setEventData] = React.useState(null);
  const [noEventMessage, setNoEventMessage] = React.useState('');
  const [res, setRes] = React.useState();
  const [loadingEvent, setLoadingEvent] = React.useState(false);
  const [loadingDownloadedEvents, setLoadingDownloadedEvents] =
    React.useState(false);

  React.useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        dispatch({ type: 'CONNECTION_AVAILABLE', payload: true });
      } else {
        dispatch({ type: 'CONNECTION_NOT_AVAILABLE', payload: false });
      }
    });
  }, [checkNetworkStatus]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeGalleryModal = () => {
    setGalleryModalOpen(false);
  };

  React.useEffect(async () => {
    setLoadingEvent(true);
    const res = await fetchEvent();
    setEventData(null);
    setRes(res);
    if (res.response == 'success') {
      setEventData([]);
      const data = [];
      for (let i in res.data.events) {
        const { description } = res.data.events[i];
        var event = {};
        event.subtitle = description.subtitle;
        event.title = description.title;
        event.image = `${configData.imgServer}/${user.party}/${
          user.vidhanShabha
        }/${today()}/EVENT${parseInt(i) + 1}/${user.userId}.jpg`;
        data.push(event);
      }
      setEventData(data);
      setLoadingEvent(false);
    } else if (res.response == 'null') {
      setNoEventMessage('No Event to Show for Today.');
      setLoadingEvent(false);
    } else {
      console.log('Err');
    }
  }, []);

  React.useEffect(async () => {
    const askPermission = async () => {
      const isCameraRollEnabled = await Permissions.getAsync(
        Permissions.CAMERA_ROLL
      );
      if (isCameraRollEnabled.granted) {
        setGalleryPermissions(true);
        return;
      }
      const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (granted) {
        const cameraRollRes = await Permissions.getAsync(
          Permissions.CAMERA_ROLL
        );
        if (cameraRollRes.granted) {
          setGalleryPermissions(true);
        }
      } else {
        setGalleryPermissions(false);
      }
    };
    await askPermission();
  }, []);

  React.useEffect(async () => {
    await loadAllAlbums();
  }, [galleryPermissions, dispatch]);

  React.useEffect(async () => {
    if (downloaded == true) {
      setValidImages(null);
      await loadAllAlbums();
    }
  }, [downloaded]);

  const loadAllAlbums = async () => {
    setLoadingDownloadedEvents(true);
    const albumName = user.party;
    const getPhotos = await MediaLibrary.getAlbumAsync(albumName);
    if (getPhotos == null) {
      setValidImages([]);
      setLoadingDownloadedEvents(false);
      return;
    }
    const { totalCount } = await MediaLibrary.getAssetsAsync({
      album: getPhotos,
      sortBy: ['creationTime'],
      mediaType: ['photo'],
    });
    const getAllPhotos = await MediaLibrary.getAssetsAsync({
      first: totalCount,
      album: getPhotos,
      sortBy: ['creationTime'],
      mediaType: ['photo'],
    });

    let validImagesData = [];
    if (getAllPhotos.totalCount > 0) {
      for (let i = 0; i < getAllPhotos.totalCount; i++) {
        let data = getAllPhotos.assets[i];
        const localResponse = await AsyncStorage.getItem(
          `${data.filename.substring(0, data.filename.length - 4)}`
        );
        if (localResponse) {
          data.title = JSON.parse(localResponse).title;
          9;
          data.subtitle = JSON.parse(localResponse).subtitle;
          validImagesData.push(data);
        }
      }
      setValidImages(validImagesData);
    }
    dispatch({ type: 'SET_DOWNLOADED_FALSE', payload: null });
    setLoadingDownloadedEvents(false);
  };

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../../assets/splash.jpg')}
          size={'full'}
          alt={'splash screen'}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#EDEDF1' }}>
      <StatusBar backgroundColor="#EDEDF1" barStyle={'dark-content'} />
      {modalOpen && <ProfileModal close={closeModal} open={openModal} />}
      {galleryModalOpen && <GalleryModal close={closeGalleryModal} />}
      <SafeAreaView style={{ marginTop: 20 }}>
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
            {configData.commonScreens.appName}
          </Text>
        </View>
        <TopBar username={user.name} openModal={openModal} />
        <View>
          <View style={{ position: 'absolute', right: '5%' }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PastDaysEvent');
              }}>
              <Ionicons name="calendar" size={30} color={'#727272'} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          view={{ height: '100%' }}
          style={{
            marginTop: 10,
            paddingBottom: 30,
            width: '100%',
          }}
          showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                paddingTop: 20,
                marginLeft: 32,
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: '#727272',
                }}>
                Your Todays Events
              </Text>
            </View>
            <ScrollView
              style={{
                flexDirection: 'row',
                padding: 20,
                paddingLeft: 12,
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
                        navigation.navigate('EventScreen', {
                          data,
                          title: data.title,
                          local: false,
                        })
                      }>
                      <Card
                        image={data.image}
                        title={data.title}
                        caption={data.subtitle}
                      />
                    </TouchableOpacity>
                  );
                })}

              {!eventData && !loadingEvent && (
                <Card
                  image={configData.commonScreens.noEventFoundImage}
                  title={'No Event Found'}
                  caption={'No Event For Today.'}
                />
              )}
            </ScrollView>
          </View>
          <View style={{ marginLeft: 32 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#727272',
              }}>
              Your Downloaded images
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: 5,
              justifyContent: 'space-evenly',
            }}>
            {validImages &&
              validImages.length > 0 &&
              validImages.map((data, index) => {
                const newData = {
                  image: data.uri,
                  title: data.title,
                  subtitle: data.subtitle,
                };
                return (
                  <DownloadedComponent
                    key={index}
                    index={index}
                    data={newData}
                    navigation={navigation}
                  />
                );
              })}
            {!validImages ||
              (validImages.length == 0 && (
                <View
                  style={{
                    marginTop: '3%',
                    backgroundColor: '#fff',
                    paddingTop: 30,
                    paddingBottom: 30,
                    paddingLeft: '17%',
                    paddingRight: '17%',
                    borderRadius: 16,
                  }}>
                  <Text style={{ fontSize: 18 }}>No Downloaded Images</Text>
                </View>
              ))}
          </View>
          <View style={{ marginBottom: 100 }}></View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
