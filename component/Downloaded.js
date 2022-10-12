import { Image } from 'native-base';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const DownloadedComponent = ({ index, data, navigation }) => {
  return (
    <View
      key={index}
      style={{
        elevation: 10,
        borderRadius: 16,
        borderColor: 'black',
        overflow: 'hidden',
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('EventScreen', {
            data: data,
            title: data.title,
            local: true,
          });
        }}>
        <Image
          style={{
            marginLeft: 6,
            marginRight: 6,
            marginTop: 15,
            borderRadius: 16,
          }}
          source={{ uri: data.image }}
          size={40}
          resizeMode="cover"
          alt={data.title}
        />
      </TouchableOpacity>
    </View>
  );
};
