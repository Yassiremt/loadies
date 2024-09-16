import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import MaskedView from "@react-native-masked-view/masked-view";

type Props = {
  isLoading?: boolean;
  duration?: number;
  source?: ImageSourcePropType | null;
};

const MARGIN = 15;
const HEIGHT = 15;
const REPETITION = -1;

const PROGRESS_WIDTH = 50;
const HEIGHT_DURATION = 400;

const Loadies = ({
  source = require("./assets/bg.png"),
  isLoading,
  duration = 2000,
}: Props) => {
  const { width } = useWindowDimensions();
  const loadingWidth = width - MARGIN * 2;

  const animatedHeight = useSharedValue(0);
  const animatedX = useSharedValue(-PROGRESS_WIDTH);
  const animatedWidth = useSharedValue(PROGRESS_WIDTH);

  useEffect(() => {
    if (isLoading) {
      animatedHeight.value = withTiming(
        HEIGHT,
        { duration: HEIGHT_DURATION },
        () => {
          animatedX.value = withRepeat(
            withTiming(width, { duration }),
            REPETITION
          );
          animatedWidth.value = withRepeat(
            withTiming(loadingWidth * 0.5, { duration }),
            REPETITION
          );
        }
      );
    } else {
      animatedHeight.value = withTiming(0, { duration: HEIGHT_DURATION });
    }

    return () => {
      animatedX.value = -PROGRESS_WIDTH;
      animatedWidth.value = PROGRESS_WIDTH;
    };
  }, [isLoading, duration]);

  return (
    <View
      style={[
        styles.container,
        {
          width: loadingWidth,
        },
      ]}
    >
      <View style={styles.innerContainer}>
        <Animated.View
          style={[
            styles.grayStyle,
            {
              width: loadingWidth,
              height: animatedHeight,
            },
          ]}
        />
      </View>
      <MaskedView
        style={{ height: HEIGHT }}
        maskElement={
          <View style={styles.maskedContainer}>
            <Animated.View
              style={[
                styles.maskedItem,
                {
                  width: animatedWidth,
                  left: animatedX,
                },
              ]}
            />
          </View>
        }
      >
        <Image
          source={source}
          resizeMode="cover"
          style={[
            styles.imgStyle,
            {
              width: loadingWidth,
            },
          ]}
        />
      </MaskedView>
    </View>
  );
};

export default Loadies;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    justifyContent: "center",
    marginHorizontal: MARGIN,
  },
  innerContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  grayStyle: {
    backgroundColor: "#EEEEEE",
    borderRadius: HEIGHT / 2,
  },
  imgStyle: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: HEIGHT / 2,
    height: HEIGHT,
  },
  maskedContainer: {
    backgroundColor: "transparent",
    height: HEIGHT,
  },
  maskedItem: {
    position: "absolute",
    height: HEIGHT,
    backgroundColor: "black",
    borderRadius: 8,
  },
});
