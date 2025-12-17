import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,ToastAndroid, Platform 
} from "react-native";
import { Modalize } from "react-native-modalize";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";
import api from "../../config/api";
import { useSelector } from "react-redux";
import D, {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,SCREEN_HEIGHT,SCREEN_WIDTH
} from "../../constants/Dimmence";
const AssignMechanicModal = React.forwardRef(({ tabId ,mechanics, loading }, ref) => {
  const token = useSelector((state) => state.auth.token);
const user = useSelector((state) => state.auth.user);
  
  const [selected, setSelected] = useState([]);
 
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
const [btnLoading, setBtnLoading] = useState(false);
  // ⭐ FETCH USERS LIST
// const fetchMechanics = async () => {
//   try {
//     setLoading(true);

//     const res = await api.get("/user/registered-users", {
//       headers: { authorization: `bearer ${token}` },
//     });

//     // API response me jo "data" aaye sirf usi ko use karna hai
//     let list =
//       res.data?.data?.users || 
//       res.data?.data?.items ||
//       res.data?.data?.results ||
//       (Array.isArray(res.data?.data) ? res.data.data : []) ||
//       [];

//     setMechanics(list);
//   } catch (err) {
//     console.log("MECHANIC FETCH ERROR:", err.response?.data || err.message);
//   } finally {
//     setLoading(false);
//   }
// };


//   // ⭐ OPEN MODAL → FETCH DATA
// useEffect(() => {
//  // if (!ref?.current) return;

//  // const oldOpen = ref.current.open;

//   ref.current.open = () => {
//   //  oldOpen();
//     fetchMechanics();
//     //setSelected([]); 
//   };
// }, []);


  // ⭐ Toggle user select
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const getUserName = (item) => {
    if (item?.firstName && item?.lastName)
      return `${item.firstName} ${item.lastName}`;
    if (item?.name) return item.name;
    if (item?.firstName) return item.firstName;
    return "Unknown User";
  };

  // ⭐ API — Assign Mechanics to Tab
  const assignMechanicsToTab = async () => {
  if (!tabId) {
    console.log("❌ No tabId found");
    return;
  }

  try {
    setBtnLoading(true);   // ⭐ Only button loader ON

    const res = await api.post(
      "/scheduling/proposal-tab/assign-mechanics",
      {
        tabId,
        mechanics: selected,
      },
      {
        headers: { authorization: `bearer ${token}` },
      }
    );

    console.log("ASSIGN SUCCESS:", res.data);

    // ⭐ Android Toast
    if (Platform.OS === "android") {
      ToastAndroid.show(
        res.data?.message || "Mechanics assigned successfully",
        ToastAndroid.SHORT
      );
    }

    // ⭐ Close modal
    ref.current?.close();

  } catch (err) {
    console.log("ASSIGN ERROR:", err.response?.data || err.message);

    // ❌ error toast bhi
    if (Platform.OS === "android") {
      ToastAndroid.show(
        err.response?.data?.message || "Failed to assign mechanics",
        ToastAndroid.LONG
      );
    }

  } finally {
    setBtnLoading(false); // Stop loader
  }
};


  // ⭐ SEARCH FILTER
  const filteredList = mechanics.filter((item) =>
    getUserName(item).toLowerCase().includes(searchText.toLowerCase())
  );

return (
  <Modalize
    ref={ref}
    modalHeight={500}
    modalStyle={styles.modal}
    HeaderComponent={
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Assign Mechanic</Text>

        {/* <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => setShowSearch(!showSearch)}
        >
          <Feather name="search" size={22} color="#000" />
        </TouchableOpacity> */}
      </View>
    }
FooterComponent={
  selected.length > 0 ? (
    <View style={{ paddingBottom: verticalScale(5), backgroundColor: "#fff" }}>
      <TouchableOpacity
        style={styles.assignBtn}
        onPress={assignMechanicsToTab}
        disabled={btnLoading}
      >
        {btnLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.assignText}>Assign</Text>
        )}
      </TouchableOpacity>
    </View>
  ) : null
}


  >
    {/* SEARCH BAR BELOW HEADER */}
    {showSearch && (
      <View style={styles.searchBox}>
        <Feather name="search" size={18} color="#555" />

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search mechanic"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />

        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <Feather name="x" size={18} color="#777" />
          </TouchableOpacity>
        )}
      </View>
    )}

    {/* MAIN SCROLL AREA */}
    
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={{ marginTop: 20 }}
        />
      ) : filteredList.length === 0 ? (
        <Text style={styles.noData}>No mechanics found</Text>
      ) : (
        filteredList.map((item) => (
          <TouchableOpacity
            key={item._id}
            style={[
              styles.row,
              selected.includes(item._id) && styles.selectedRow,
            ]}
            activeOpacity={0.8}
            onPress={() => toggleSelect(item._id)}
          >
            <View>
              <Text style={styles.name}>{getUserName(item)}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>

            <View style={styles.radioOuter}>
              {selected.includes(item._id) && (
                <View style={styles.radioInner} />
              )}
            </View>
          </TouchableOpacity>
        ))
      )}
    
  </Modalize>
);

});

export default AssignMechanicModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
  },

  // ⭐ HEADER
  header: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: scale(1),
    borderColor: "#eee",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: fontScale(18),
    fontWeight: "700",
    color: "#000",
  },

  // ⭐ LIST ROW
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: verticalScale(14),
    paddingHorizontal: moderateScale(20),
    borderBottomWidth: scale(1),
    borderColor: "#eee",
    alignItems: "center",
  },

  selectedRow: {
    backgroundColor: "rgba(235, 141, 19, 0.12)",
  },

  name: {
    fontSize: fontScale(16),
    fontWeight: "600",
    color: "#000",
  },
  email: {
    fontSize: fontScale(13),
    color: "#777",
  },

  // ⭐ RADIO BUTTON
  radioOuter: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(12),
    borderWidth: scale(2),
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: scale(12),
    height: scale(12),
    backgroundColor: Colors.primary,
    borderRadius: scale(6),
  },

  // ⭐ FOOTER BUTTON
assignBtn: {
  backgroundColor: Colors.primary,
  paddingVertical: verticalScale(14),
  marginTop: verticalScale(10),
  marginHorizontal: moderateScale(20),
  borderRadius: Radius.pill,
  alignItems: "center",
},


  assignText: {
    color: "#fff",
    fontSize: fontScale(17),
    fontWeight: "600",
  },

  noData: {
    textAlign: "center",
    color: "#777",
    marginTop: verticalScale(30),
    fontSize: fontScale(15),
  },

  //// AVATAR STACK

  avatarStack: {
    flexDirection: "row",
    alignItems: "center",
  },

  stackedAvatar: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: scale(2),
    borderColor: "#fff",
  },

  avatarText: {
    color: "#fff",
    fontSize: fontScale(14),
    fontWeight: "700",
  },

  // ⭐ SEARCH

  searchBtn: {
    marginLeft: moderateScale(10),
    padding: moderateScale(6),
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(10),
    backgroundColor: "#f1f1f1",
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(10),
  },

  searchInput: {
    flex: 1,
    marginLeft: moderateScale(8),
    color: "#000",
    fontSize: fontScale(15),
  },
});

