// app/_layout.tsx
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SideMenu from './side-menu'; // 👈 import your custom sidebar

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <SideMenu {...props} />}  // 👈 use your custom menu
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
            title: 'Innsjekk',
            drawerLabel: 'Innsjekk',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
