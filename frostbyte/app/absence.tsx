import { HeaderBar } from "@/components/absence/header-bar";
import { View } from "react-native";

export default function absenceScreen() {



  return (
    <View>
      <HeaderBar
        onPrevWeek={() => console.log('Go to previous week')}
        onNextWeek={() => console.log('Go to next week')}
        onNotifications={() => console.log('Open notifications')}
      >
      </HeaderBar>
    </View>
  );
}

