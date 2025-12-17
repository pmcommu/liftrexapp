
  import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
  Platform,ScrollView
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

const Comments = React.forwardRef(({ taskId}, ref) => {

  //const taskId ="6933df2e11813e6ca934c91a"
console.log('taskid',taskId)

const scrollRef = useRef(null);

const scrollToBottom = () => {
  if (scrollRef.current) {
    scrollRef.current.scrollToEnd({ animated: true });
  }
};

  const token = useSelector((state) => state.auth.token);
const user = useSelector((state) => state.auth.user);

const loggedInUser = useSelector(state => state.auth.user);
const loggedInUserId = loggedInUser?._id;


  const [comment, setComment] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [comments, setComments] = useState([]);
const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

console.log(comments)
  const modalRef = useRef(null);

  // ⭐ 1️⃣ API → GET All Comments
const fetchComments = async () => {
  if (!taskId) return;

  try {
    setLoading(true);

    const res = await api.post(
      "scheduling/task-comment/read",
      { taskId },
      { headers: { authorization: `bearer ${token}` } }
    );

    const list = res?.data?.data?.comments || [];
    setComments(list);

   

  } catch (err) {
    console.log("GET COMMENTS ERROR:", err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (isOpen && taskId) {
    fetchComments();
  }
}, [isOpen, taskId]);

useEffect(() => {
  if (ref.current && ref.current.isOpened) {
    fetchComments();
  }
}, [taskId]);



  // ⭐ Modal open hone par comments load karega
// useEffect(() => {
//   if (!ref?.current) return;

//   const originalOpen = ref.current.open;

//   ref.current.open = () => {
//     originalOpen(); 
// fetchComments();
  
//   };
// }, [taskId]);


  // ⭐ Keyboard listener
  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardHeight(0)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // ⭐ 2️⃣ SEND COMMENT → POST API
  const sendComment = async () => {
  if (!comment.trim()) return;

  const msg = comment;
  setComment("");

  try {
    await api.post(
      "/scheduling/task-comment",
      {
        taskId,
        comment: msg,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
      }
    );

    // 🔥 Backend se fresh comments load karo
    fetchComments();

  } catch (err) {
    console.log("SEND COMMENT ERROR:", err.response?.data || err.message);
  }
};

const getInitials = (name = "") => {
  if (!name) return "U";

  const parts = name.trim().split(" ");
  
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  );
};

const timeAgo = (dateString) => {
  const now = new Date();
  const messageTime = new Date(dateString);
  const diffMs = now - messageTime;

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffWeek = Math.floor(diffDay / 7);

  if (diffSec < 10) return "Just now";
  if (diffSec < 60) return `${diffSec} sec ago`;
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr} hrs ago`;
  if (diffDay === 1) return "Yesterday";
  if (diffDay < 7) return `${diffDay} days ago`;
  if (diffWeek === 1) return "Last week";

  return messageTime.toLocaleDateString();
};

  return (
    <Modalize
      ref={ref}
      modalHeight={500}
      onOpened={() => setIsOpen(true)}
  onClosed={() => setIsOpen(false)}
      modalStyle={styles.modal}
      HeaderComponent={
        <View style={styles.headerRow}>
          <Text style={styles.heading}>Comments</Text>
        </View>
      }
      FooterComponent={
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Add your comment"
            value={comment}
            onChangeText={setComment}
            style={styles.input}
            placeholderTextColor="#777"
          />

          <TouchableOpacity style={styles.sendBtn} onPress={sendComment}>
            <Feather name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      }
    >
<ScrollView
  ref={scrollRef}
  onContentSizeChange={scrollToBottom}
  style={{ paddingBottom: 150 }}
>

  {/* 1️⃣ LOADING → only skeleton show */}
  {/* {loading && (
    <View style={{ padding: 20 }}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={styles.skeletonItem}>
          <View style={styles.skeletonAvatar} />
          <View style={styles.skeletonLineBox}>
            <View style={styles.skeletonLineShort} />
            <View style={styles.skeletonLineLong} />
          </View>
        </View>
      ))}
    </View>
  )} */}

  {/* 2️⃣ EMPTY COMMENTS → only when NOT loading */}
  {!loading && comments.length === 0 && (
    <View style={styles.noCommentBox}>
      <Feather name="message-circle" size={40} color="#999" />
      <Text style={styles.noCommentText}>No comments yet</Text>
      <Text style={styles.noCommentSub}>Be the first to add a comment</Text>
    </View>
  )}

  {/* 3️⃣ COMMENTS LIST */}
  {!loading && comments.length > 0 &&
  comments.map((item) => {

    // ⭐ CHECK: kya yeh comment logged-in user ka hai?
    const isMe = item.userId === loggedInUserId;

    return (
      <View key={item._id} style={styles.commentRow}>

        {/* Avatar & Name */}
        <View style={styles.row}>
          <View
            style={[
              styles.initialAvatar,
              isMe ? styles.myAvatarBg : styles.otherAvatarBg
            ]}
          >
            <Text style={styles.initialText}>
              {getInitials(item.name)}
            </Text>
          </View>

          <Text style={styles.name}>{item.name}</Text>
        </View>

        {/* Comment Bubble */}
        <View style={styles.commentCard}>
          <Text style={styles.msg}>{item.comment}</Text>
        </View>

        {/* Time */}
        <Text style={styles.time}>{timeAgo(item.createdAt)}</Text>

      </View>
    );
  })
}


</ScrollView>

    </Modalize>
  );
});

export default Comments;



const styles = StyleSheet.create({
  modal: {
    paddingTop: verticalScale(5),
    backgroundColor: "#ffffff",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },

  heading: {
    fontSize: fontScale(18),
    fontWeight: "700",
    color: "#000",
  },

  commentRow: {
    marginBottom: verticalScale(5),
    paddingHorizontal: moderateScale(15),
  },

  row: {
    top:5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(1),
  },

  avatar: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(20),
    marginRight: moderateScale(10),
  },

  name: {
    fontSize: fontScale(15),
    fontWeight: "700",
  },
myAvatarBg: {
  backgroundColor: "#4CAF50", // logged-in user
},

otherAvatarBg: {
  backgroundColor: "#FD6339", // others
},

  commentCard: {
    
    marginLeft: moderateScale(45),
    backgroundColor: "#fff",
    padding: moderateScale(15),
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  msg: {
    fontSize: fontScale(14),
    color: "#333",
  },

  time: {
    fontSize: fontScale(12),
    color: "#777",
    marginTop: verticalScale(5),
    marginLeft: moderateScale(55),
  },

  // ⭐ BOTTOM INPUT (Keyboard Safe)
  inputBox: {
    //position: "absolute",
    // left: moderateScale(10),
    // right: moderateScale(10),
    marginHorizontal:10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(5),
    paddingHorizontal: moderateScale(15),
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: verticalScale(20),
  },

  input: {
    flex: 1,
    fontSize: fontScale(14),
    color: "#000",
    paddingRight: moderateScale(10),
  },

  sendBtn: {
    width: scale(40),
    height: scale(40),
    backgroundColor: Colors.primary,
    borderRadius: scale(20),
    justifyContent: "center",
    alignItems: "center",
  },

initialAvatar: {
  width: 42,
  height: 42,
  borderRadius: 21,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
},

myAvatarBg: {
 // Logged-in user color
  backgroundColor: "#FD6339",
},

otherAvatarBg: {
   backgroundColor: "#4CAF50",  // Other user's color
},

initialText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "700",
},


///////
noCommentBox: {
  alignItems: "center",
  justifyContent: "center",
  marginTop: 50,
  paddingHorizontal: 20,
},

noCommentText: {
  fontSize: fontScale(16),
  fontWeight: "700",
  color: "#555",
  marginTop: 10,
},

noCommentSub: {
  fontSize: fontScale(13),
  color: "#777",
  marginTop: 5,
},


////////////////

skeletonItem: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 20,
},

skeletonAvatar: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "#e5e5e5",
  marginRight: 10,
},

skeletonLineBox: {
  flex: 1,
},

skeletonLineShort: {
  width: "30%",
  height: 10,
  backgroundColor: "#e5e5e5",
  borderRadius: 5,
  marginBottom: 8,
},

skeletonLineLong: {
  width: "80%",
  height: 10,
  backgroundColor: "#e5e5e5",
  borderRadius: 5,
},

noCommentBox: {
  alignItems: "center",
  justifyContent: "center",
  marginTop: 50,
},

noCommentText: {
  fontSize: fontScale(16),
  fontWeight: "700",
  color: "#555",
  marginTop: 10,
},

noCommentSub: {
  fontSize: fontScale(13),
  color: "#777",
  marginTop: 5,
},

});