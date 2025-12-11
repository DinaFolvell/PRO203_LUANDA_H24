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
    opacity: 0.4,
    width: 338,
    paddingVertical: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 8,
    columnGap: 8,
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
