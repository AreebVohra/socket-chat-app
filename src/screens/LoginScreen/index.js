import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { theme } from '../../core/theme';
import { emailValidator, passwordValidator } from '../../core/utils';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: { value: '', error: '' },
            password: { value: '', error: '' },
        };
    }

    _onLoginPressed = () => {
        const { email, password } = this.state;

        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError) {
            this.setState({
                email: { value: email.value, error: emailError },
                password: { value: password.value, error: passwordError }
            })
            return;
        }
        this.props.navigation.navigate('Chatroom');
    };

    render() {
        const { email, password } = this.state;
        return (
            <Background>
                <Logo />

                <Header>Welcome back.</Header>

                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={text => this.setState({ email: { value: text, error: '' } })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
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
                    <TouchableOpacity /*onPress={() => navigation.navigate('RegisterScreen')}*/ >
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