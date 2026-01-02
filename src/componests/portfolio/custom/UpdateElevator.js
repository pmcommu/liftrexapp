import React, { forwardRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Modalize } from "react-native-modalize";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../../constants/Colors";
import D, {
  moderateScale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,
} from "../../../constants/Dimmence";
import * as IMAGE from "../../../assets/svg";
import { useSelector ,useDispatch} from "react-redux";
import ElevatorCounter from "../../all/ElevatorCounter";
import api from "../../../config/api";
import { setSelectedInquiry } from "../../../redux/Slices/selectedInquirySlice";
const UpdateElevator = React.forwardRef(

  ({ navigation }, ref) => {


    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);
     const inquiry = useSelector( (state) => state.selectedInquiry.inquiry );


  const [mrl, setMrl] = useState(
  inquiry?.noOfMRL ?? 0
);
const [traction, setTraction] = useState(
  inquiry?.noOfTraction ?? 0
);
const [hydraulic, setHydraulic] = useState(
  inquiry?.noOfHydrolic ?? 0
);
const [loading, setLoading] = useState(false);
const handleUpdateProposal = async () => {
  try {
    setLoading(true);

    const payload = {
      proposalId: inquiry?._id,
      email: inquiry?.email,          // ✅ API ko required
      phoneNumber: inquiry?.phoneNumber, // ✅ API ko required
      noOfMRL: Number(mrl) || 0,
      noOfTraction: Number(traction) || 0,
      noOfHydrolic: Number(hydraulic) || 0,
    };

    const res = await api.put(
      "/proposal/update",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("UPDATE SUCCESS ✅", res.data);

    // ✅ 🔥 MAIN FIX: OLD + NEW DATA MERGE
    dispatch(
      setSelectedInquiry({
        ...inquiry,          // 👈 purana full data
        ...res.data.data,    // 👈 sirf updated fields
      })
    );

    ref.current?.close();
   

  } catch (err) {
    console.log(
      "UPDATE ERROR ❌",
      err.response?.data || err.message
    );
  } finally {
    setLoading(false);
  }
};





  return (
    <Modalize
      ref={ref}
      adjustToContentHeight
      handleStyle={{ opacity: 0 }}
      modalStyle={styles.modal}
    >
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Create Proposal</Text>
          <TouchableOpacity onPress={() => ref.current?.close()}>
            <Feather name="x" size={22} />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>
          Start your next project with ease – create below, now!
        </Text>

        {/* PROJECT CARD */}
      <View style={styles.card}>
  {/* PROJECT */}
  <View style={styles.row}>
    <IMAGE.FOLDER width={28} height={28} />
    <View style={{ marginLeft: 8 }}>
      <Text style={styles.code}>
        {inquiry?.projectId || "--"}
      </Text>
      <Text style={styles.address}>
        {inquiry?.projectName || "--"}
      </Text>
    </View>
  </View>

  <View style={styles.divider} />

  {/* CLIENT INFO */}
  <View style={styles.infoRow}>
    <View style={styles.infoBox}>
      <IMAGE.USER_CHECK width={20} height={20} />
      <View>
        <Text style={styles.infoLabel}>Client Name</Text>
        <Text style={styles.infoValue}>
          {inquiry?.client?.clientName || "--"}
        </Text>
      </View>
    </View>

    <View style={styles.infoBox}>
      <IMAGE.USER_CHECK width={20} height={20} />
      <View>
        <Text style={styles.infoLabel}>Company Rep</Text>
        <Text style={styles.infoValue}>
          {inquiry?.client?.companyRepresentative || "--"}
        </Text>
      </View>
    </View>
  </View>
</View>


        {/* COUNTERS */}
     <View style={styles.counterRow}>
  {/* {[
    { label: "MRL Elevators", value: mrl, set: setMrl },
    { label: "Traction Elevators", value: traction, set: setTraction },
    { label: "Hydraulic Elevators", value: hydraulic, set: setHydraulic },
  ].map((item, index) => (
    <View key={index} style={styles.counterCol}>
      
     
      <Text style={styles.counterLabelTop}>{item.label}</Text>


      <View style={styles.counterInputBox}>
        <Text style={styles.counterValue}>{item.value}</Text>

        <View style={styles.spinner}>
          <TouchableOpacity
            onPress={() => item.set(item.value + 1)}
          >
            <Feather name="chevron-up" size={14} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => item.value > 0 && item.set(item.value - 1)}
          >
            <Feather name="chevron-down" size={14} />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  ))} */}


   <ElevatorCounter
                label="MRL           Elevators"
                value={mrl}  
                onChange={setMrl}
              />
              <ElevatorCounter
                label="Traction    Elevators"
                value={traction}
                onChange={setTraction}
              />
              <ElevatorCounter
                label="Hydraulic Elevators"
                value={hydraulic}
                onChange={setHydraulic}
              />
  
</View>





        {/* CTA */}
        <TouchableOpacity
  style={[
    styles.primaryBtn,
    loading && { opacity: 0.6 },
  ]}
  disabled={loading}
  onPress={handleUpdateProposal}
>
  <Text style={styles.primaryText}>
    {loading ? "Updating..." : "Create Proposal"}
  </Text>
</TouchableOpacity>

      </View>
    </Modalize>
  );
});

