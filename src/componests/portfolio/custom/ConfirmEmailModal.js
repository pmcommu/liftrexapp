import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../../../constants/Colors";
import {
  verticalScale,
  fontScale,
  Spacing,
  Radius,
  SCREEN_WIDTH,
} from "../../../constants/Dimmence";

/* ---------------- CHIP ---------------- */

const Chip = ({ label, onRemove }) => (
  <View style={styles.chip}>
    <Text style={styles.chipText}>{label}</Text>
    <TouchableOpacity onPress={onRemove}>
      <Feather name="x" size={14} color="#555" />
    </TouchableOpacity>
  </View>
);

/* ---------------- EMAIL INPUT ---------------- */

const EmailInputBox = ({ emails, setEmails, placeholder }) => {
  const [value, setValue] = useState("");

  const addEmail = () => {
    const email = value.trim().replace(/,$/, "");
    if (!email) return;

    if (!emails.includes(email)) {
      setEmails([...emails, email]);
    }
    setValue("");
  };

  return (
    <View style={styles.inputBox}>
      {emails.map((email, index) => (
        <Chip
          key={index}
          label={email}
          onRemove={() =>
            setEmails(emails.filter((_, i) => i !== index))
          }
        />
      ))}

      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.emailInput}
        autoCapitalize="none"
        keyboardType="email-address"
        onSubmitEditing={addEmail}
        onBlur={addEmail}
        blurOnSubmit={false}
      />
    </View>
  );
};

/* ---------------- MAIN MODAL ---------------- */

const ConfirmEmailModal = ({ visible, onClose }) => {
  const [toEmails, setToEmails] = useState(["test@gmail.com"]);
  const [ccEmails, setCcEmails] = useState([]);
  const [bccEmails, setBccEmails] = useState([]);
  const [message, setMessage] = useState("");

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Confirm email recipients</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={22} color="#333" />
            </TouchableOpacity>
          </View>

          {/* TO */}
          <Text style={styles.label}>To</Text>
          <EmailInputBox
            emails={toEmails}
            setEmails={setToEmails}
            placeholder="Enter email"
          />

          {/* CC */}
          <Text style={styles.label}>Cc</Text>
          <EmailInputBox
            emails={ccEmails}
            setEmails={setCcEmails}
            placeholder="Enter email"
          />

          {/* BCC */}
    {/* BCC (Project Name Only) */}
<Text style={styles.label}>Project Name</Text>
<View style={styles.inputBox}>
  <TextInput
    placeholder="Enter project name"
    style={styles.emailInput}
    emails={bccEmails}
    onChangeText={setBccEmails}
    autoCapitalize="words"
  />
</View>

          {/* MESSAGE */}
          <Text style={styles.label}>Message</Text>
          <View style={styles.messageBox}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              multiline
              placeholder="Write message..."
              style={styles.messageInput}
            />
          </View>

          {/* SEND */}
          <TouchableOpacity style={styles.sendBtn} activeOpacity={0.8}>
            <Feather name="send" size={18} color="#fff" />
            <Text style={styles.sendText}>Send Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmEmailModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalCard: {
    width: SCREEN_WIDTH,
    backgroundColor: "#fff",
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    padding: Spacing.md,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },

  title: {
    fontSize: fontScale(15),
    fontWeight: "700",
    color: "#000",
  },

  label: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
    fontSize: fontScale(12),
    fontWeight: "600",
    color: "#444",
  },

  inputBox: {
    minHeight: verticalScale(42),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: Radius.sm,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
inputBox: {
  minHeight: verticalScale(46),   // 🔥 thoda height badao
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: Radius.sm,
  flexDirection: "row",
  flexWrap: "wrap",

  

  paddingHorizontal: Spacing.sm,
  paddingVertical: verticalScale(5), // 🔥 important
},




  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: verticalScale(4),
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
  },

  chipText: {
    marginRight: Spacing.xs,
    fontSize: fontScale(11),
    color: "#333",
  },

  messageBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: Radius.sm,
    minHeight: verticalScale(100),
    padding: Spacing.sm,
  },

  messageInput: {
    fontSize: fontScale(12),
    color: "#333",
    textAlignVertical: "top",
    minHeight: verticalScale(90),
  },

  sendBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary || "#FF5A1F",
    borderRadius: Radius.pill,
    paddingVertical: verticalScale(14),
    marginTop: Spacing.md,
  },

  sendText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: fontScale(13),
    marginLeft: Spacing.xs,
  },
});
