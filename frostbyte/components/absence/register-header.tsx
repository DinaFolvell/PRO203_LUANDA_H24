import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

export function BackButton({ onPress }: { onPress?: () => void }) {
  const handlePress = () => {
    if (onPress) onPress();
    router.push("/absence");
  };

  return (
    <TouchableOpacity style={styles.iconContainer} onPress={handlePress}>
      <MaterialCommunityIcons name="arrow-left" size={28} color="black" />
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
});
