import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { moderateScale, verticalScale } from "../../constants/Dimmence";
import Colors from "../../constants/Colors";
import * as IMAGE from "../../assets/svg/index"
import ProgressBar from '../../componests/all/ProgressBar'
const PortfolioList = () => {
  const portfolioData = [
    {
      code: "NQ25016",
      address: "22 LORAINE STREET, BROOKLYN NY 11231",
      elevators: 3,
      client: "Sky Equity Group",
      statusLabel: "Priced Jobs",
      statusColor: "#FF9500",
      progress: 0.7,
      showAlert: false,
    },

    {
      code: "NQ25017",
      address: "78 MADISON AVE, NEW YORK NY 10010",
      elevators: 2,
      client: "Sunrise Holdings",
      statusLabel: "Proposal Sent",
      statusColor: "#007AFF",
      progress: 0.3,
      showAlert: true,
      alertText: "No updates in 5 Days",
    },
    
  ];

  return (
    <View>
      {/* Header */}
      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Portfolio</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>

      {/* Cards */}
      {portfolioData.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.code}>{item.code}</Text>

          <Text style={styles.address}>{item.address}</Text>
          <View style={styles.addressSeparator} />

          {/* Info Row */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              {/* <MaterialCommunityIcons
                name="bank-transfer"
                size={moderateScale(18)}
                color={Colors.textDark}
              /> */}
              <IMAGE.FLEX width={40} height={30} />
              <View style={{ marginLeft: 6 }}>
                <Text style={styles.infoLabel}>No. of Elevators</Text>
                <Text style={styles.infoValue}>{item.elevators}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
  <IMAGE.USER_CHECK width={40} height={30} />
              {/* <Feather name="user" size={moderateScale(18)} color={Colors.textDark} /> */}
              <View style={{ marginLeft: 6 }}>
                <Text style={styles.infoLabel}>Client</Text>
                <Text style={styles.infoValue}>{item.client}</Text>
              </View>
            </View>
          </View>

          {/* Status */}
          <Text style={[styles.statusLabel, { color: item.statusColor }]}>
            {item.statusLabel}
          </Text>

          {/* Progress */}
          {/* <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${item.progress * 100}%`, backgroundColor: item.statusColor },
              ]}
            />
          </View> */}
          <ProgressBar progress={item.progress} />

          {/* Alert */}
          {item.showAlert && (
            <View style={styles.alertRow}>
               <IMAGE.WARNING width={30} height={20} />
              <Text style={styles.alertText}>{item.alertText}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default PortfolioList;

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    marginHorizontal: 10,
  },

  viewAll: {
    color: "#A100FF",
    fontSize: moderateScale(13),
    fontWeight: "500",
    textDecorationLine: "underline",
  },

  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: "700",
  },

  card: {
    marginHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: moderateScale(14),
    padding: moderateScale(14),
    marginBottom: moderateScale(15),
     borderWidth:0.8,
        borderColor:Colors.border,
    //  borderWidth:1,
    //     borderColor:Colors.border,
    //     shadowColor: "#888888",
    //     shadowOpacity: 0.08,
    //     shadowRadius: 6,
    //     elevation: 3,
  },

  code: {
    fontSize: moderateScale(13),
    fontWeight: "600",
    color: Colors.textDark,
  },

  address: {
    fontSize: moderateScale(14),
    fontWeight: "700",
    color: Colors.textDark,
    marginTop: moderateScale(4),
    lineHeight: 20,
  },

  addressSeparator: {
    width: "100%",
    height: 1,
    backgroundColor: "#E5E5E5",
    marginTop: moderateScale(6),
    marginBottom: moderateScale(2),
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(12),
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
  },

  infoLabel: {
    fontSize: moderateScale(11),
    color: Colors.textMedium,
  },

  infoValue: {
    fontSize: moderateScale(13),
    fontWeight: "600",
    color: Colors.textDark,
  },

  statusLabel: {
    marginVertical:5,
    marginTop: moderateScale(14),
    fontSize: moderateScale(14),
    fontWeight: "700",
  },

  progressBar: {
    width: "100%",
    height: moderateScale(12),
    backgroundColor: "#E6E6E6",
    borderRadius: 8,
    marginTop: moderateScale(6),
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 8,
  },

  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(10),
  },

  alertText: {
    marginLeft: 6,
    fontSize: moderateScale(12),
    color: "#FF3B30",
    fontWeight: "800",
  },
});
