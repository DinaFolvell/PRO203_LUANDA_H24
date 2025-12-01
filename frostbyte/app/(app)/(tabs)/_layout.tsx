import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import React from "react";

export default function TabBar() {
  return (
    <Tabs>
      {
        <Tabs.Screen
          name="index"
          options={{
            title: "Hjem",
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
        />
      }
    </Tabs>
  );
}
