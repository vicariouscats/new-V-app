import React from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import _ from "lodash";

export default function CompletedUsers({ users }) {
  const firstGroup = _.takeRight(users, 3);
  const names = _.map(firstGroup, "name");

  let remainingContent = null;
  if (users.length > 3) {
    remainingContent = (
      <Text>
        {names.join(", ")} and {users.length - 3} people
      </Text>
    );
  } else {
    remainingContent = <Text>{names.join(", ")}</Text>;
  }
  return (
    <View style={{ padding: 16 }}>
      <Text>Completed By</Text>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{ width: 132, flexDirection: "row", position: "relative" }}
        >
          {firstGroup.map((user, index) => (
            <ImageBackground
              source={{ uri: user.avatar }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 56,
                position: "absolute",
                left: index * 32,
                overflow: "hidden",
                borderWidth: 4,
                borderColor: "white"
              }}
              resizeMode="cover"
            />
          ))}
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View>
            <Text>{_.map(firstGroup, "firstName").join(", ")}</Text>
          </View>
          <View>{remainingContent}</View>
        </View>
      </View>
    </View>
  );
}
