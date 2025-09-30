import React, { ReactNode, useEffect, useState } from "react";
import { View, Text} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import NoInternetCard from "../components/cards/noInternetCard";

interface NetworkGuardProps {
  children: ReactNode;
}

const NetworkGuard: React.FC<NetworkGuardProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    NetInfo.fetch().then(state => setIsConnected(state.isConnected));

    return () => unsubscribe();
  }, []);

  if(!isConnected && isConnected !== null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <NoInternetCard />
      </View>
    );
  }
  return <>{children}</>;
};

export default NetworkGuard;
