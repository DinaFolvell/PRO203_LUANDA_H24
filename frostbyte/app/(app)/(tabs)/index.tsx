import { View } from "react-native";
import {AbsenceButton} from "@/components/absence-button";
import { AttendanceButton } from "@/components/attendance-button";

//Inne i (tabs) har vi alle sidene
//som dashboard, checkout
//Her har vi også en _layout fil som kan inneholde en tabBar for å navigere mellom
// filene i (tabs)

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <AbsenceButton />
        <AttendanceButton />
    </View>
  );
}
