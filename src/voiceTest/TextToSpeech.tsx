import React from 'react';
import { View, Text, Button } from 'react-native';
import Tts from 'react-native-tts';

const TextToSpeech = ({ text }) => {
    const speakText = () => {
        Tts.speak(text);
    };

    return (
        <View>
            <Text>Text to Speak: {text}</Text>
            <Button title="Speak Text" onPress={speakText} />
        </View>
    );
};

export default TextToSpeech;
