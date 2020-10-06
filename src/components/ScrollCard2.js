import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Dimensions  } from 'react-native';
import { Card } from 'react-native-elements';

const ScrollCard2 = ({title, clothes}) => {
    const [selectedIds, setSelectedIds] = useState([]);
    handleSelectionMultiple = (selectedIds, id) => {
      
        var selectedIds2 = [...selectedIds] // clone state
     
        if(selectedIds2.includes(id))
        selectedIds2 = selectedIds2.filter(_id => _id !== id)
        else 
        selectedIds2.push(id)
     
        setSelectedIds([...selectedIds2])
     }

    return <View>
    <Card
      containerStyle={styles.containerStyle}>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: '#606070', fontWeight: 'bold' }}>
          {title}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {clothes.map((item, key) => (
            <View style={selectedIds.includes(item._id) ? styles.selectedItem : styles.unselectedItem} key={key}>
                <TouchableOpacity 
                onPress={() => handleSelectionMultiple(selectedIds, item._id)} 
                >
                        <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
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
      },    
    itemText: {
        color: '#fff',
        textAlign: 'center',
    },
    unselectedItem: {
      backgroundColor: '#4D243D',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 2,
      height: Dimensions.get('window').width / 5  },
  selectedItem: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 2,
    height: Dimensions.get('window').width / 5  // approximate a square
},
    
});

export default ScrollCard2;