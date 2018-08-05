import React from 'react';
import {Text, View, StyleSheet, Button, SectionList} from "react-native";
import {BlackboardSession, Course, CourseWithGradebook, FlatGradebookItem, GradebookItem} from "../types";
import {connect} from "react-redux";
import { fetchCourses } from "./coursesActions";
import {CourseView} from "../course/CourseView";

interface PropsFromDispatch {
    fetchCourses: (bbSession: BlackboardSession) => void
}

interface PropsFromStore {
    bbSession: BlackboardSession;
    courses: CourseWithGradebook[];
}

type Props = PropsFromStore & PropsFromDispatch;

const CourseList: React.SFC<Props> = ({bbSession, courses, fetchCourses }) => {
    const onLoadClicked = () => {
        fetchCourses(bbSession)
    };
    /*
        const courseList = courses
            .map((course: Course, index) => <CourseView course={course} key={index} />);
    */
    if (courses.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.button}>
                    <Button title={"Load courses"} onPress={onLoadClicked}/>
                </View>
            </View>
        )
    }

    const getDateView = (dateString: string) => {
        const fullDate = new Date(dateString);
        if (!fullDate) console.log(dateString);
        const day = fullDate.toLocaleDateString();
        const hours = fullDate.getHours();
        const minutes = fullDate.getMinutes();
        return <Text>{day}, kl. {hours}:{minutes}</Text>
    };

    const listItem = (item: FlatGradebookItem) => {

        if (item.due) {
            return (
                <View>
                    <Text>{item.name}</Text>
                    {getDateView(item.due)}
                    <Text>Score: {item.resultScore ? item.resultScore : 0 }/{item.maxScore}</Text>
                    <Text>{"\n"}</Text>
                </View>
            );
        }

        return (
            <View>
                <Text>{item.name}</Text>
                <Text>Score: {item.resultScore ? item.resultScore : 0 }/{item.maxScore}</Text>
                <Text>{"\n"}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <SectionList
                renderItem={({item, index, section}) => listItem(item)}
                renderSectionHeader={({section: {title}}) => (<Text style={{fontWeight: 'bold'}}>{title}</Text>
                )}
                sections={courses.map((course: CourseWithGradebook) => {
                    let data = course.gradebook;
                    return {
                        title: course.name,
                        data: data
                    }
                })}
                keyExtractor={(item: FlatGradebookItem, index) => item.id + item.due}
            />
        </View>
    )
};


const mapDispatchToProps: PropsFromDispatch = {
    fetchCourses
};

const mapStateToProps = (state: any) => {
    return {
        bbSession: state.login.bbSession,
        courses: state.courses.courses
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 20,
        justifyContent: 'flex-start'
    },
    button: {
        marginTop: 10
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
});