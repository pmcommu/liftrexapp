import React, { useState,useEffect ,useRef,useCallback} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import D, {
  moderateScale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,
} from "../../constants/Dimmence";
import CustomHeader from "../../componests/all/CustomHeader";
import All from "../../componests/portfolio/All";
import NewInquiry from "../../componests/portfolio/NewInquiry";
import PricedJobs from "../../componests/portfolio/PricedJobs";
import Proposals from "../../componests/portfolio/Proposals";
import api from "../../config/api";
import { useSelector,useDispatch } from "react-redux";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PortfolioList from "../../componests/home/PortfolioCard";
import SingedJobs from '../../componests/portfolio/SignedJobs';
import RejectedJobs from '../../componests/portfolio/RejectedJobs'
import Colors from "../../constants/Colors";
import CommonRevertModal from "../../componests/portfolio/custom/CommonRevertModal";
import { useFocusEffect } from "@react-navigation/native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const LIMIT = 100;

export default function Portfolio({ navigation }) {

//  ================== OTHER TAB STATET ======================
const revertModalRef = useRef(null);
const [selectedInquiry, setSelectedInquiry] = useState(null);

const handleOpenRevert = useCallback((item) => {
  setSelectedInquiry(item);
  revertModalRef.current?.open();
}, []);


  /* ================= REDUX ================= */
  const token = useSelector(state => state.auth.token);

  /* ================= TAB STATE ================= */
  const [index, setIndex] = useState(0);
const [isTabSwitching, setIsTabSwitching] = useState(false);
const [activeStatus, setActiveStatus] = useState("all");

  const routes = [
    { key: "all", title: "All" },
    { key: "new", title: "New Inquiry" },
    { key: "priced", title: "Priced Jobs" },
    { key: "proposal", title: "Proposals Sent" },
    { key: "signed", title: "Signed Jobs" },
    { key: "rejected", title: "Rejected Jobs" },
  ];

  /* ================= STATUS MAP ================= */
  const STATUS_MAP = {
    all: "all",
    new: "NEW_INQUIRY",
    priced: "GENERATED",
    proposal: "SEND",
    signed: "SIGNED",
    rejected: "REJECTED",
  };

  /* ================= DATA STATE ================= */
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [listMap, setListMap] = useState({
  all: [],
  new: [],
  priced: [],
  proposal: [],
  signed: [],
  rejected: [],
});

const [offsetMap, setOffsetMap] = useState({
  all: 0,
  new: 0,
  priced: 0,
  proposal: 0,
  signed: 0,
  rejected: 0,
});

const [hasMoreMap, setHasMoreMap] = useState({
  all: true,
  new: true,
  priced: true,
  proposal: true,
  signed: true,
  rejected: true,
});

const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");

useEffect(() => {
  const t = setTimeout(() => {
    setDebouncedSearch(search.trim());
  }, 400);

  return () => clearTimeout(t);
}, [search]);

  /* ================= API CALL ================= */
 const fetchProposals = async ({
  reset = false,
  status,
  tabKey,
  search = "",
}) => {
  if (!token) return;
  if (loading) return;
  if (!hasMoreMap[tabKey] && !reset) return;

  try {
    setLoading(true);

    const currentOffset = reset ? 0 : offsetMap[tabKey];

    let url =
      `https://dev-api.liftrex.com/proposal/list` +
      `?offset=${currentOffset}&limit=${LIMIT}&status=${status}`;

    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const json = await res.json();
    const results = json?.data?.results || [];
    const pagination = json?.data?.pagination;

    // ✅ LIST
   setListMap(prev => {
  const combined = reset
    ? results
    : [...prev[tabKey], ...results];

  const map = new Map();
  combined.forEach(item => {
    map.set(item._id, item); // 🔒 unique by _id
  });

  return {
    ...prev,
    [tabKey]: Array.from(map.values()),
  };
});


    // ✅ OFFSET
    const nextOffset = pagination.offset + pagination.limit;
    setOffsetMap(prev => ({
      ...prev,
      [tabKey]: nextOffset,
    }));

    // ✅ HAS MORE
    setHasMoreMap(prev => ({
      ...prev,
      [tabKey]: nextOffset < pagination.total,
    }));

  } catch (e) {
    console.log("FETCH ERROR:", e);
  } finally {
    setLoading(false);
  }
};


// useEffect(() => {
//   if (!token) return;

//   const tabKey = routes[index].key;
//   const status = STATUS_MAP[tabKey];

//   // 🔥 sirf tab switch pe cache use karo
//   if (listMap[tabKey]?.length > 0) return;

//   setIsTabSwitching(true);

//   fetchProposals({
//     reset: true,
//     status,
//     tabKey,
//     search: debouncedSearch,
//   }).finally(() => {
//     setIsTabSwitching(false);
//   });

// }, [index, token]);
useFocusEffect(
  useCallback(() => {
    if (!token) return;

    const tabKey = routes[index].key;
    const status = STATUS_MAP[tabKey];

    // ✅ SAFE CACHE CHECK
    if (
      listMap[tabKey]?.length > 0 &&
      debouncedSearch === "" &&
      offsetMap[tabKey] > 0   // 🔥 ensures real data loaded
    ) {
      return;
    }

    setIsTabSwitching(true);

    fetchProposals({
      reset: true,
      status,
      tabKey,
      search: debouncedSearch,
    }).finally(() => {
      setIsTabSwitching(false);
    });

  }, [index, token, debouncedSearch])   // 🔥 add debouncedSearch
);

useFocusEffect(
  useCallback(() => {
    if (!token || !debouncedSearch) return;

    const tabKey = routes[index].key;
    const status = STATUS_MAP[tabKey];

    // 🔥 Search = full reset
    setListMap(prev => ({ ...prev, [tabKey]: [] }));
    setOffsetMap(prev => ({ ...prev, [tabKey]: 0 }));
    setHasMoreMap(prev => ({ ...prev, [tabKey]: true }));

    setIsTabSwitching(true);

    fetchProposals({
      reset: true,
      status,
      tabKey,
      search: debouncedSearch,
    }).finally(() => {
      setIsTabSwitching(false);
    });

  }, [debouncedSearch])
);


// useEffect(() => {
//   if (!token) return;

//   const tabKey = routes[index].key;
//   const status = STATUS_MAP[tabKey];

//   // 🔥 SEARCH = FULL RESET
//   setListMap(prev => ({
//     ...prev,
//     [tabKey]: [],
//   }));

//   setOffsetMap(prev => ({
//     ...prev,
//     [tabKey]: 0,
//   }));

//   setHasMoreMap(prev => ({
//     ...prev,
//     [tabKey]: true,
//   }));

//   setIsTabSwitching(true);

//   fetchProposals({
//     reset: true,
//     status,
//     tabKey,
//     search: debouncedSearch,
//   }).finally(() => {
//     setIsTabSwitching(false);
//   });

// }, [debouncedSearch]);


  /* ================= TAB CHANGE ================= */
const handleIndexChange = (newIndex) => {
  const status = STATUS_MAP[routes[newIndex].key];

  setIndex(newIndex);
  setActiveStatus(status);   // 🔥 VERY IMPORTANT
};

  /* ================= SCENE RENDER ================= */
 const renderScene = ({ route }) => {
  const status = STATUS_MAP[route.key];

  const commonProps = {
  data: listMap[route.key],
  loading: loading || isTabSwitching,
  hasMore: hasMoreMap[route.key],
  search: debouncedSearch,   // 👈 ADD THIS
  navigation,
   onRevertPress: handleOpenRevert, 
  onLoadMore: () => {
    if (loading) return;
    if (!hasMoreMap[route.key]) return;

    fetchProposals({
      reset: false,
      status,
      tabKey: route.key,
      search: debouncedSearch,
    });
  },
};


  switch (route.key) {
    case "all":
      return <All {...commonProps} />;
    case "new":
      return <NewInquiry {...commonProps} />;
    case "priced":
      return <PricedJobs {...commonProps} />;
    case "proposal":
      return <Proposals {...commonProps} />;
    case "signed":
      return <SingedJobs {...commonProps} />;
    case "rejected":
      return <RejectedJobs {...commonProps} />;
    default:
      return null;
  }
};




  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CustomHeader title="Portfolio" 
      onBackPress={() => navigation.goBack()}/>

      {/* Search + Create New */}
      
    
      {/* TABVIEW */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
     //   onIndexChange={setIndex}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: SCREEN_WIDTH }}
        swipeEnabled={true}
        renderTabBar={(props) => (
            <View>
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
       <View style={styles.searchRow}>
  <View style={styles.searchBox}>
    <Feather name="search" size={18} color="#999" />

    <TextInput
      placeholder="Search project / client"
      value={search}
      onChangeText={setSearch}
      style={styles.searchInput}
      placeholderTextColor="#999"
      allowFontScaling={false}
    />

    {search?.length > 0 && (
     <TouchableOpacity
  onPress={() => {
    setSearch("");
    setDebouncedSearch("");   // 🔥 IMPORTANT
  }}
>
  <Feather name="x-circle" size={18} color="#999" />
</TouchableOpacity>

    )}
  </View>

  <TouchableOpacity
    style={styles.createBtn}
    onPress={() => navigation.navigate("CreateInquiry")}
    activeOpacity={0.8}
  >
    <Feather name="plus" size={18} color="#fff" />
    <Text style={styles.createBtnText}>Create New</Text>
  </TouchableOpacity>
</View>

           </View>
        )}
      />

      {/* Bottom buttons */}
      <View style={styles.bottomActions}>
        <View style={styles.actionWrapper}>
          <TouchableOpacity style={styles.actionBtn}>
            <Feather name="sliders" size={18} color="#333" />
            <Text style={styles.actionText}>Sort by</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.actionBtn}>
            <Feather name="filter" size={18} color="#333" />
            <Text style={styles.actionText}>Filter by</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CommonRevertModal
  ref={revertModalRef}
  title="Revert Proposal"
  message="Are you sure you want to revert this proposal to Priced Jobs?"
  onConfirm={(comment) => {
    console.log("REVERT ID:", selectedInquiry?._id);
    console.log("COMMENT:", comment);

    // 🔥 API / redux
    // dispatch(revertProposal({ id: selectedInquiry._id, comment }))
  }}
/>

    </View>
  );
}

