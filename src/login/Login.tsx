import React from 'react';
import { connect } from 'react-redux';
import {Text, View, TextInput, StyleSheet, Button} from "react-native";
import {input, login} from "./loginActions";
import {AppState} from "../store/reducer";

interface PropsFromDispatch {
    input: (username: string, password: string) => void;
    login: (username: string, password: string) => void;
}

interface PropsFromStore {
    username: string;
    password: string;
}

type LoginProps = PropsFromDispatch & PropsFromStore;


const Login: React.SFC<LoginProps> = ({ username, password, login, input}) => {

    const onInputChange = (text: string, target: number) => {
        if (target === 1) input(text, password);
        if (target === 2) input(username, text);
    };

    const onLogin = () => {
        login(username, password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Blackboard</Text>
            <Text style={styles.lowerHeader}>courses</Text>
            <View style={styles.textContainer}>
                <TextInput style={styles.textInput} value={username}
                           onChangeText={text => onInputChange(text, 1)} placeholder="username"/>
                <TextInput style={styles.textInput} value={password} onChangeText={text => onInputChange(text, 2)}
                           secureTextEntry={true} placeholder="password"/>
            </View>
            <View style={styles.button}>
                <Button onPress={onLogin} title="Log in"/>
            </View>
        </View>
    )
};

const mapDispatchToProps: PropsFromDispatch = {
    login,
    input,
};

const mapStateToProps = (state: AppState): PropsFromStore => ({
    username: state.login.username,
    password: state.login.password
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    textContainer: {
        marginTop: 70,
        flex: 1
    },
    textInput: {
        fontSize: 20,
        height: 48
    },
    button: {
        flex: 3,
        marginTop: 5
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
        marginTop: 20
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    lowerHeader: {
        fontSize: 25,
        fontStyle: 'italic'
    }
});
