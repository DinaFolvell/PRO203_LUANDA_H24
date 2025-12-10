import { StyleSheet, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export interface AddButtonProps {
  onPress?: () => void;
}

export function AddButton({ onPress }: AddButtonProps) {
  return (
    <Pressable style={styles.root} onPress={onPress}>
      <MaterialCommunityIcons name="plus" size={32} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 64,
    width: 64,
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    backgroundColor: 'rgba(245, 69, 0, 1)',
  },
});
