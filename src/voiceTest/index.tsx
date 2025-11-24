import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import VoiceToText from './VoiceToText';
import TextToSpeech from './TextToSpeech';

const ChatWithAI = () => {
    const [inputText, setInputText] = useState('');
    const [aiResponse, setAIResponse] = useState('');

    const handleUserInput = async (text) => {
        // Simulate sending the text to an AI service and getting a response
        const response = await getAIResponse(text);
        setAIResponse(response);
    };

    const getAIResponse = async (text) => {
        // Call your AI API here
        return `AI response to: "${text}"`;
    };

    return (
        <View>
            <VoiceToText />
            <TextInput
                placeholder="Type your message"
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={() => handleUserInput(inputText)}
            />
            <Button title="Send to AI" onPress={() => handleUserInput(inputText)} />
            <Text>AI Response: {aiResponse}</Text>
            <TextToSpeech text={aiResponse} />
        </View>
    );
};

export default ChatWithAI;
