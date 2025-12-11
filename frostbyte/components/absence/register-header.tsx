import { StyleSheet, TouchableOpacity, View, Text, ViewStyle } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

export interface BackButtonProps {
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
}

export function BackButton({ onPress, style }: BackButtonProps) {
  const handlePress = () => {
    if (onPress) onPress();
    router.push("/absence");
  };

  return (
    <TouchableOpacity style={[styles.iconContainer, style]} onPress={handlePress}>
      <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
    </TouchableOpacity>
  );
}

export function RegisterHeader() {
  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Legg til fravær</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  iconContainer: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 28,
    color: 'black',
    textAlign: 'center',
  },
});
