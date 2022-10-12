import { ScrollView } from 'native-base';
import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { fetchPreviousEvents } from '../../../actions/fetchPreviousEvents';
import { Card } from '../../../component/card';
import { configData } from '../../../config';
import { Ionicons } from '@expo/vector-icons';
import EventSkeleton from '../../../component/skeleton/eventSkeleton';

export default PastEvents = ({ navigation }) => {
  const { user } = useSelector((state) => ({
    ...state,
  }));

  const [isLoading, setIsLoading] = React.useState(false);

  const [pastEventsData, setPastEventsData] = React.useState(null);
  React.useEffect(async () => {
    setIsLoading(true);
    const pastEvents = await fetchPreviousEvents();
    if (pastEvents.data.length > 0) {
      for (let i in pastEvents.data) {
        for (let j in pastEvents.data[i].events) {
          pastEvents.data[i].date = pastEvents.data[i].date
            .split('/')
            .join('-');
          console.log(pastEvents.data[i].events[j].description.title);
          pastEvents.data[i].events[j].description.image = `${
            configData.imgServer
          }/${user.party}/${user.vidhanShabha}/${
            pastEvents.data[i].date
          }/EVENT${parseInt(j) + 1}/${user.userId}.jpg`;
        }
      }
      setPastEventsData(pastEvents);
      setIsLoading(false);
    } else if (pastEvents.response == 'error') {
      setPastEventsData(null);
      setIsLoading(false);
    }
  }, []);

  const event = (eventData) => {
    console.log(eventData.date);
    return (
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {eventData &&
            eventData.events.map(({ description: data }, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  key={i}
                  onPress={() =>
                    navigation.navigate('EventScreen', {
                      data,
                      date: eventData.date,
                      title: data.title,
                      local: false,
                    })
                  }>
                  <Card
                    image={data.image}
                    title={data.title}
                    caption={data.subtitle}
                  />
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#EDEDF1' }}>
      <StatusBar backgroundColor={'#EDEDF1'} barStyle={'dark-content'} />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 19 }}>
          Your Events From Past 7 Days
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          left: '3%',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="ios-arrow-back-outline"
            size={34}
            color="grey"
            style={{ elevation: 12 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}></View>
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'flex-end',
          width: '60%',
          marginRight: '5%',
        }}>
        <Text style={{ textAlign: 'center' }}>
          You can download events, else it will be lost for ever after 7 days.
        </Text>
      </View>
      <View style={{ marginBottom: 10 }}></View>
      <ScrollView>
        {isLoading && <EventSkeleton />}
        {isLoading && <EventSkeleton />}
        {isLoading && <EventSkeleton />}
        {pastEventsData &&
          !isLoading &&
          pastEventsData.data.map((ev, i) => {
            return (
              <View
                key={i}
                style={{
                  paddingBottom: 10,
                  backgroundColor: '#ffffff',
                  marginBottom: 30,
                  marginLeft: 15,
                  elevation: 10,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                }}>
                <View style={{ justifyContent: 'center', marginTop: '4%' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: '700', fontSize: 16 }}>
                      Event From: {ev.date}
                    </Text>
                  </View>
                  {event(ev)}
                </View>
              </View>
            );
          })}
        <View style={{ marginTop: 20 }}></View>
      </ScrollView>
      {!isLoading && pastEventsData == null && (
        <View>
          <Text>No Previous Events To Show</Text>
        </View>
      )}
    </View>
  );
};
