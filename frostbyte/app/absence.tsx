import { AddButton } from "@/components/absence/add-button";
import { ChildCell } from "@/components/absence/child-cell";
import { ChildrenColumn } from "@/components/absence/children-column";
import { DayRow } from "@/components/absence/day-row";
import { HeaderBar } from "@/components/absence/header-bar";
import { View } from "react-native";

export default function AbsenceScreen() {
    
  return (
    <View >
    {/* <AddButton onPress={() => console.log('Add button clicked')} /> */}
    
    <HeaderBar
        onPrevWeek={() => console.log('Previous week clicked')}
        onNextWeek={() => console.log('Next week clicked')}
        onNotifications={() => console.log('Notification bell clicked')}
    />

     
      <DayRow startDay={22} />
        
      <ChildrenColumn />
    </View>
  );
}

