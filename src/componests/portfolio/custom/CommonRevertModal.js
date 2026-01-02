import React, { forwardRef ,useState} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";
import Feather from "react-native-vector-icons/Feather";
import { fontScale,Radius } from "../../../constants/Dimmence";
import { useSelector } from "react-redux";
import api from "../../../config/api";
const CommonRevertModal = forwardRef(
  ({ title, message, onConfirm }, ref) => {

 const token = useSelector((state) => state.auth.token);
    const inquiry = useSelector( (state) => state.selectedInquiry.inquiry );
  const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);

    console.log('propaosalid',inquiry)
    const handleClose = () => {
      ref.current?.close();
    };
const handleConfirm = async () => {
  if (!token || !inquiry) return;

  const proposalId = inquiry?._id;
  if (!proposalId) {
    console.warn("❌ proposalId missing");
    return;
  }

  try {
    setLoading(true);

    const payload = {
      proposalId,
      newStatus: "GENERATED",
    };

    await api.put(
      "/proposal/tab-status",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ✅ SUCCESS STATE
    setSuccess(true);

    // ⏳ auto close after 1.2 sec
    setTimeout(() => {
      setSuccess(false);
      ref.current?.close();
    }, 1200);

  } catch (err) {
    console.error(
      "❌ Revert failed:",
      err?.response?.data || err.message
    );
  } finally {
    setLoading(false);
  }
};


    return (
      <Modalize
        ref={ref}
        adjustToContentHeight
        withHandle={false}
      >
        <View style={styles.container}>
          
          {/* Icon */}
          <View style={styles.iconWrap}>
            <Feather name="rotate-ccw" size={22} color="#FF5A00" />
          </View>

          {/* Title */}
          <Text style={styles.title}>
            {title || "Revert Proposal"}
          </Text>

          {/* Message */}
       {/* Message */}
{success ? (
  <View style={{ alignItems: "center", marginBottom: 16 }}>
    <Feather name="check-circle" size={36} color="#2ecc71" />
    <Text style={[styles.message, { marginTop: 8, color: "#2ecc71" }]}>
      Proposal reverted successfully
    </Text>
  </View>
) : (
  <Text style={styles.message}>
    {message ||
      "Are you sure you want to revert this proposal to Priced Jobs?"}
  </Text>
)}


          {/* Buttons */}
        <View style={styles.btnRow}>
  {!success && (
    <>
      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={handleClose}
        disabled={loading}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.confirmBtn,
          loading && { opacity: 0.6 },
        ]}
        onPress={handleConfirm}
        disabled={loading}
      >
        <Text style={styles.confirmText}>
          {loading ? "Reverting..." : "Revert"}
        </Text>
      </TouchableOpacity>
    </>
  )}
</View>


        </View>
      </Modalize>
    );
  }
);

export default CommonRevertModal;


/* ================= STYLES ================= */

const styles = {
  container: {
    padding: 20,
  },

  iconWrap: {
    alignSelf: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: fontScale(18),
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginBottom: 8,
  },

  message: {
    fontSize: fontScale(14),
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },

  commentInput: {
    minHeight: 70,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 10,
    fontSize: fontScale(13),
    color: "#333",
    textAlignVertical: "top",
    marginBottom: 20,
  },

  btnRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 10,
  },

  cancelText: {
    fontSize: fontScale(14),
    color: "#666",
  },

  confirmBtn: {
    backgroundColor: "#FF5A00",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: Radius.pill,
  },

  confirmText: {
    fontSize: fontScale(14),
    fontWeight: "600",
    color: "#fff",
  },
  successWrap: {
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 16,
},

successIcon: {
  marginBottom: 8,
},

successText: {
  fontSize: fontScale(14),
  fontWeight: "600",
  color: "#2ecc71",
  textAlign: "center",
},

loadingText: {
  fontSize: fontScale(14),
  fontWeight: "600",
  color: "#fff",
},

};
