import { Image } from 'native-base';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ModalComponent } from './modal';

export const Logo = (props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  React.useEffect(() => {
    setIsModalOpen(false);
  }, []);
  const closeModal = () => {
    console.log('close modal');
    setIsModalOpen(false);
  };
  return (
    <TouchableOpacity onPress={() => setIsModalOpen(true)}>
      {isModalOpen && (
        <ModalComponent
          onClose={closeModal}
          image={props.img}
          name={props.name}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          height: 60,
          paddingTop: 12,
          paddingRight: 16,
          paddingBottom: 12,
          borderRadius: 10,
          alignItems: 'center',
          marginRight: 8,
          marginLeft: 8,
          elevation: 10,
          borderColor: 'black',
          marginBottom: 6,
        }}>
        <Image
          alt={props.name}
          // size={38}
          style={{
            height: 48,
            width: 48,
          }}
          resizeMode="contain"
          source={props.img}
          ml="6"
          mr="5"
        />
        {/* <Text
          style={{
            fontWeight: '600',
            fontSize: 17,
            marginLeft: 8,
          }}>
          name
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};
