import React, { useRef, useState } from "react";
import { View, Text, FlatList, Dimensions, TouchableOpacity, Animated, Image } from "react-native";
import styles from "../styles/LandingScreenStyle";
import landingPages from "../data/LandingPages.json";
import getLandingImage from "../utils/getLandingImage";

const { width } = Dimensions.get("window");

interface LandingScreenProps {
  onFinish: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={landingPages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewConfig}
        renderItem={({ item, index }) => (
          <View style={[styles.page, { width }]}>
            <Image style={styles.image} source={getLandingImage(item.id)} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>

            {index === landingPages.length - 1 && (
              <TouchableOpacity style={styles.button} onPress={onFinish}>
                <Text style={styles.buttonText}>Başla</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      <View style={styles.dotsContainer}>
        {landingPages.map((_, i) => (
          <View
            key={i}
            style={i === currentIndex ? styles.activeDot : styles.inactiveDot}
          />
        ))}
      </View>
    </View>
  );
};

export default LandingScreen;
