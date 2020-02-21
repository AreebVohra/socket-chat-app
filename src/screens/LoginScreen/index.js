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

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.AuthController = new AuthController()
        this.state = {
            phone: { value: '', error: '' },
            password: { value: '', error: '' },
        };
    }

    _onLoginPressed = () => {
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

        const body = {
            username: "areeb",
            password: "abc123"
        }
        const response = await this.AuthController.LoginAsync(body)

        if (response.status === true) {
            // this.props.navigation.navigate('Chatroom');
        } else {

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
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
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