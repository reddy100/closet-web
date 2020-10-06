import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const ScrollCard = ({outfit, deleteFunc, deleteCallback}) => {
    const closet = outfit.tops.concat(outfit.bottoms).concat(outfit.outerwears).concat(outfit.accessories)
    console.log(outfit)
    return <View>
    <Card
      containerStyle={styles.containerStyle}>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: '#606070', fontWeight: 'bold' }}>
          {outfit.name}
        </Text>
        <TouchableOpacity onPress = {() => {
          deleteFunc(outfit._id)
          deleteCallback()}}>
          <Icon name={'md-trash'} color={'#01a699'} size={25} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {closet.map((item, key) => (
            <View style={{ margin: 5 }} key={key}>
              <Image
                source={{
                  uri: 'https://images.boardriders.com/global/rvca-products/all/default/hi-res/m513trmf_rvca,m_blk_frt1.jpg',
                }}
                style={{ width: 70, height: 70, margin: 10, marginLeft: 0 }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                 <Text style={{ color: '#494949', fontWeight: '200' }}>
                  {item.name}
                </Text>
                <Text style={{ color: '#228B22' }}>⋮</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Card>
  </View>
}

const styles = StyleSheet.create({
  containerStyle:{
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
  }
});

export default ScrollCard;