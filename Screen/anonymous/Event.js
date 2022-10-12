import { Image, ScrollView, useToast } from 'native-base';
import React from 'react';
import { Dimensions, Text, View, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import * as Sharing from 'expo-sharing';
import { LoadingModal } from '../../component/loading';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Clipboard from 'expo-clipboard';
import NetInfo from '@react-native-community/netinfo';
import * as Permissions from 'expo-permissions';

const widthWindow = Dimensions.get('window').width;

export const AnonymousEventScreen = ({ route, navigation }) => {
  const toast = useToast();
  const { data } = route.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [checkNetworkStatus, setCheckNetworkStatus] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(false);
    if (data == undefined) {
      navigation.navigate('HomeScreen');
    }
  }, []);

  let newDate = new Date(Date.now());

  const fileName = `${Date.now()}`;
  const fileLocation = `${FileSystem.documentDirectory}`;
  const fileUri = `${fileLocation}${fileName}.jpg`;

  const DownloadFile = async (url) => {
    setCheckNetworkStatus(checkNetworkStatus + 1);
    setIsLoading(true);

    toast.show({
      title: 'Downloading Image...',
      duration: 2000,
    });
    setIsLoading(false);
    await FileSystem.downloadAsync(url, fileUri)
      .then(async (res) => {
        setIsLoading(false);
        if (res.status == 200) {
          const { status } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
          );

          if (status != 'granted') {
            alert('Sorry, we need device permissions to download the image.');
            await Permissions.askAsync(Permissions.CAMERA_ROLL);
          }

          if (status == 'granted') {
            const asset = await MediaLibrary.createAssetAsync(res.uri);
            await MediaLibrary.createAlbumAsync('AAP', asset, false);
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  React.useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        dispatch({ type: 'CONNECTION_AVAILABLE', payload: true });
      } else {
        dispatch({ type: 'CONNECTION_NOT_AVAILABLE', payload: false });
      }
    });
  }, [checkNetworkStatus]);

  const openShareDialogAsync = async (url, text) => {
    setCheckNetworkStatus(checkNetworkStatus + 1);
    setIsLoading(true);
    toast.show({
      title: 'Sharing...',
      duration: 2000,
    });
    const options = {
      mimeType: 'image/jpeg',
      dialogTitle: text,
    };

    await FileSystem.downloadAsync(url, fileUri).then(async (res) => {
      if (res.status == 200) {
        if (!(await Sharing.isAvailableAsync())) {
          alert(
            `Sorry, sharing isn't available on this device, you can download the image and share.`
          );
          setIsLoading(false);
          return;
        }
        await Sharing.shareAsync(res.uri, options);
      }
    });
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#EDEDF1' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#EDEDF1" />
      <SafeAreaView>
        <View
          style={{
            marginBottom: '-13%',
            marginLeft: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="ios-arrow-back-outline"
              size={34}
              color="grey"
              style={{ elevation: 12 }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          view={{ height: '90%' }}
          style={{
            marginTop: 10,
            paddingBottom: 30,
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 45,
              paddingRight: 10,
              marginTop: 30,
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Todays Event.
            </Text>
            <Text style={{ paddingRight: 25, fontSize: 12, fontWeight: '600' }}>
              Todays Date: {newDate.toDateString()}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              elevation: 10,
              marginTop: 20,
            }}>
            <Image
              size={`${widthWindow - 40}`}
              source={{ uri: data.image }}
              resizeMode="contain"
              alt={data.title}
              style={{
                borderRadius: 16,
                borderColor: 'black',
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 30,
              marginBottom: 50,
            }}>
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 24,
                  textAlign: 'center',
                  paddingLeft: 10,
                  paddingRight: 10,
                }}>
                {data.title}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  padding: 5,
                  color: '#727272',
                  textAlign: 'center',
                }}>
                {data.subtitle}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#F6F6F6',
            width: '100%',
            bottom: -14,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            elevation: 10,
            borderColor: 'black',
            alignItems: 'center',
          }}>
          <View style={{}}>
            <TouchableOpacity
              onPress={async () => {
                setCheckNetworkStatus(checkNetworkStatus + 1);
                await openShareDialogAsync(data.img, data.subtitle);
              }}>
              <Ionicons
                name="share-social-outline"
                size={38}
                color="#2818DF"
                style={{
                  alignSelf: 'center',
                  transform: [
                    {
                      rotate: '-4deg',
                    },
                  ],
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                }}>
                Share With Friends.
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={async () => {
                setCheckNetworkStatus(checkNetworkStatus + 1);
                Clipboard.setString(data.subtitle);
              }}>
              <Ionicons
                name="ios-copy-outline"
                size={38}
                color="#2818DF"
                style={{
                  alignSelf: 'center',
                  transform: [
                    {
                      rotate: '-4deg',
                    },
                  ],
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                }}>
                Copy Text.
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={async () => {
                setCheckNetworkStatus(checkNetworkStatus + 1);
                DownloadFile(data.image);
              }}>
              <Ionicons
                name="ios-download-outline"
                size={38}
                color="#2818DF"
                style={{
                  alignSelf: 'center',
                  transform: [
                    {
                      rotate: '-4deg',
                    },
                  ],
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                }}>
                Download Image.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {isLoading && <LoadingModal />}
    </View>
  );
};
