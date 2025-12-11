import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SideMenu from './side-menu';
import ViewToggleButton from '../components/attendance-view-btn';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}
