
  import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
  Platform,ScrollView,KeyboardAvoidingView,FlatList
} from "react-native";
import { Modalize } from "react-native-modalize";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";
import D, {
  moderateScale,
  scale,
  verticalScale,
  fontScale,
  Spacing,
  Radius,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../constants/Dimmence";
import api from "../../config/api";
import { useSelector } from "react-redux";
import CustomHeader from '../all/CustomHeader'
export default function NewComments({ navigation, route }) {
  const { taskId } = route.params;


  console.log('task',taskId)
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);

  console.log('userid',user)
  const loggedInUserId = user?._id;

  console.log('user',loggedInUserId)
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const listRef = useRef(null);


  console.log(comments)
  // 🔹 Fetch comments
const fetchComments = async () => {
  if (!taskId) return;

  try {
    setLoading(true);

    const res = await api.post(
      "scheduling/task-comment/read",
      { taskId },
      { headers: { authorization: `bearer ${token}` } }
    );

    setComments(res?.data?.data?.comments || []);
  } catch (err) {
    console.log(
      "GET COMMENTS ERROR:",
      err.response?.data || err.message
    );
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchComments();
  }, [taskId]);

  // 🔹 Send message
  const sendComment = async () => {
    if (!comment.trim()) return;

    const msg = comment;
    setComment("");

    await api.post(
      "scheduling/task-comment",
      { taskId, comment: msg },
      { headers: { authorization: `bearer ${token}` } }
    );

    fetchComments();
  };

  // 🔹 Render single message bubble
  const getInitials = (name = "") => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (
    parts[0][0].toUpperCase() +
    parts[parts.length - 1][0].toUpperCase()
  );
};


const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const getDateLabel = (dateString) => {
  const msgDate = new Date(dateString);
  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(msgDate, today)) return "Today";
  if (isSameDay(msgDate, yesterday)) return "Yesterday";

  return msgDate.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const renderItem = ({ item }) => {
  const isMe =
    String(item.userId) === String(loggedInUserId) ||
    item.name === user?.name;

  return (
    <View
      style={[
        styles.messageRow,
        isMe ? styles.rowRight : styles.rowLeft,
      ]}
    >
      {/* 👤 Avatar (only for others) */}
      {!isMe && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getInitials(item.name)}
          </Text>
        </View>
      )}

      {/* 💬 Bubble */}
      <View
        style={[
          styles.bubble,
          isMe ? styles.myBubble : styles.otherBubble,
        ]}
      >
        <Text
          style={[
            styles.msg,
            { color: isMe ? "#fff" : "#000" },
          ]}
        >
          {item.comment}
        </Text>

        {/* ⏰ Time BELOW message */}
        <Text
          style={[
            styles.time,
            { color: isMe ? "#e6e6e6" : "#777" },
          ]}
        >
          {new Date(item.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );
};





  return (
    <View style={styles.container}>
      <CustomHeader title="Comments"   onBackPress={() => navigation.goBack()}/>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* CHAT LIST */}
       {/* CHAT LIST OR EMPTY STATE */}
{comments.length === 0 && !loading ? (
  <View style={styles.emptyWrapper}>
    <Feather name="message-circle" size={50} color="#bbb" />
    <Text style={styles.emptyTitle}>No comments yet</Text>
    <Text style={styles.emptySubtitle}>
      Be the first to add a comment
    </Text>
  </View>
) : (
  <FlatList
    ref={listRef}
    data={[...comments].reverse()}
    keyExtractor={(item) => item._id}
    renderItem={renderItem}
    inverted
    contentContainerStyle={{ padding: 15 }}
    keyboardShouldPersistTaps="handled"
  />
)}


        {/* INPUT */}
        <View style={styles.inputBox}>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Type a message..."
            style={styles.input}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendComment}>
            <Feather name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

emptyWrapper: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: verticalScale(60), // input ke upar
},

emptyTitle: {
  marginTop: 12,
  fontSize: 16,
  fontWeight: "600",
  color: "#555",
},

emptySubtitle: {
  marginTop: 4,
  fontSize: 13,
  color: "#999",
  textAlign: "center",
},

  

  inputBox: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    marginBottom:5,
  },

  input: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    paddingHorizontal: 14,
    fontSize: 14,
  },

  sendBtn: {
    marginLeft: 10,
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  messageRow: {
  flexDirection: "row",
  marginVertical: 6,
  alignItems: "flex-end",
  maxWidth: "100%",
},

rowLeft: {
  alignSelf: "flex-start",
},

rowRight: {
  alignSelf: "flex-end",
  justifyContent: "flex-end",
},

avatar: {
  width: 34,
  height: 34,
  borderRadius: 17,
  backgroundColor: "#4CAF50",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 8,
},

avatarText: {
  color: "#fff",
  fontSize: 13,
  fontWeight: "700",
},





messageRow: {
  flexDirection: "row",
  marginVertical: 6,
  alignItems: "flex-end",
},

rowLeft: {
  alignSelf: "flex-start",
},

rowRight: {
  alignSelf: "flex-end",
},

bubble: {
  maxWidth: "75%",
  padding: 12,
  borderRadius: 14,
},

myBubble: {
  backgroundColor: Colors.primary,
  borderTopRightRadius: 0,
},

otherBubble: {
  backgroundColor: "#e5e5e5",
  borderTopLeftRadius: 0,
},

msg: {
  fontSize: 14,
},

time: {
  fontSize: 10,
  marginTop: 6,
  alignSelf: "flex-end", // ✅ bubble ke bottom-right
},

});
