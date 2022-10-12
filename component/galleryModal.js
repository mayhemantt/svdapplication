import { BlurView } from 'expo-blur';
import { Image } from 'native-base';
import React from 'react';
import { Dimensions, StatusBar, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
const widthWindow = Dimensions.get('window').width;

export const GalleryModal = ({ close }) => {
  const { galleryModal } = useSelector((state) => ({
    ...state,
  }));
  console.log(galleryModal);
  return (
    <BlurView
      tint="dark"
      intensity={1000}
      style={{
        width: '100%',
        height: '100%',
      }}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Modal
        animationType="slide"
        hardwareAccelerated={false}
        transparent={true}
        swipeDirection="down"
        onBackButtonPress={() => {
          close();
        }}
        onSwipeComplete={() => {
          close();
        }}
        onBackdropPress={() => {
          console.log('back press');
          close();
        }}
        backdropColor="black"
        visible={true}>
        <View>
          <Image
            size={`${widthWindow + 50}`}
            source={{ uri: galleryModal.data.img }}
            resizeMode="contain"
            alt={galleryModal.data.title}
            style={{
              borderRadius: 16,
              borderColor: 'black',
            }}
          />
        </View>
      </Modal>
    </BlurView>
  );
};
