import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ChildService } from '@/services/childService';

interface Child {
  id: string;
  name: string;
}

export function ChildSelect() {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    async function fetchChildren() {
      try {
        const data = await ChildService.getAllChildren();
        setChildren(data);
        if (data.length > 0) setSelectedChild(data[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchChildren();
  }, []);

  const handleSelect = (child: Child) => {
    setSelectedChild(child);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.root} onPress={() => setDropdownVisible(!dropdownVisible)}>
        <Text style={styles.text}>{selectedChild ? selectedChild.name : 'Velg barn'}</Text>
        <MaterialIcons name={dropdownVisible ? 'expand-less' : 'expand-more'} size={28} />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdownWrapper}>
          <Pressable style={styles.dropdown} onPress={() => setDropdownVisible(false)}>
            <FlatList
              data={children}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 500, // align with selectorWrapper
    zIndex: 1000,
  },
  root: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    backgroundColor: 'white',
  },
  text: { color: '#333', fontSize: 18, fontWeight: '700' },
  dropdownWrapper: { position: 'absolute', top: 56, width: '100%', zIndex: 1000 },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 6,
    maxHeight: 300,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  item: { paddingVertical: 14, paddingHorizontal: 16 },
  itemText: { fontSize: 16, fontWeight: '600', color: '#333' },
});
