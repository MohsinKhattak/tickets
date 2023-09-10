import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import Button from '../components/Button';

const image = require('../assets/images/firstScreenImage.jpg'); // Replace with the actual path to your image

export default function FirstScreen({ navigation }) {
    const openLoginPage = () => {
        navigation.navigate("Login");
    }

    return (
        <ImageBackground source={image} style={styles.imageBackground}>
            <View style={styles.content}>
                <Text style={styles.text}>Welcome to Ticket Support</Text>
            </View>

            <View style={styles.buttonContainer}> 
                <Button title={"Let's Go"} click={openLoginPage} />
            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' if you want to stretch the image
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: 0.9
    },
    content: {
        backgroundColor: 'black', // You can add a semi-transparent overlay if desired
        padding: "5%",
        borderRadius: 10,
        // marginBottom: 20, // Add a margin at the bottom of the content
        marginTop: "15%"
    },
    text: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
    },
    buttonContainer: {
        // backgroundColor:'green',
        flex:0.2,
        width: "100%",
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: "15%"
    },
});
