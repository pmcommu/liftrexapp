import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

import CustomHeader from "../../componests/all/CustomHeader";
import All from "../../componests/portfolio/All";
import NewInquiry from "../../componests/portfolio/NewInquiry";
import PricedJobs from "../../componests/portfolio/PricedJobs";
import Proposals from "../../componests/portfolio/Proposals";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Portfolio({navigation}) {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: "all", title: "All" },
    { key: "new", title: "New Inquiry" },
    { key: "priced", title: "Priced Jobs" },
    { key: "proposal", title: "Proposals" },
  ];

  /* ---- RENDER SCENE (YOUR LOGIC STYLE) ---- */
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "all":
        return <All />;

      case "new":
        return <NewInquiry  navigation={navigation}/>;

      case "priced":
        return <PricedJobs />;

      case "proposal":
        return <Proposals />;

      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CustomHeader title="Portfolio" />

      {/* Search + Create New */}
      
      {/* TABVIEW */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: SCREEN_WIDTH }}
        swipeEnabled={true}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            activeColor="#FF5A00"
            inactiveColor="#555"
            scrollEnabled
            style={{
              backgroundColor: "#fff",
              borderBottomWidth: 1,
              borderColor: "#eee",
            }}
            tabStyle={{
              width: SCREEN_WIDTH / 3,
            }}
            indicatorStyle={{
              backgroundColor: "#FF5A00",
              height: 3,
            }}
            renderLabel={({ route, focused }) => (
              <Text
                style={{
                  color: focused ? "#FF5A00" : "#333",
                  fontWeight: focused ? "700" : "500",
                  fontSize: focused ? 17 : 15,
                  textTransform: "none",
                }}
              >
                {route.title}
              </Text>
            )}
          />
        )}
      />

      {/* Bottom buttons */}
      {/* <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Feather name="sliders" size={18} color="#333" />
          <Text style={styles.actionText}>Sort by</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Feather name="filter" size={18} color="#333" />
          <Text style={styles.actionText}>Filter by</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

/* ------------------ STYLES ----------------------- */

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 6,
    color: "#333",
  },
  createBtn: {
    backgroundColor: "#FF5A00",
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  createBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  bottomActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
