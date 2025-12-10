import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router'; 

export interface AddButtonProps {
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
}

export function AddButton({ onPress, style }: AddButtonProps) {
  const handlePress = () => {
    if (onPress) onPress();
    router.push("/add-absence");
  };

  return (
    <TouchableOpacity style={[styles.root, style]} onPress={handlePress}>
      <MaterialCommunityIcons name="plus" size={32} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 64,
    width: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    backgroundColor: 'rgba(245, 69, 0, 1)',
  },
});
