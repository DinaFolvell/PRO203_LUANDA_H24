import { DayPlanProvider } from "@/context/dayplan-context";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SideMenu from "./side-menu";
import ViewToggleButton from "@/components/attendance-view-btn";
import { usePathname } from "expo-router";
import React from "react";

export default function RootLayout() {
  const pathname = usePathname();

  const isLoginScreen = pathname === "/";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DayPlanProvider>
        <Drawer
          drawerContent={(props) =>
            isLoginScreen ? null : <SideMenu {...props} />
          }
          screenOptions={{
            headerShown: !isLoginScreen,
            swipeEnabled: !isLoginScreen,
          }}
        >

          <Drawer.Screen
            name="index"
            options={{
              headerShown: false,
              drawerItemStyle: { display: "none" }, 
            }}
          />


          <Drawer.Screen
            name="dashboard"
            options={{
              title: "Logg inn",
              drawerLabel: "Oversikt",
            }}
          />


          <Drawer.Screen
            name="check-in"
            options={{
              title: "Innsjekk",
              drawerLabel: "Innsjekk",
              headerRight: () => <ViewToggleButton />,
            }}
          />


          <Drawer.Screen
            name="attendance"
            options={{
              title: "Innsjekk",
              drawerLabel: "Innsjekk",
              headerRight: () => <ViewToggleButton />,
            }}
          />
        </Drawer>
      </DayPlanProvider>
    </GestureHandlerRootView>
  );
}