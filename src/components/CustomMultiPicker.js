import React, {Component, PropTypes} from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
var { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

export default class CustomMultiPicker extends Component {
  constructor(props){
    super(props);
    this.state = {
      pageWidth: Dimensions.get('window').width,
      pageHeight: Dimensions.get('window').height,
      searchText: null,
      selected: []
    };
  }

  componentDidMount = () => {
    const selected = this.props.selected == undefined ? [] : this.props.selected
    if(typeof selected === "object"){
      selected.map(select => {
        this._onSelect(select)
      })
    } else {
      this._onSelect(selected)
    }
  }

  getNewDimensions(event){
        var pageHeight = event.nativeEvent.layout.height
        var pageWidth = event.nativeEvent.layout.width
        this.setState({
            pageHeight, pageWidth
        })
    }

  _onSelect = (item) => {
    var selected = this.state.selected
    if(this.props.multiple){
      if(selected.indexOf(item) == -1){
        selected.push(item)
        this.setState({
          selected: selected
        })
      } else {
        selected = selected.filter(i => i != item)
        this.setState({
          selected: selected
        })
      }
    } else {
      if(selected.indexOf(item) == -1){
        selected = [item]
        this.setState({
          selected: selected
        })
      } else {
        selected = []
        this.setState({
          selected: selected
        })
      }
    }
    this.props.callback(selected)
  }

  _onSearch = (text) => {
    this.setState({
      searchText: text.length > 0 ? text.toLowerCase() : null
    })
  }

  _isSelected = (item) => {
    const selected = this.state.selected
    if(selected.indexOf(item) == -1){
      return false
    }
    return true
  }

  filterObjectByValue = (obj, predicate) => {
    return Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} )
  }

  render(){
    const { options, returnValue } = this.props;
    const list = this.state.searchText ? this.filterObjectByValue(options, option => option[0].toLowerCase().includes(this.state.searchText)) : options
    const labels = Object.keys(list).map(i => list[i])
    const values = Object.keys(list)
    return(
      <View onLayout={(evt)=>{this.getNewDimensions(evt)}}>
        {this.props.search && <View style={{ flexDirection: 'row', height: 55}}>
          <View style={{ marginTop: 15, marginLeft: 15, backgroundColor: 'transparent' }}>
            <Icon name={this.props.searchIconName || "ios-search"} color={this.props.searchIconColor || this.props.iconColor} size={this.props.searchIconSize || this.props.iconSize || 25} />
          </View>
          <TextInput
            style={this.styles.searchBoxStyle}
            onChangeText={(text) => { this._onSearch(text) }}
            clearButtonMode={'always'}
            placeholder={this.props.placeholder}
            placeholderTextColor={this.props.placeholderTextColor}
            underlineColorAndroid={'transparent'}
          />
        </View>}
        <ScrollView
          style={[{ padding: 5}, this.props.scrollViewStyle]}
          horizontal={true}
        >
          {labels.map((label, index) => {
            const itemKey = returnValue == "label" ? label[1] : values[index]
            return(
              <TouchableOpacity
                key={Math.round(Math.random() * 1000000)}
                style={this._isSelected(itemKey) ? this.styles.selectedClothingItem : 
                  this.styles.clothingItem}
                onPress={() => {this._onSelect(itemKey)}}>
                  <Text style={this.props.labelStyle}>{label[0]}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    );
  }
  styles = {
    clothingItem: {
      padding: 7,
      marginTop: 0,
      marginLeft: 2,
      marginRight: 2,
      marginBottom: 6,
      backgroundColor: this.props.rowBackgroundColor,
      height: this.props.rowHeight,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: this.props.rowRadius
    },
    selectedClothingItem: {
      padding: 7,
      marginTop: 0,
      marginLeft: 2,
      marginRight: 2,
      marginBottom: 6,
      backgroundColor: 'green',
      height: this.props.rowHeight,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: this.props.rowRadius
    },
    searchBoxStyle: {
      //width: this.state.pageWidth-20,
      height: 35,
      margin: 0,
      marginTop: 10,
      marginLeft: -25,
      padding: 5,
      paddingLeft: 30,
      borderColor: this.props.iconColor,
      borderWidth: 1,
      borderRadius: 5
    }
  };

}