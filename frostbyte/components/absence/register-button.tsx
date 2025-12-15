import { TouchableOpacity, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';

export interface RegisterButtonProps {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export function RegisterButton({ style, onPress }: RegisterButtonProps) {
  return (
    <TouchableOpacity style={[styles.root, style]} onPress={onPress}>
      <Text style={styles.registerFravaer}>Registrer fravær</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 64,
    opacity: 0.4,
    width: '100%',
    maxWidth: 500,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: 'grey',
  },
  registerFravaer: {
    color: 'rgba(255, 253, 252, 1)',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
});
