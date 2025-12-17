import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import Colors from "../../constants/Colors";
import Feather from "react-native-vector-icons/Feather";
import { moderateScale } from "../../constants/Dimmence";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width - moderateScale(40);  // perfect center width
const SPACING = moderateScale(10);

const AlertCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const alerts = [
    {
      title: "Urgent Task Assigned",
      desc: "A critical fault has been detected in Elevator #03",
      time: "1h ago",
    },
    {
      title: "Maintenance Required",
      desc: "Inspection needed in Building A",
      time: "2h ago",
    },
    {
      title: "New Message Received",
      desc: "From Supervisor John Wilson",
      time: "3h ago",
    },
  ];

  const handleScroll = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / CARD_WIDTH
    );
    setActiveIndex(index);
  };

  // 🔥 AUTO SCROLL
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= alerts.length) nextIndex = 0;

      scrollRef.current?.scrollTo({
        x: nextIndex * CARD_WIDTH,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false} // we use custom width scroll
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={CARD_WIDTH}    // smooth snapping
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: SPACING,
        }}
      >
        {alerts.map((item, index) => (
          <View key={index} style={[styles.card, { width: CARD_WIDTH }]}>
            {/* Icon */}
            <View style={styles.leftIconBox}>
              <Feather
                name="alert-circle"
                size={moderateScale(20)}
                color={Colors.primary}
              />
            </View>

            {/* Text Area */}
            <View style={{ flex: 1 }}>
              <View style={styles.rowBetween}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>

              <Text style={styles.desc}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination */}
      <View style={styles.pagination}>
        {alerts.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              activeIndex === i ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: moderateScale(10),
  },

  card: {
    padding: moderateScale(15),
    borderRadius: moderateScale(16),
    flexDirection: "row",
    alignItems: "flex-start",
   
    marginRight: SPACING,       // clean spacing
   
  },

  leftIconBox: {
    top:5,
    width: moderateScale(43),
    height: moderateScale(43),
    borderRadius: moderateScale(40),
    backgroundColor: "#FFEAEA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: moderateScale(12),
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: moderateScale(16),
    fontWeight: "700",
    color: Colors.textDark,
  },

  desc: {
    fontSize: moderateScale(13),
    color: Colors.textMedium,
    marginTop: moderateScale(4),
    flexShrink: 1,
    lineHeight: moderateScale(19),
  },

  time: {
    fontSize: moderateScale(12),
    color: Colors.textLight,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: moderateScale(10),
  },

  dot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: 50,
    marginHorizontal: moderateScale(4),
  },

  activeDot: {
    backgroundColor: Colors.black,
    opacity: 1,
  },

  inactiveDot: {
    backgroundColor: Colors.textLight,
    opacity: 0.4,
  },
});

export default AlertCarousel;
