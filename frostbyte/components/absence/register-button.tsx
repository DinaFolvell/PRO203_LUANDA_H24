import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';

export interface RegisterButtonProps {
  style?: StyleProp<ViewStyle>;
}

export function RegisterButton({ style }: RegisterButtonProps) {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.registerFravaer}>
        Registrer fravær
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 64,
    opacity: 0.4,
    width: '100%',
    maxWidth: 500, // <-- align with other elements
    paddingVertical: 16,
    flexDirection: 'column',
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
