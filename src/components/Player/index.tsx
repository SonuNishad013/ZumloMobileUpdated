import React, { useCallback, useRef, useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import colors from "../../constant/colors";
import { height, width } from "../../constant/responsiveStyle";
import { Enum_PlayerState } from "../../constant/ENUM";
import { strings } from "../../constant/strings";
import logger from "../../constant/logger";
const VideoPlayer = ({ videoId, isVisible, onClose }: any) => {
  // const [playing, setPlaying] = useState(true);

  // const onStateChange = useCallback((state: string) => {
  //   if (state === Enum_PlayerState?.ended) {
  //     setPlaying(false);
  //   } else if (state === Enum_PlayerState?.paused) {
  //     setPlaying(true);
  //   }
  // }, []);
  const playerRef: React.MutableRefObject<YoutubeIframeRef | null> =
    useRef(null);
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: string) => {
    // When YouTube forces pause on exiting fullscreen
    if (state === "paused") {
      // Force it to resume if it was paused due to fullscreen toggle
      playerRef.current?.playVideo();
      setPlaying(true);
    }
  }, []);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.overlay}>
          <YoutubePlayer
            height={height * 0.25}
            width={width * 0.9}
            videoId={videoId}
            play={playing}
            forceAndroidAutoplay={true}
            onChangeState={onStateChange}
            ref={playerRef}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>{strings?.Close}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlay: {
    backgroundColor: colors.SurfCrest,
    width: "100%",
    alignItems: "center",
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: colors.themeColor,
    padding: 10,
    borderRadius: 20,
  },
  closeText: {
    color: colors.SurfCrest,
    fontWeight: "bold",
  },
});

export default VideoPlayer;
