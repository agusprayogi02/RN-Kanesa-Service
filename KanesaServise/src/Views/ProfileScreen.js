import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {getFetch} from '../Components/Api';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.getdata();
  }

  getdata() {
    getFetch('api/users').then((data) => this.setState({data: data}));
  }

  render() {
    return (
      <FlatList
        style={{flex: 1, padding: 24}}
        data={this.state.data}
        keyExtractor={({uid}, index) => uid}
        renderItem={({item}) => (
          <View>
            <Text>{item.uid}</Text>
            <Text>{item.nama} </Text>
          </View>
        )}
      />
    );
  }
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
