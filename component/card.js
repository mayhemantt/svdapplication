import { Text, View } from 'react-native';
import React from 'react';
import { Avatar, Image } from 'native-base';

export const Card = (props) => {
  return (
    <View
      key={props.key}
      style={{
        backgroundColor: 'white',
        width: 315,
        height: 280,
        borderRadius: 14,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        elevation: 10,
      }}>
      {props && (
        <View>
          <View
            style={{
              width: '100%',
              height: 200,
              borderTopLeftRadius: 14,
              borderTopRightRadius: 14,
              overflow: 'hidden',
            }}>
            <Image
              source={{
                uri: props.image,
              }}
              alt={props.title}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              paddingLeft: 20,
              flexDirection: 'row',
              alignItems: 'center',
              height: 80,
            }}>
            <Avatar
              bg="green.500"
              mr="1"
              style={{ width: 44, height: 44 }}
              source={{
                uri: 'https://svdawsimage.s3.ap-south-1.amazonaws.com/svd/uttarakhand/appDependency/AAP/slay.png',
              }}>
              AAP
            </Avatar>
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{ color: '#3c4560', fontSize: 20, fontWeight: '900' }}>
                {props.title.substring(0, 20)}
              </Text>
              <Text
                style={{
                  color: '#b8bece',
                  fontWeight: '600',
                  fontSize: 15,
                  marginTop: 4,
                }}>
                {props.caption.substring(0, 26)}...
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
