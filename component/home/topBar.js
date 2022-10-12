import { Avatar } from 'native-base';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { configData } from '../../config';

export const TopBar = ({ username, openModal }) => {
  return (
    <View
      style={{
        paddingLeft: '5%',
        paddingRight: '5%',
        flexDirection: 'row',
      }}>
      <View
        style={{
          marginLeft: 4,
          marginRight: 8,
        }}>
        <TouchableOpacity activeOpacity={1} onPress={() => openModal()}>
          <Avatar
            bg="green.500"
            mr="1"
            source={{
              uri: configData.commonScreens.partyLogo,
            }}>
            {configData.commonScreens.partyName}
          </Avatar>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ fontWeight: '900', fontSize: 14, color: '#727272' }}>
          Welcome back,
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{username}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 5 }}>
        <View
          style={{
            marginLeft: 2,
            marginRight: 2,
          }}>
          <Avatar
            size={'12'}
            bg="green.500"
            mr="1"
            source={{
              uri: `${configData.commonScreens.imageDependencyPath.path}${configData.commonScreens.imageDependencyPath.top3Leaders[0]}`,
            }}>
            1.jpg
          </Avatar>
        </View>
        <View
          style={{
            marginLeft: 2,
            marginRight: 2,
          }}>
          <Avatar
            size={'12'}
            bg="green.500"
            mr="1"
            source={{
              uri: `${configData.commonScreens.imageDependencyPath.path}${configData.commonScreens.imageDependencyPath.top3Leaders[1]}`,
            }}>
            2.jpg
          </Avatar>
        </View>
        <View
          style={{
            marginLeft: 2,
            marginRight: 2,
          }}>
          <Avatar
            size="12"
            bg="green.500"
            mr="1"
            source={{
              uri: `${configData.commonScreens.imageDependencyPath.path}${configData.commonScreens.imageDependencyPath.top3Leaders[2]}`,
            }}>
            3.jpg
          </Avatar>
        </View>
      </View>
    </View>
  );
};
