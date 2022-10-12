import React from 'react';
import { Modal, VStack, HStack, Text, Image } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, View } from 'react-native';

export const ModalComponent = ({ onClose, image, name }) => {
  return (
    <>
      <Modal isOpen={true} size="lg" onClose={() => onClose()}>
        <Modal.Content maxWidth="350">
          {/* <Button onPress={() => onClose()} title="close" /> */}
          <Modal.CloseButton />
          <Modal.Header>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 18, fontWeight: '900' }}>{name}</Text>
            </View>
          </Modal.Header>
          <Modal.Body>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image size={40} source={image} alt={name} />
              <View style={{ marginBottom: 20 }}></View>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
