import { DayPlanProvider } from '@/context/dayplan-context';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SideMenu from './side-menu'; 
import ViewToggleButton from '@/components/attendance-view-btn';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DayPlanProvider>
      <Drawer
        drawerContent={(props) => <SideMenu {...props} />}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: 'Oversikt',
            drawerLabel: 'Oversikt',
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


/**
  Bruk denne når vi trenger å fjerne hambugermenyen fra log-in siden <3333
 
 
 * import { DayPlanProvider } from "@/context/dayplan-context";
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
              drawerItemStyle: { display: "none" }, // skjuler i drawer
            }}
          />


          <Drawer.Screen
            name="dashboard"
            options={{
              title: "Oversikt",
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

 */