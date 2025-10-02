import { RouteProp, ParamListBase } from "@react-navigation/native";
import { View, Text } from "react-native";
import React from 'react';

const HomeScreen: React.FC<{ route: RouteProp<ParamListBase, "Home">; navigation: any }> = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;