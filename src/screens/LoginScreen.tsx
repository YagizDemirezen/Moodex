import { RouteProp, ParamListBase } from "@react-navigation/native";
import { View, Text } from "react-native";
import React from 'react';

const LoginScreen: React.FC<{ route: RouteProp<ParamListBase, "Login">; navigation: any }> = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Screen</Text>
    </View>
  );
};

export default LoginScreen;