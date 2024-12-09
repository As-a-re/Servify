import React from 'react';
import { View, Pressable, Image, Text, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Advertize your</Text>
                <Text style={styles.highlight}>products</Text>
                <Text style={styles.title}>and services</Text>
            </View>
            <View style={styles.imageContainer}>
                {/* Top Row: Two Images */}
                <View style={styles.imageRow}>
                    <Image style={styles.image} source={require('./images/3D.png')} />
                    <Image style={styles.image} source={require('./images/3D.png')} />
                </View>
                
                {/* Middle Row: Three Images */}
                <View style={styles.imageRow}>
                    <Image style={styles.image} source={require('./images/3D.png')} />
                    <Image style={styles.image} source={require('./images/3D.png')} />
                    <Image style={styles.image} source={require('./images/3D.png')} />
                </View>
                
                {/* Bottom Row: Two Images */}
                <View style={styles.imageRow}>
                    <Image style={styles.image} source={require('./images/3D.png')} />
                    <Image style={styles.image} source={require('./images/3D.png')} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.buttonText}>Signup</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#33FF6D",
        alignItems: 'center',
        paddingTop: 70,
        paddingHorizontal: 20,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        color: "#333",
        fontWeight: 'bold',
        textAlign: 'center',
    },
    highlight: {
        fontSize: 30,
        color: "black",
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        marginVertical: 20,
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 5,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        margin: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 30,
    },
    button: {
        backgroundColor: "black",
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
});
