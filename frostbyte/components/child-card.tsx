import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { DocumentReference, getDoc } from "firebase/firestore";
import { AttendanceStatus } from "@/api/childApi";

export interface ChildCardProps {
  name: string;
  image: DocumentReference;
  attendanceStatus?: AttendanceStatus;
  style?: object;
}

export function ChildCard({
  name,
  image,
  attendanceStatus = "expected",
  style,
}: ChildCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  useEffect(() => {
    loadImageFromReference();
  }, [image]);

  const loadImageFromReference = async () => {
    try {
      setIsLoadingImage(true);
      const imageDoc = await getDoc(image);

      if (imageDoc.exists()) {
        const data = imageDoc.data();
        // Anta at bildet har en 'url' eller 'path' felt
        // Tilpass basert på din faktiske datastruktur
        setImageUrl(data.url || data.path || null);
      }
    } catch (error) {
      console.error("Feil ved lasting av bilde:", error);
      setImageUrl(null);
    } finally {
      setIsLoadingImage(false);
    }
  };

  const statusColor: Record<AttendanceStatus, string> = {
    present: "#496F57",
    expected: "#C28E00",
    picked_up: "#75339B",
    absent: "#F50000",
  };

  const statusIcons: Record<AttendanceStatus, any> = {
    present: require("../assets/icons/green-present-icon.png"),
    expected: require("../assets/icons/yellow-expected-icon.png"),
    picked_up: require("../assets/icons/purple-picked-up-icon.png"),
    absent: require("../assets/icons/red-absent-icon.png"),
  };

  const statusIcon = statusIcons[attendanceStatus];
  const borderColor = statusColor[attendanceStatus];

  return (
    <View style={[styles.root, { borderBottomColor: borderColor }, style]}>
      <View style={styles.imageContainer}>
        {isLoadingImage ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={borderColor} />
          </View>
        ) : imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
            defaultSource={require("../assets/images/dina.png")}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <Image source={statusIcon} style={styles.statusIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderBottomWidth: 4,
    overflow: "hidden",
  },

  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#f0f0f0",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  loadingContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  },

  placeholderText: {
    fontSize: 48,
    fontWeight: "700",
    color: "#999",
  },

  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffffff",
    paddingHorizontal: 4,
    height: 32,
    borderTopWidth: 1,
  },

  nameText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },

  statusIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    marginLeft: 4,
  },
});
