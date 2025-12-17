import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";
import {
  fontScale,
  verticalScale,
} from "../../constants/Dimmence";
import CustomHeader from "../../componests/all/CustomHeader";

export default function PermissionAccess({navigation}) {
  const user = useSelector((state) => state.auth.user);

  const permissions = user?.permissions || [];

const renderItem = ({ item }) => {
 let statusText = "No Access";
let statusColor = "#D93025";
let bgColor = "#FDEAEA";
let iconName = "x-circle";

if (item?.isFullAccess) {
  statusText = "Full Access";
  statusColor = "#1E8E3E";
  bgColor = "#E6F7EE";
  iconName = "check-circle";
}
// 👇 isOnlyViewAccess ko NO ACCESS hi treat karo
else {
  statusText = "No Access";
  statusColor = "#D93025";
  bgColor = "#FDEAEA";
  iconName = "x-circle";
}


  return (
    <View style={styles.card}>
      {/* LEFT : MODULE NAME */}
      <View style={{ flex: 1 }}>
        <Text style={styles.permissionName}>
          {item?.module?.replace(/_/g, " ")}
        </Text>
      </View>

      {/* RIGHT : ACCESS STATUS */}
      <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
        <Icon name={iconName} size={16} color={statusColor} />
        <Text style={[styles.statusText, { color: statusColor }]}>
          {statusText}
        </Text>
      </View>
    </View>
  );
};
  

  return (
    <View style={styles.container}>
        <CustomHeader title="Permission Access"
         onBackPress={() => navigation.goBack()}/>
    

      <FlatList
        data={permissions}
        keyExtractor={(item, index) =>
          item?._id?.toString() || index.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No permissions assigned
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
  },

  heading: {
    fontSize: fontScale(18),
    fontWeight: "700",
    color: Colors.black,
    marginBottom: verticalScale(12),
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    marginHorizontal:10,
  },

  permissionName: {
    fontSize: fontScale(14),
    fontWeight: "600",
    color: Colors.black,
  },

  permissionDesc: {
    fontSize: fontScale(12),
    color: Colors.grey,
    marginTop: 2,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    fontSize: fontScale(12),
    fontWeight: "600",
    marginLeft: 6,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: Colors.grey,
    fontSize: fontScale(13),
  },
});
