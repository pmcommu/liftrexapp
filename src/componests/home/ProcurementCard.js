import React from "react";
import { View, Text, StyleSheet, ScrollView ,TouchableOpacity} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import D, {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,
} from "../../constants/Dimmence";
import * as IMAGE from "../../assets/svg/index"
import Colors from "../../constants/Colors";
const portfolioData = [
  {
    code: "NQ25016",
    address: "22 LORAINE STREET, BROOKLYN NY 11231",
    elevators: 3,
    client: "Sky Equity Group",
    statusLabel: "Priced Jobs",
    statusColor: "#FF9500",
  },
  {
    code: "NQ25017",
    address: "78 MADISON AVE, NEW YORK NY 10010",
    elevators: 2,
    client: "Sunrise Holdings",
    statusLabel: "Proposal Sent",
    statusColor: "#007AFF",
  },
];

const ProcurementCard = ({ code, address, elevators, client, statusLabel, statusColor }) => {
  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.code}>{code}</Text>
        <View style={[styles.tag, { borderColor: statusColor, backgroundColor: statusColor + "20" }]}>
          <Text style={[styles.tagText, { color: statusColor }]}>{statusLabel}</Text>
        </View>
      </View>

      <Text style={styles.title}>{address}</Text>

      <View style={styles.divider} />

      <View style={styles.rowBetween}>
        <View style={styles.infoBox}>
         <IMAGE.FLEX width={30} height={30} />
          <View>
            <Text style={styles.label}>No. of Elevators</Text>
            <Text style={styles.value}>{elevators}</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <IMAGE.USER_CHECK width={30} height={30} />
          <View>
            <Text style={styles.label}>Client</Text>
            <Text style={styles.value}>{client}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const ProcurementCardList = () => {
  return (
    <View style={{ marginBottom:10, }}>
         <View style={styles.rowBetweenview}>
                <Text style={styles.sectionTitle}>Procurements</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
              </View>
   
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: 10 }}
    >
      {portfolioData.map((item, index) => (
        <ProcurementCard
          key={index}
          code={item.code}
          address={item.address}
          elevators={item.elevators}
          client={item.client}
          statusLabel={item.statusLabel}
          statusColor={item.statusColor}
        />
      ))}
    </ScrollView>
     </View>
  );
};

export default ProcurementCardList;

const styles = StyleSheet.create({

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
     textDecorationLine: "underline",   // 🔥 makes underline
  textDecorationColor: "#A100FF",    // optional: underline color
  textDecorationStyle: "solid",
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: "700",
  },

  card: {
    marginHorizontal:10,
    width: moderateScale(290),
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
     borderWidth:0.8,
        borderColor:Colors.border,
    // borderWidth: 1,
    // borderColor: "#E5E7EB",
    // shadowColor: "#a1a1a1",
    // shadowOpacity: 0.08,
    // shadowRadius: 6,
    // shadowOffset: { width: 0, height: 3 },
    // elevation: 3,
  
    marginBottom:10,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  code: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
  },

  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },

  tagText: {
    fontSize: 12,
    fontWeight: "600",
  },

  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },

  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
  },

  value: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
});
