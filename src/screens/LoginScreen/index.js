import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { theme } from '../../core/theme';
import { phoneValidator, passwordValidator } from '../../core/utils';
import AuthController from '../../controllers/AuthController';
import AsyncStorage from '@react-native-community/async-storage';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.AuthController = new AuthController()
        this.state = {
            phone: { value: '+923422114890', error: '' },
            password: { value: 'abc123', error: '' },
        };
    }

    async componentDidMount() {
        const value = await AsyncStorage.getItem('@userID')
        if (value !== null) this.props.navigation.navigate('Chatroom')
        else return
    }

    _onLoginPressed = async () => {
        const { phone, password } = this.state;

        const phoneError = phoneValidator(phone.value);
        const passwordError = passwordValidator(password.value);

        if (phoneError || passwordError) {
            this.setState({
                phone: { value: phone.value, error: phoneError },
                password: { value: password.value, error: passwordError }
            })
            return;
        }

        const body = { phone: phone.value, password: password.value }
        const response = await this.AuthController.LoginAsync(body)
        if (response.status === true) {
            AsyncStorage.setItem('@userID', response.user._id)
            AsyncStorage.setItem('@username', response.user.name)
            AsyncStorage.setItem('@token', response.token)
            this.props.navigation.navigate('Chatroom');
        } else if (response.status === false) {
            alert(response.message)
        }
    };

    render() {
        const { phone, password } = this.state;
        return (
            <Background>
                <Logo />

                <Header>Welcome back.</Header>

                <TextInput
                    label="Phone"
                    returnKeyType="next"
                    value={phone.value}
                    onChangeText={text => this.setState({ phone: { value: text, error: '' } })}
                    error={!!phone.error}
                    errorText={phone.error}
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                    placeholder="+92123456789"
                />

                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={text => this.setState({ password: { value: text, error: '' } })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />

                <View style={styles.forgotPassword}>
                    <TouchableOpacity /* onPress={() => navigation.navigate('ForgotPasswordScreen')}*/ >
                        <Text style={styles.label}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>

                <Button mode="contained" onPress={this._onLoginPressed}>Login</Button>

                <View style={styles.row}>
                    <Text style={styles.label}>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default LoginScreen;