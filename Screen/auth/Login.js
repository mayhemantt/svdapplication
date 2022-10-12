import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Input, Icon, useToast, Image, Heading, Select } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from '@expo/vector-icons';
import { loginUser, registerAnonymousUser } from '../../actions/login';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingModal } from '../../component/loading';
import NetInfo from '@react-native-community/netinfo';
import { Selector } from '../../component/selector';

export default LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [error, setError] = React.useState([]);
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [checkNetworkStatus, setCheckNetworkStatus] = React.useState(1);
  const [isAnonymous, setIsAnonymous] = React.useState(false);
  const [selectedVidhanShabha, setSelectedVidhanShabha] = React.useState(null);

  const { network } = useSelector((state) => ({
    ...state,
  }));
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (error.length > 0) {
      for (let i in error) {
        toast.show({
          title: 'Something went wrong',
          status: 'error',
          description: `${error[i]}`,
        });
      }
    }
  }, [error.length]);

  React.useEffect(() => {
    setError([]);
    setPhoneNumber('');
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        dispatch({ type: 'CONNECTION_AVAILABLE', payload: true });
      } else {
        dispatch({ type: 'CONNECTION_NOT_AVAILABLE', payload: false });
      }
    });
  }, [checkNetworkStatus]);

  const inValidPhoneNumberError =
    'Please enter a valid 10 digit phone number to continue.';

  const onContinue = async () => {
    if (phoneNumber.length != 10) {
      setError((prevElement) => [...prevElement, inValidPhoneNumberError]);
      return;
    }
    setCheckNetworkStatus(checkNetworkStatus + 1);
    if (!network) {
      return;
    }

    if (isAnonymous) {
      try {
        setIsLoading(true);
        if (!selectedVidhanShabha) {
          toast.show({
            title: 'Please Select Your Vidhan Shabha.',
            status: 'error',
            description: 'To Continue You Need to Select Your Vidhan Shabha.',
          });
          return;
        }
        await registerAnonymousUser(phoneNumber, selectedVidhanShabha);
        await AsyncStorage.setItem('anonymous', 'true');
        toast.show({
          title: 'Logged in as Anonymous user',
          status: 'info',
          description: 'You are currently logged in as a Anonymous user.',
        });
        setIsLoading(false);

        dispatch({
          type: 'ANONYMOUS_LOGIN',
          payload: {
            name: 'AAP User',
          },
        });
        return;
      } catch (err) {
        setIsLoading(false);
        return;
      }
    }

    setIsLoading(true);
    try {
      const loginRes = await loginUser(phoneNumber);
      if (!loginRes) {
        toast.show({
          title: 'Error',
          status: 'error',
          description: `Something went wrong, please try again later.`,
        });
      } else if (loginRes.response == 'success') {
        const { data } = loginRes;
        const loginStatusData = JSON.stringify({
          phoneNumber: data.mobileNumber,
          id: data._id,
          party: data.party,
          name: data.name,
          state: data.state,
          vidhanShabha: data.vidhanShabha,
          district: data.district,
          gender: data.gender,
          userId: data.userId,
          instagramURL: data.instagramURL,
          facebookURL: data.facebookURL,
          twitterURL: data.twitterURL,
        });
        toast.show({
          title: 'Successfully logged in',
          status: 'success',
          description: 'Really excited to welcome you back.',
        });
        await AsyncStorage.setItem('loginKey', loginStatusData);
        setIsLoading(false);
        await AsyncStorage.setItem('isLoggedIn', 'true');
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            phoneNumber: data.mobileNumber,
            id: data._id,
            party: data.party,
            name: data.name,
            state: data.state,
            userId: data.userId,
            vidhanShabha: data.vidhanShabha,
            district: data.district,
            gender: data.gender,
            instagramURL: data.instagramURL,
            facebookURL: data.facebookURL,
            twitterURL: data.twitterURL,
          },
        });
      } else if (loginRes.response == 'anonymous') {
        await AsyncStorage.setItem(
          'anonymousUserPhoneNumber',
          `${phoneNumber}`
        );
        setIsLoading(false);
        setIsAnonymous(true);
        toast.show({
          title: 'Please Select Your Vidhan Shabha To Continue.',
          // status: 'info',
        });
      } else if (loginRes.response == 'error') {
        setIsLoading(false);
        toast.show({
          title: 'Something went wrong',
          status: 'error',
          description: 'Try again after some time.',
        });
      }
    } catch (err) {
      setError((prevElement) => [...prevElement, err]);
      setIsLoading(false);
      console.log(err);
    }
  };

  const onChangeSelectVidhanShabha = (data) => {
    setSelectedVidhanShabha(data);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={{ marginTop: '5%' }}></View>
          <View style={{ alignItems: 'center' }}>
            <View style={{ marginLeft: '5%', alignItems: 'center' }}>
              <Heading color="black">Login To SVD Application</Heading>
            </View>
          </View>
          <View style={{ marginBottom: '5%' }}></View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../../assets/aaplogo.png')}
              alt="AAM Aadmi Party Logo"
              size="48"
            />
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <View style={{ width: 330, alignItems: 'center' }}>
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: '600',
                  textAlign: 'center',
                  fontSize: 15,
                  color: '#000000',
                }}>
                Else continue as anonymous user by entering a new phone number.
              </Text>
            </View>
          </View>

          <View style={{ marginTop: '12%' }}>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps={'handled'}
              contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                minWidth: '100%',
              }}
              enableOnAndroid={true}
              extraHeight={130}
              extraScrollHeight={130}>
              <Text
                style={{
                  color: '#393939',
                  marginBottom: 10,
                }}>
                Please Enter Your 10 Digit Phone Number
              </Text>
              <Input
                w={{ base: '75%', md: '25%' }}
                style={{
                  width: '85%',
                }}
                maxLength={10}
                onChangeText={(text) => {
                  setIsAnonymous(false);
                  setPhoneNumber(text);
                }}
                autoFocus={true}
                keyboardType="number-pad"
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="phone" />}
                    size={6}
                    ml="4"
                    mr="2"
                    color="muted.400"
                  />
                }
                placeholder="Phone Number"
                fontSize="14"
                fontWeight="600"
              />
              <View style={{ marginTop: 9 }}></View>

              {isAnonymous && (
                <>
                  <View style={{ width: '85%', alignItems: 'center' }}>
                    <Selector
                      onChangeState={onChangeSelectVidhanShabha}
                      note={
                        'Please Select Your Vidhan Shabha, to get registered to Aam Aadmi Party Volunteers App'
                      }
                      placeholder="Select Your Vidhan Shabha"
                    />
                  </View>
                  <View style={{ marginBottom: 5 }}></View>
                </>
              )}
              <TouchableOpacity onPress={async () => await onContinue()}>
                <View
                  style={{
                    backgroundColor: '#42b72a', // '#42b72a
                    width: 295,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    shadowRadius: 10,
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '900',
                      fontSize: 20,
                    }}>
                    {isLoading ? 'Loading' : 'Continue'}
                  </Text>
                </View>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>

      {isLoading && <LoadingModal />}
    </View>
  );
};

const images = [
  { img: require('../../assets/home/1.jpg') },
  { img: require('../../assets/home/2.jpg') },
];
