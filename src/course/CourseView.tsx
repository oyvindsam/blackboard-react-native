import {Course, CourseWithGradebook} from "../types";
import {View, Text, StyleSheet} from "react-native";
import React from "react";

interface CourseProps {
    course: CourseWithGradebook;
}

type Props = CourseProps;

export const CourseView: React.SFC<Props> = ({ course }) => {

    return (
        <View>
            <Text style={styles.header}>{course.name}</Text>
            <Text></Text>
        </View>
    )
};

const styles = {
    header: {
        fontSize: 16
    }
};