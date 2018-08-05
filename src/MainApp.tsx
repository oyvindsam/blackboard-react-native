import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from "react-redux";
import {AppState} from "./store/reducer";
import Login from "./login/Login";
import Courses from "./courses/Courses";
import {Spinner} from "./components/Spinner";

interface PropsFromStore {
    loggedIn: boolean
    fetchingData: boolean
    fetching: boolean
}

type Props = PropsFromStore;

const MainApp: React.SFC<Props> = ({ loggedIn, fetchingData, fetching }) => {

    const asyncStatuses = [
        fetchingData,
        fetching
    ];

    return (
        asyncStatuses.some((loading: boolean) => loading === true) ? <Spinner/> :
        <View style={styles.container}>
            { loggedIn ? <Courses/> : <Login/> }
        </View>
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        loggedIn: state.login.loggedIn,
        fetchingData: state.login.fetchingData,
        fetching: state.courses.fetching
    };
};

export default connect(mapStateToProps)(MainApp);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    coursesContainer: {
        flex: 1,
        justifyContent: 'center'
    }
});
