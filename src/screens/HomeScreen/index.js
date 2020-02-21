import React, { Component } from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Background>
                <Logo />
                <Header>Amazing Chat</Header>

                <Paragraph>The easiest way to start with your amazing application.</Paragraph>
                <Button mode="contained" onPress={() => this.props.navigation.navigate('Login')}>Login</Button>
                <Button mode="outlined" onPress={() => this.props.navigation.navigate('Register')}>Sign Up</Button>
            </Background>
        );
    }
}