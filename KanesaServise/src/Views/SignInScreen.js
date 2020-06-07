import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GStyles from '../Assets/style';
import {Card, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const auth = React.createContext();
const {} = React.useContext(auth);

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      icon: 'eye',
    };
  }

  visiblePassword = () => {
    var {visible} = this.state;
    if (visible) {
      this.setState({visible: false, icon: 'eye-slash'});
    } else {
      this.setState({visible: true, icon: 'eye'});
    }
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Card
          title="Sign In"
          containerStyle={GStyles.cardBG}
          titleStyle={GStyles.headText}>
          <Input
            placeholder="Masukkan email..."
            label="Email"
            keyboardType="email-address"
            leftIcon={<Icon name="envelope" size={24} />}
          />
          <Input
            placeholder="Masukkan Password"
            label="Password"
            leftIcon={<Icon name="lock" size={24} />}
            secureTextEntry={this.state.visible}
            rightIcon={
              <Button
                type="clear"
                icon={<Icon name={this.state.icon} size={24} />}
                onPress={() => this.visiblePassword()}
              />
            }
          />
          <View style={styles.text}>
            <Text>Belum Punya Akun?</Text>
            <Text
              style={GStyles.textLink}
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              Daftar
            </Text>
          </View>
          <Button title="Sign In" type="outline" />
        </Card>
      </View>
    );
  }
}
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 15,
  },
});
