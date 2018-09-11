import React from "react";
import {
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo";

export default function ChallengeItem({ challenge, onPress }) {
  const screenWidth = Dimensions.get("window").width;
  const pictureUrl =
    challenge.pictureUrl || "https://via.placeholder.com/350x200";

  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{ uri: pictureUrl }}
        style={{
          position: "relative",
          width: screenWidth - 32,
          height: 200,
          marginTop: 16,
          borderRadius: 8,
          overflow: "hidden"
        }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.5)"]}
          style={{
            flex: 1,
            position: "absolute",
            bottom: 0,
            padding: 8,
            width: "100%"
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "white"
            }}
          >
            {challenge.title}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
