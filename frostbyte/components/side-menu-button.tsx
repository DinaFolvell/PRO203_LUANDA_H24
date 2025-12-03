// src/components/SideMenu.js (for example)
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function SideMenuButton() {
  return (
    <View>
      <Image
        source={require('../assets/icons/material-symbols_menu-rounded.png')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  
});