import React from "react";
import { View, Text, StyleSheet, Image, ScrollView,TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import D, {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,
} from "../../constants/Dimmence";
import Colors from "../../constants/Colors";
import * as IMAGE from "../../assets/svg/index"
const TaskList = () => {
  const tasks = [
    {
      due: "Due in 8 Days",
      title: "Brainstorming",
      date: "Start Date: 17 Sep",
      priority: "High",
      priorityColor: "#FF3B30",
      avatars: [1, 2, 3],
    },
    {
      due: "Due in 3 Days",
      title: "Design Review",
      date: "Start Date: 20 Sep",
      priority: "Medium",
      priorityColor: "#FF9500",
      avatars: [4, 5, 6],
    },
    {
      due: "Due Tomorrow",
      title: "Client Meeting",
      date: "Start Date: 25 Sep",
      priority: "Low",
      priorityColor: "#34C759",
      avatars: [7, 8, 9],
    },
  ];


  
  return (
    <View style={{ marginBottom:10, }}>
         <View style={styles.rowBetweenview}>
                <Text style={styles.sectionTitle}>Tasks</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
              </View>
  
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: 10 }}
    >
      {tasks.map((task, index) => (
        <View key={index} style={styles.card}>

          {/* Top Row */}
          <View style={styles.rowBetween}>
            <Text style={styles.dueText}>{task.due}</Text>
            {/* <Entypo
              name="dots-three-vertical"
              size={18}
              color="#A3A3A3"
            /> */}
              <IMAGE.DOTMENU width={30} height={30} />
          </View>

          {/* Title */}
          <Text style={styles.title}>{task.title}</Text>

          {/* Date Row */}
          <View style={styles.dateRow}>
            <Feather name="calendar" size={16} color="#6A6A6A" />
            <Text style={styles.dateText}>{task.date}</Text>
          </View>

          {/* Footer */}
          <View style={styles.footerRow}>
            {/* Avatars */}
            <View style={styles.avatarRow}>
              {task.avatars.map((id) => (
                <Image
                  key={id}
                  source={{ uri: `https://i.pravatar.cc/150?img=${id}` }}
                  style={styles.avatar}
                />
              ))}
            </View>

            {/* Priority Badge */}
            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: task.priorityColor },
              ]}
            >
               <IMAGE.HIGH width={30} height={20} />
              
              <Text style={styles.priorityText}>{task.priority}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>

      </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
     // ---- Section ----
  rowBetweenview: {
    marginHorizontal:10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(10),
    marginBottom:verticalScale(10),
  },
  viewAll: {
    color: "#A100FF",
    fontSize: moderateScale(13),
    fontWeight:'500',
     textDecorationLine: "underline",   
  textDecorationColor: "#A100FF",    
  textDecorationStyle: "solid",
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: "700",
  },

  card: {
    marginHorizontal:10,
    width: moderateScale(260),
    backgroundColor: "#FFF",
    borderRadius: moderateScale(16),
    padding: moderateScale(15),
     borderWidth:0.8,
        borderColor:Colors.border,
   // marginRight: moderateScale(15),
    // borderWidth:1,
    // borderColor:Colors.border,
    // shadowColor: "#888888",
    // shadowOpacity: 0.08,
    // shadowRadius: 6,
     //elevation: 2,
    marginBottom:10,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dueText: {
    fontSize: moderateScale(12),
    color: "#6A6A6A",
  },

  title: {
    fontSize: moderateScale(18),
    fontWeight: "700",
    color: Colors.textDark,
    marginTop: moderateScale(6),
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(10),
  },

  dateText: {
    marginLeft: 6,
    fontSize: moderateScale(13),
    color: "#6A6A6A",
  },

  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateScale(14),
  },

  avatarRow: {
    flexDirection: "row",
  },

  avatar: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: 50,
    marginRight: -8,
    borderWidth: 2,
    borderColor: "#FFF",
  },

  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(8),
  },

  priorityText: {
    color: "#FFF",
    fontSize: moderateScale(12),
    marginLeft: 4,
    fontWeight: "600",
  },
});
