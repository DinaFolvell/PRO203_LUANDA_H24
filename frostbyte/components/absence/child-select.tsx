import { StyleSheet, View, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export function ChildSelect() {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        Velg barn
      </Text>
      <MaterialIcons name="expand-more" size={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: 338,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#A9A9A9',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  text: {
    color: '#A9A9A9',
    fontSize: 14,
    fontWeight: '400',
  },
});
