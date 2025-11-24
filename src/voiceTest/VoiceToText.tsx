import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';
import { MicroPhone } from '../assets';


const VoiceToText = () => {
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (Platform.OS === 'android') {
            requestMicrophonePermission();
        }

        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const requestMicrophonePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Microphone Permission',
                        message: 'This app needs access to your microphone to listen to your voice.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.warn('Microphone permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    const onSpeechStart = () => setIsListening(true);
    const onSpeechEnd = () => setIsListening(false);

    const onSpeechResults = (event) => {
        setText(event.value[0]);
    };

    const onSpeechPartialResults = (event) => {
        setText(event.value[0]);
    };

    const toggleListening = async () => {
        if (isListening) {
            await Voice.stop();
            setIsListening(false);
        } else {
            try {
                await Voice.start('en-US');
                setIsListening(true);
            } catch (error) {
                console.error('Error starting Voice:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Speak to input text"
                value={text}
                onChangeText={setText}
                style={styles.textInput}
            />
            <TouchableOpacity onPress={toggleListening} style={styles.micButton}>
                {/* <Mis name={isListening ? "mic-off" : "mic"} size={30} color="#ffffff" /> */}
                <MicroPhone />
            </TouchableOpacity>
        </View>
    );
};

export default VoiceToText;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 50
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        marginRight: 10,
    },
    micButton: {
        backgroundColor: '#007AFF',
        borderRadius: 50,
        padding: 10,
    },
});
