import { AddButton } from "@/components/absence/add-button";
import { HeaderBar } from "@/components/absence/header-bar";
import { View } from "react-native";

export default function AbsenceScreen() {
    
  return (
    <View >
    <HeaderBar
        onPrevWeek={() => console.log('Previous week clicked')}
        onNextWeek={() => console.log('Next week clicked')}
        onNotifications={() => console.log('Notification bell clicked')}
    />

     <AddButton onPress={() => console.log('Add button clicked')} />

    </View>
  );
}