export default UpdateElevator;
const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
  },

  container: {
    padding: Spacing.lg,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: fontScale(18),
    fontWeight: "800",
    color: Colors.textPrimary,
  },

  subtitle: {
    fontSize: fontScale(13),
    color: Colors.textSecondary,
    marginTop: verticalScale(6),
    marginBottom: verticalScale(12),
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: Colors.border,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  code: {
    fontSize: fontScale(14),
    fontWeight: "600",
  },

  address: {
    fontSize: fontScale(12),
    color: Colors.textSecondary,
    marginTop: 2,
      fontWeight: "800",
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: verticalScale(10),
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoBox: {
    flexDirection: "row",
    gap: Spacing.xs,
    width: "48%",
  },

  infoLabel: {
    fontSize: fontScale(11),
    color: Colors.textSecondary,
  },

  infoValue: {
    fontSize: fontScale(13),
    fontWeight: "500",
  },


  ///////// COUTER ROW//////////
  counterRow: {
  flexDirection: "row",
  //justifyContent: "space-between",
  marginBottom: verticalScale(20),
},

counterCol: {
  width: "31%",
},

counterLabelTop: {
  fontSize: fontScale(12),
  color: Colors.textSecondary,
  marginBottom: verticalScale(6),
},

counterInputBox: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderWidth: 1,
  borderColor: Colors.border,
  borderRadius: Radius.md,
  paddingHorizontal: Spacing.sm,
  paddingVertical: verticalScale(10),
  backgroundColor: Colors.white,
},

counterValue: {
  fontSize: fontScale(14),
  fontWeight: "600",
  color: Colors.textPrimary,
},

spinner: {
  justifyContent: "space-between",
  height: verticalScale(26),
},


  primaryBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: verticalScale(14),
    borderRadius: Radius.pill,
    alignItems: "center",
  },

  primaryText: {
    color: Colors.white,
    fontSize: fontScale(15),
    fontWeight: "600",
  },


  //////// extra use /////////

  counterRow: {
  flexDirection: "row",
  marginHorizontal:2,
  justifyContent: "space-between",
  marginBottom: verticalScale(20),
},

counterCol: {
  width: "31%",
},

counterLabelTop: {
  fontSize: fontScale(12),
  color: Colors.textSecondary,
  marginBottom: verticalScale(6),
},

counterInputBoxLR: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderWidth: 1,
  borderColor: Colors.border,
  borderRadius: Radius.md,
  paddingVertical: verticalScale(10),
  backgroundColor: Colors.white,
},

lrBtn: {
  width: moderateScale(28),
  alignItems: "center",
  justifyContent: "center",
},

counterValueLR: {
  fontSize: fontScale(14),
  fontWeight: "600",
  color: Colors.textPrimary,
  minWidth: 24,
  textAlign: "center",
},

});
