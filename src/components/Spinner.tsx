import React from 'react';
import {ActivityIndicator, View} from "react-native";


export const Spinner: React.SFC<any> = () => {
    return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
            }}>
                <ActivityIndicator animating={true} size="large" color={'blue'} />
            </View>
    )
};