/* ------------------ STYLES ----------------------- */

const styles = StyleSheet.create({
   searchRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: verticalScale(10),
       marginHorizontal: moderateScale(10),
       paddingBottom:10,
    },
  searchBox: {
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
  minHeight: verticalScale(40),
  paddingHorizontal: moderateScale(12),
  borderRadius: Radius.pill,
  borderWidth: 1,
  borderColor: Colors.border,
  backgroundColor: Colors.white,
},

searchInput: {
  flex: 1,
  marginLeft: moderateScale(6),
  marginRight: moderateScale(6),
  fontSize: fontScale(13),
  color: Colors.black,
  height: verticalScale(32),     // 🔥 match parent
  paddingVertical: 0,
  textAlignVertical: "center",  // 🔥 Android fix
},

createBtn: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: Colors.primary,
  marginLeft: moderateScale(10),
  height: verticalScale(40),     // 🔥 same as search
  paddingHorizontal: moderateScale(15),
  borderRadius: Radius.pill,
},


createBtnText: {
  color: Colors.white,
  fontSize: fontScale(13),
  fontWeight: "700",
},




 bottomActions: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  alignItems: "center",
  paddingVertical: 12,
  backgroundColor: "#fff",
  borderTopWidth: 1,
  borderColor: "#eee",
  paddingBottom: 5, // to look clean
},

