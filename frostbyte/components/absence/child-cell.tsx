import { StyleSheet, View, Text, Image, ImageSourcePropType } from 'react-native';

export interface ProfileCardProps {
  name: string;
  image: ImageSourcePropType;
}

export function ChildCell({ name, image }: ProfileCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.nameWrapper}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    paddingVertical: 8,
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomColor: 'rgba(224, 224, 224, 1)',
    borderBottomWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    overflow: 'hidden', // ensures border radius works for Image
  },
  image: {
    width: 56,
    height: 56,
    resizeMode: 'cover',
  },
  nameWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
  },
  nameText: {
    width: 64,
    height: 12,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 12,
    fontWeight: '600',
  },
});
