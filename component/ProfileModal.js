import { Avatar, StatusBar } from 'native-base';
import React from 'react';
import { AsyncStorage, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';

export const ProfileModal = ({ close, open }) => {
  const { user } = useSelector((state) => ({
    ...state,
  }));
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor="transparent" barStyle={'dark-content'} />
      <Modal
        animationType="slide"
        hardwareAccelerated={false}
        transparent={true}
        swipeDirection="down"
        onSwipeComplete={() => {
          close();
        }}
        onBackButtonPress={() => {
          close();
        }}
        onBackdropPress={() => {
          close();
        }}
        visible={true}>
        <View
          style={{
            // justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            width: '100%',
            borderRadius: 30,
            height: '100%',
            marginTop: '15%',
          }}>
          <View style={{ marginTop: -15 }}></View>
          {/* <Text>{JSON.stringify(user)}</Text> */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <Avatar
              bg="green.500"
              mr="1"
              size={'65'}
              source={{
                uri: 'https://svdawsimage.s3.ap-south-1.amazonaws.com/svd/uttarakhand/appDependency/AAP/slay.png',
              }}>
              AAP
            </Avatar>
            <View style={{ marginTop: 4 }}></View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 17, fontWeight: '900' }}>+91</Text>
              <Text> </Text>
              <Text style={{ fontSize: 17, fontWeight: '900' }}>
                {user.phoneNumber.substring(3)}
              </Text>
            </View>
            <Text
              style={{ fontWeight: '800', fontSize: 21, fontWeight: 'bold' }}>
              {user.name}
            </Text>
          </View>
          <View
            style={{
              width: '85%',
              borderRadius: 12,
              backgroundColor: '#C4C4C4',
              justifyContent: 'center',
              height: '20%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 20,
              }}>
              <Text style={{ fontSize: 14, marginRight: 2 }}>Gender: </Text>
              <Text style={{ fontSize: 16, fontWeight: '700', marginTop: -1 }}>
                {user.gender}
              </Text>
            </View>
            <View style={{ marginTop: 10 }}></View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 20,
              }}>
              <Text style={{ fontSize: 14, marginRight: 2 }}>Country:</Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  marginTop: -1,
                  marginLeft: 9,
                }}>
                India
              </Text>
            </View>
            <View style={{ marginTop: 10 }}></View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 20,
              }}>
              <Text style={{ fontSize: 14, marginRight: 2 }}>State:</Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  marginTop: -1,
                  marginLeft: 9,
                }}>
                {user.state}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 30 }}></View>
          <View
            style={{
              width: '85%',
              borderRadius: 12,
              backgroundColor: '#C4C4C4',
              justifyContent: 'center',
              height: '20%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 20,
              }}>
              <Text style={{ fontSize: 14, marginRight: 2 }}>District: </Text>
              <Text style={{ fontSize: 16, fontWeight: '700', marginTop: -1 }}>
                {user.district}
              </Text>
            </View>
            <View style={{ marginTop: 10 }}></View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 20,
              }}>
              <Text style={{ fontSize: 14, marginRight: 2 }}>
                Vidhan Shabha:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  marginTop: -1,
                  marginLeft: 9,
                }}>
                {user.vidhanShabha}
              </Text>
            </View>
            <View style={{ marginTop: 10 }}></View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 20,
              }}>
              <Text style={{ fontSize: 14, marginRight: 2 }}>Party :</Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  marginTop: -1,
                  marginLeft: 9,
                }}>
                {user.party}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 25 }}></View>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem('isLoggedIn');
              await AsyncStorage.removeItem('loginKey');
              await AsyncStorage.removeItem('anonymous');
              dispatch({ type: 'LOGOUT', payload: null });
            }}>
            <View
              style={{
                backgroundColor: '#5263ff',
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
                  fontWeight: '600',
                  fontSize: 20,
                  textTransform: 'uppercase',
                }}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
