import React, { forwardRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Modalize } from "react-native-modalize";
import Feather from "react-native-vector-icons/Feather";
import api from "../../../config/api";
import Colors from "../../../constants/Colors";
import { useSelector } from "react-redux";
const ReplyComposeModal = forwardRef(
  ({  onSent }, ref) => {

        const { loading, thread, error } = useSelector(
      state => state.emailActivity
    );


    const firstMsg = thread?.messages?.[0];
    const headers = firstMsg?.payload?.headers || [];

    const getHeader = (name) =>
      headers.find(h => h.name === name)?.value || "";

    const to = getHeader("From"); // reply to sender
    const cc = getHeader("Cc");
    const subjectRaw = getHeader("Subject");
    const subject = subjectRaw?.startsWith("Re:")
      ? subjectRaw
      : `Re: ${subjectRaw}`;

    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
      if (!message.trim()) return;

      try {
        setSending(true);

        await api.post("/user/gmail-reply-thread", {
          threadId: thread.id,
          message,
        });

        onSent?.();
      } catch (e) {
        console.log("Reply error", e);
      } finally {
        setSending(false);
      }
    };

    return (
<Modalize
  ref={ref}
  adjustToContentHeight
  modalStyle={styles.modal}
  keyboardAvoidingBehavior="padding"
  avoidKeyboardLikeIOS
  keyboardAvoidingOffset={Platform.OS === "ios" ? 20 : 0}
  scrollViewProps={{
    keyboardShouldPersistTaps: "handled",
  }}
>


        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => ref.current?.close()}>
            <Feather name="x" size={22} />
          </TouchableOpacity>

          <View style={{ flexDirection: "row", gap: 16 }}>
            <Feather name="paperclip" size={20} />
            <TouchableOpacity onPress={handleSend}>
              <Feather
                name="send"
                size={22}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* RECIPIENTS */}
        <View style={styles.field}>
          <Text style={styles.label}>Recipients</Text>
          <Text style={styles.value}>{to}</Text>
        </View>

        {cc ? (
          <View style={styles.field}>
            <Text style={styles.label}>Cc</Text>
            <Text style={styles.value}>{cc}</Text>
          </View>
        ) : null}

        {/* SUBJECT */}
        <View style={styles.field}>
          <Text style={styles.label}>Subject</Text>
          <Text style={styles.value}>{subject}</Text>
        </View>

        {/* MESSAGE */}
        <TextInput
          style={styles.message}
          placeholder="Message"
          multiline
          value={message}
          onChangeText={setMessage}
        />
      </Modalize>
    );
  }
);

export default ReplyComposeModal;
const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 24,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  field: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  label: {
    fontSize: 12,
    color: "#666",
  },

  value: {
    fontSize: 14,
    color: "#111",
    marginTop: 4,
  },

  message: {
    minHeight: 160,
    padding: 16,
    fontSize: 14,
    textAlignVertical: "top",
  },
});
