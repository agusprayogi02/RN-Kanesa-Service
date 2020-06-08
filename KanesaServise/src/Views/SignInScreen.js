import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GStyles from '../Assets/style';
import {Card, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {validasiEmail, validasiPass} from '../Components/Validasi';

// const AuthContext = React.createContext();
// const {signIn} = React.useContext(AuthContext);

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      icon: 'eye',
      email: '',
      password: '',
      errEm: '',
      errPass: '',
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

  Login() {
    var {email, password} = this.state;
    var em = validasiEmail(email),
      pas = validasiPass(password);
    if (em != null) {
      this.setState({errEm: em});
    } else if (pas != null) {
      this.setState({errPass: pas});
    }
  }

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
            onChangeText={(e) => this.setState({email: e, errEm: ''})}
            errorMessage={this.state.errEm}
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
            onChangeText={(e) => this.setState({password: e, errPass: ''})}
            errorMessage={this.state.errPass}
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
          <Button title="Sign In" type="outline" onPress={() => this.Login()} />
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
