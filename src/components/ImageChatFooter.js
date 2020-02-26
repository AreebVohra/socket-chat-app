import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Dimensions, Animated } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const newHeight = Dimensions.get('window').height;

const AnimatedHeight = (props) => {
    const [animateheight] = useState(new Animated.Value(0))  // Initial height: 0

    React.useEffect(() => {
        Animated.timing(
            animateheight,
            {
                toValue: newHeight * 0.41,
                duration: 300
            }
        ).start();
    }, []);
    return (
        <Animated.View
            style={{
                ...props.style,
                height: animateheight,
            }}
        >
            {props.children}
        </Animated.View>
    );
}

const ImageToFooter = ({ imageSend, closeFooter, sendButtom }) => {
    return (
        <AnimatedHeight style={styles.image_to_footer}>
            <View style={styles.image_to_border} />
            <View style={styles.image_to_container}>
                <Image
                    resizeMode="contain"
                    style={{ width: newHeight * 0.40, height: newHeight * 0.40 }}
                    source={{ uri: imageSend }}
                />
            </View>
            <View style={styles.close_button_container}>
                <TouchableOpacity onPress={closeFooter}>
                    <FontAwesome name="close" size={30} color="#0084ff" />
                </TouchableOpacity>
            </View>
            <View style={styles.send_button_container}>
                <TouchableOpacity onPress={sendButtom}>
                    <Ionicons name="md-send" size={30} color="#0084ff" />
                </TouchableOpacity>
            </View>
        </AnimatedHeight>
    );
}
//

const styles = StyleSheet.create({
    image_to_footer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#cdcdcd'
    },
    image_to_border: {
        height: newHeight * 0.41,
        width: 5,
        backgroundColor: '#0084ff'
    },
    image_to_container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
    },
    close_button_container: {
        position: 'absolute',
        right: 0,
        paddingRight: 15,
        paddingTop: 5
    },
    send_button_container: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        paddingRight: 10,
        paddingBottom: 5
    }
});

export default ImageToFooter;