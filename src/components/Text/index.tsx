import { FunctionComponent, useEffect, useState } from "react";
import { Text } from "react-native";

const TypingText: FunctionComponent<{
  text: string;
  onComplete?: () => void;
  delay?: number;
  style?: any;
}> = ({ text, onComplete, delay = 50, style }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
        onComplete && onComplete(); // Notify when typing completes
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text]);

  return <Text style={style}>{displayedText}</Text>;
};
export default TypingText;