actionWrapper: {
  flexDirection: "row",
  backgroundColor: "#fff",
  paddingHorizontal: 20,
  paddingVertical: 10,
 

  
},

actionBtn: {
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
  paddingHorizontal: 10,
},

divider: {
  width: 1,
  height: 20,
  backgroundColor: "#ddd",
  marginHorizontal: 12,
},

actionText: {
  fontSize: 14,
  fontWeight: "500",
  color: "#333",
},
});




  /* ================= API CALL ================= */
//   const fetchProposals = async ({
//     reset = false,
//     status = "all",
//   }) => {
//     if (!token || loading) return;

//     try {
//       setLoading(true);

//       const currentOffset = reset ? 0 : offset;

//       const res = await api.get("/proposal/list", {
//         headers: { authorization: `bearer ${token}` },
//         params: {
//           offset: currentOffset,
//           limit: LIMIT,
//           status,
//           search,  
//         },
//       });

//       const results = res?.data?.data?.results || [];
//       const pagination = res?.data?.data?.pagination;

//      setList(prev => {
//   if (reset) return results;

//   const map = new Map();

//   [...prev, ...results].forEach(item => {
//     map.set(item._id, item); // 👈 unique by _id
//   });

//   return Array.from(map.values());
// });


//       const nextOffset =
//         pagination.offset + pagination.limit;

//       setOffset(prev => Math.max(prev, nextOffset));

//       setHasMore(nextOffset < pagination.total);
//     } catch (err) {
//       console.log(
//         "PROPOSAL LIST ERROR:",
//         err.response?.data || err.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };