import { Text, View } from 'react-native';
import React from 'react';
import { Avatar, Image } from 'native-base';

export const CardView = (props) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: 330,
        height: 330,
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
              height: 250,
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
              alignItems: 'center',
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
                style={{
                  color: '#3c4560',
                  fontSize: 16,
                  fontWeight: '900',
                }}>
                {props.title}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
