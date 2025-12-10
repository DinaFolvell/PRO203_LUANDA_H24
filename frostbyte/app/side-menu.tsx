import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Link, usePathname, type Href } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MenuItemProps = {
  href: Href;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
};

function MenuItem({ href, label, icon, isActive }: MenuItemProps) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity
        style={StyleSheet.flatten([styles.item, isActive && styles.itemActive])}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapper}>{icon}</View>

        <Text
          style={StyleSheet.flatten([
            styles.itemLabel,
            isActive && styles.itemLabelActive,
          ])}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}

export default function SideMenu(props: DrawerContentComponentProps) {
  const pathname = usePathname();

  const isRouteActive = (href: Href) => {
    if (typeof href !== "string") return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.topSpacer} />
      {/* isActive -> må endres på når vi har sider å linke til!!!!*/}
      <View style={styles.menuItemContainer}>
        <MenuItem
          href="/"
          label="Oversikt"
          isActive={isRouteActive("/")}
          icon={
            <MaterialIcons name="menu-book" size={30} style={styles.icon} />
          }
        />
        {/* isActive -> må endres på når vi har sider å linke til!!!!*/}
        <MenuItem
          href="/check-in"
          label="Oppmøte-liste"
          isActive={isRouteActive("/check-in")}
          icon={<Ionicons name="person" size={30} style={styles.icon} />}
        />
        {/* isActive -> må endres på når vi har sider å linke til!!!!*/}
        <MenuItem
          href="/"
          label="Registrer Fravær"
          isActive={false}
          icon={
            <MaterialIcons name="smartphone" size={30} style={styles.icon} />
          }
        />
      </View>

      {/* Divider */}
      <View style={styles.sectionDivider} />

      {/* isActive -> må endres på når vi har sider å linke til!!!!*/}
      {/* MIDDLE SECTION */}
      <View style={styles.menuItemContainer}>
        <MenuItem
          href="/attendance"
          label="Foreldre"
          isActive={isRouteActive("/attendance")}
          icon={<Ionicons name="people" size={30} style={styles.icon} />}
        />

        {/* isActive -> må endres på når vi har sider å linke til!!!!*/}
        <MenuItem
          href="/"
          label="Barn"
          isActive={false}
          icon={<Ionicons name="body" size={30} style={styles.icon} />}
        />
        {/* isActive -> må endres på når vi har sider å linke til!!!!*/}
        <MenuItem
          href="/"
          label="Ansatte"
          isActive={false}
          icon={<Ionicons name="person" size={30} style={styles.icon} />}
        />
      </View>

      <View style={styles.bottomSectionDivider} />

      {/* isActive -> må endres på når vi har sider å linke til!!!!*/}
      {/* SETTINGS AT BOTTOM */}
      <View style={styles.bottomSection}>
        <View style={styles.sectionDivider} />
        <MenuItem
          href="/"
          label="Innstillinger"
          isActive={false}
          icon={<Feather name="settings" size={20} style={styles.icon} />}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  topSpacer: {
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5e5",
    marginBottom: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  menuItemContainer: {
    paddingHorizontal: 16,
  },
  itemActive: {
    backgroundColor: "#f1f1f1",
  },
  iconWrapper: {
    width: 34,
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    color: "#111111",
  },
  itemLabel: {
    fontSize: 20,
    color: "#111111",
    flexShrink: 1,
  },
  itemLabelActive: {
    fontWeight: "400",
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "#e5e5e5",
    marginVertical: 12,
    marginHorizontal: 16,
  },
  bottomSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  bottomSectionDivider: {
    flexGrow: 1,
  },
});