import { ScrollView, View } from 'react-native';
import { ChildCell } from './child-cell';
import { ChildService } from '@/services/childService';

export function ChildrenColumn() {
  const children = ChildService.getAllChildren();

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        {children.map((child) => (
          <ChildCell 
            key={child.id} 
            name={child.name} 
            image={child.image} 
          />
        ))}
      </View>
    </ScrollView>
  );
}