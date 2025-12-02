// app/_layout.tsx
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"        // this connects to app/index.tsx
          options={{
            title: 'Hjem',    // header title
            drawerLabel: 'Hjem', // label in side menu
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
