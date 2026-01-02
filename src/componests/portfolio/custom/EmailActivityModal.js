import React, { forwardRef,useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../../constants/Colors";
import {
  moderateScale,
  verticalScale,
  fontScale,
  Radius,
} from "../../../constants/Dimmence";
import { useSelector } from "react-redux";
import RNFS from "react-native-fs";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import api from "../../../config/api"; // adjust path
import { Buffer } from "buffer";
import ReplyComposeModal from "../../portfolio/custom/ReplyComposeModal"

const EmailActivityModal = forwardRef(({ onReply }, ref) => {


   // const replyRef = useRef(null);

    const { loading, thread, error } = useSelector(
  state => state.emailActivity
);

const isLongThread = (thread?.messages?.length || 0) > 2;

const getHeader = (headers = [], name) =>
  headers.find(h => h.name === name)?.value || "";

const formatTime = (internalDate) => {
  if (!internalDate) return "";
  const d = new Date(Number(internalDate));
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }) + " | " +
  d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getInitials = (email = "") => {
  if (!email) return "?";
  return email
    .split("@")[0]
    .split(/[.\-_]/)
    .map(s => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};
const subject =
  thread?.messages?.length > 0
    ? getHeader(thread.messages[0].payload.headers, "Subject")
    : "-";

    const getAttachments = (payload) => {
  if (!payload) return [];

  const attachments = [];

  const walkParts = (parts = []) => {
    parts.forEach(part => {
      // ✅ actual attachment
      if (
        part.filename &&
        part.filename.length > 0 &&
        part.body?.attachmentId
      ) {
        attachments.push({
          filename: part.filename,
          mimeType: part.mimeType,
          attachmentId: part.body.attachmentId,
          size: part.body.size,
        });
      }

      // 🔁 nested parts
      if (part.parts) {
        walkParts(part.parts);
      }
    });
  };

  walkParts(payload.parts || []);
  return attachments;
};

const handleDownloadAttachment = async ({
  attachmentId,
  filename,
  messageId,
}) => {
  try {
    Toast.show({
      type: "info",
      text1: "Downloading",
      text2: filename,
    });

    const res = await api.post(
      "/user/gmail-download-attachment",
      {
        attachmentId,
        filename,
        messageId,
      },
      {
        responseType: "arraybuffer", // 🔥 MUST
      }
    );

    const filePath =
      Platform.OS === "android"
        ? `${RNFS.DownloadDirectoryPath}/${filename}`
        : `${RNFS.DocumentDirectoryPath}/${filename}`;

    // 🔥 binary → base64 → file
    const base64Data = Buffer.from(res.data, "binary").toString("base64");

    await RNFS.writeFile(filePath, base64Data, "base64");

    Toast.show({
      type: "success",
      text1: "Download complete",
      text2: filename,
    });

    console.log("Saved at:", filePath);
  } catch (err) {
    console.log("Download error:", err);

    Toast.show({
      type: "error",
      text1: "Download failed",
      text2: "Unable to download attachment",
    });
  }
};


console.log('thread',thread)

const ModalHeader = ({ onClose }) => {
  return (
    <View style={styles.modalHeader}>
      <Text style={styles.headerTitle}>Email Activity</Text>

      <TouchableOpacity onPress={onClose}>
        <Feather name="x" size={22} color="#444" />
      </TouchableOpacity>
    </View>
  );
};
const ModalFooter = ({ onReply }) => {
  return (
    <View style={styles.modalFooter}>
      <TouchableOpacity
        style={styles.footerBtn}
        onPress={onReply}
      >
        <Feather name="corner-up-left" size={16} />
        <Text style={styles.footerText}>
          Reply to Thread
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerBtn}>
        <Feather name="corner-up-right" size={16} />
        <Text style={styles.footerText}>
          Forward Email Trail
        </Text>
      </TouchableOpacity>
    </View>
  );
};


  return (
<Modalize
  ref={ref}
  adjustToContentHeight={!isLongThread} // 🔥 smart toggle
  modalStyle={[
    styles.modal,
    isLongThread && { maxHeight: "85%" }, // 🔥 long → scroll area
  ]}
  HeaderComponent={
    <ModalHeader onClose={() => ref.current?.close()} />
  }
  FooterComponent={
    <ModalFooter onReply={onReply} />
  }
  scrollViewProps={{
    showsVerticalScrollIndicator: false,
    keyboardShouldPersistTaps: "handled",
    contentContainerStyle: {
      paddingBottom: verticalScale(16),
    },
  }}
>


      {/* SUBJECT */}
      <View style={styles.subjectBox}>
        <Text style={styles.subjectLabel}>Subject:</Text>
    <Text style={styles.subjectText}>{subject}</Text>

      </View>

      {/* EMAIL THREAD */}
 <View style={styles.thread}>
  {loading && <Text style={{ padding: 16 }}>Loading...</Text>}

  {!loading && thread?.messages?.map((msg, index) => {
    const headers = msg.payload?.headers || [];

    const from = getHeader(headers, "From");
    const to = getHeader(headers, "To");
    const cc = getHeader(headers, "Cc");
    const time = formatTime(msg.internalDate);
    const initials = getInitials(from);
const attachments = getAttachments(msg.payload);

    return (
      <View key={msg.id} style={styles.messageRow}>
        {/* AVATAR */}
        <View
          style={[
            styles.avatar,
            { backgroundColor: index === 0 ? "#ff791a52" : "#E5E7EB" },
          ]}
        >
          <Text
            style={[
              styles.avatarText,
              index !== 0 && { color: "#333" },
            ]}
          >
            {initials}
          </Text>
        </View>

        {/* CONTENT */}
        <View style={styles.messageContent}>
       <View style={styles.messageHeader}>
  <Text
    style={styles.sender}
    numberOfLines={1}
    ellipsizeMode="tail"
  >
    {from || "Unknown"}
  </Text>

  <Text style={styles.time}>{time}</Text>
</View>


          {to && <Text style={styles.toText}>To: {to}</Text>}
          {cc && <Text style={styles.toText}>Cc: {cc}</Text>}

          <Text style={styles.messageText}>
            {msg.snippet}
          </Text>
{Array.isArray(attachments) && attachments.length > 0 && (
  <View style={styles.attachmentBox}>
    {attachments.map((file, idx) => (
      <TouchableOpacity
        key={`${msg.id}-${file.attachmentId}`}
        style={styles.attachmentItem}
        activeOpacity={0.7}
        onPress={() =>
          handleDownloadAttachment({
            attachmentId: file.attachmentId,
            filename: file.filename,
            messageId: msg.id,
          })
        }
      >
        <Feather name="paperclip" size={14} color="#555" />
        <Text
          style={styles.attachmentName}
          numberOfLines={1}
          ellipsizeMode="middle"
        >
          {file.filename}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
)}


        </View>
      </View>
    );
  })}

  {!loading && (!thread?.messages || thread.messages.length === 0) && (
    <Text style={{ padding: 16, color: "#777" }}>
      No email activity found
    </Text>
  )}
</View>

      {/* FOOTER BUTTONS */}
      {/* <View style={styles.footer}>
       <TouchableOpacity
  style={styles.footerBtn}
  onPress={() => replyRef.current?.open()}
>
  <Feather name="corner-up-left" size={16} />
  <Text style={styles.footerText}>Reply to Thread</Text>
</TouchableOpacity>


        <TouchableOpacity style={styles.footerBtn}>
          <Feather name="corner-up-right" size={16} />
          <Text style={styles.footerText}>
            Forward Email Trail
          </Text>
        </TouchableOpacity>
      </View> */}



    </Modalize>
  );
});

export default EmailActivityModal;
const styles = StyleSheet.create({
  modal: {
    paddingBottom: verticalScale(20),
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(16),
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
modalHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: moderateScale(16),
  paddingVertical: verticalScale(14),
  borderBottomWidth: 1,
  borderColor: "#eee",
  backgroundColor: "#fff",
},
modalFooter: {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: moderateScale(16),
  paddingVertical: verticalScale(14),
  borderTopWidth: 1,
  borderColor: "#eee",
  backgroundColor: "#fff",
},

  headerTitle: {
    fontSize: fontScale(16),
    fontWeight: "700",
    color: "#111",
  },

  subjectBox: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(10),
  },

  subjectLabel: {
    fontSize: fontScale(12),
    color: "#666",
  },

  subjectText: {
    fontSize: fontScale(14),
    fontWeight: "600",
    color: "#111",
    marginTop: 2,
  },

  thread: {
    paddingHorizontal: moderateScale(16),
  },

  messageRow: {
    flexDirection: "row",
    marginTop: verticalScale(14),
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  avatarText: {
    color: "#ef6400",
    fontWeight: "700",
    fontSize: fontScale(13),
  },

  messageContent: {
    flex: 1,
  },

messageHeader: {
  flexDirection: "row",
  alignItems: "center",
},


sender: {
  flex: 1,                // 🔥 key fix
  fontSize: fontScale(13),
  fontWeight: "600",
  color: "#111",
  marginRight: 8,         // time se spacing
},

time: {
  fontSize: fontScale(11),
  color: "#777",
  flexShrink: 0,          // 🔥 time kabhi shrink nahi hoga
},


  toText: {
    fontSize: fontScale(11),
    color: "#666",
    marginTop: 2,
  },

  messageText: {
    fontSize: fontScale(12),
    color: "#333",
    marginTop: 6,
    lineHeight: 18,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(16),
    marginTop: verticalScale(20),
  },

  footerBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(8),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: Radius.pill,
  },

  footerText: {
    fontSize: fontScale(12),
    fontWeight: "600",
  },


  /////////////////


  attachmentBox: {
  marginTop: 8,
},

attachmentItem: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  paddingVertical: 4,
},

attachmentName: {
  fontSize: fontScale(11),
  color: "#2563EB",
  textDecorationLine: "underline",
},

});
