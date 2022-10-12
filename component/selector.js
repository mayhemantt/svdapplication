import React from 'react';
import { Input, Select, ChevronDownIcon, ChevronUpIcon } from 'native-base';
import { Text, View } from 'react-native';
import { vidhanShabhas } from '../config';

const filter = (item, query) =>
  item.label.toLowerCase().includes(query.toLowerCase());

export const Selector = ({
  onChangeState,
  label,
  modalData = vidhanShabhas,
  note,
  placeholder,
  disabled,
}) => {
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState(modalData);
  const [selectedItem, setSelectedItem] = React.useState(null);

  React.useEffect(() => {
    if (value.length == 0) {
      setData(modalData);
    } else if (value.length > 0) {
      setData(modalData.filter((item) => filter(item, value)));
    }
  }, [value]);

  React.useEffect(() => {
    setData(modalData);
  }, [modalData]);

  const onChangeText = (query) => {
    if (query.length == 0) {
      setData(modalData);
    }
    setValue(query);
    setData(data.filter((item) => filter(item, query)));
  };

  const renderItem = (item, index) => {
    return <Select.Item label={item.label} value={item.label} key={index} />;
  };
  return (
    <View
      style={{
        paddingTop: 15,
        paddingBottom: 25,
        borderRadius: 14,
      }}>
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
        }}>
        <View style={{ alignSelf: 'center', width: '100%' }}>
          <Select
            selectedValue={selectedItem}
            placeholder={placeholder}
            minWidth="300"
            ml="4"
            mr="2"
            style={{
              fontSize: 16,
              marginLeft: 20,
              fontWeight: '600',
            }}
            onValueChange={(itemValue) => {
              setSelectedItem(itemValue);
              setValue(itemValue);
              onChangeState(itemValue);
            }}
            dropdownIcon={<ChevronDownIcon size={6} mr="4" color="gray.600" />}
            dropdownOpenIcon={<ChevronUpIcon size={6} color="gray.600" />}
            isDisabled={disabled}
            _selectedItem={{
              bg: 'gray.300',
            }}>
            <View style={{ alignItems: 'center' }}>
              {note && (
                <Text
                  style={{
                    textAlign: 'center',
                    width: '80%',
                    fontWeight: 'bold',
                    color: '#727272',
                  }}>
                  {note}
                </Text>
              )}
              <Input
                size="16"
                fontWeight={'700'}
                width="70%"
                value={value}
                textAlign="center"
                variant="underlined"
                placeholder={placeholder}
                onChangeText={onChangeText}
                w={{
                  base: '50%',
                  md: '25%',
                }}
              />
            </View>
            {data.length > 0 ? (
              data.map((item, index) => renderItem(item, index))
            ) : (
              <Text>No Data Found</Text>
            )}
            {/* {data.length == 0 && } */}
          </Select>
        </View>
      </View>
    </View>
  );
};
