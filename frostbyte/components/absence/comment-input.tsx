import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface CommentInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
}

export function CommentInput({ value, onChangeText }: CommentInputProps) {
  const [text, setText] = useState<string>(value || '');

  const handleChange = (input: string): void => {
    setText(input);
    if (onChangeText) onChangeText(input);
  };

  return (
    <TextInput
      style={styles.input}
      value={text}
      onChangeText={handleChange}
      placeholder="Skriv her..."
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    maxWidth: 500,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 6,
    backgroundColor: 'white',
    fontSize: 16,
    color: '#333',
  },
});
