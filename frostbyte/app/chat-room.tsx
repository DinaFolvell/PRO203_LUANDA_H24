import { router } from 'expo-router';
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView,
  Platform,
  StyleSheet 
} from 'react-native';

interface Message {
  id: string;
  text: string;
  sender: string;
  isMe: boolean;
}

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: 'Sigurd skal besøke Grisefjøset til hans onkel og tante i helga så han kommer ikke i barnehagen på fredag', 
      sender: 'Lucas Fjongers', 
      isMe: false 
    },
    { 
      id: '2', 
      text: 'Den er grei! Før det gjerne inn i appens Fraværfunksjon', 
      sender: 'Ansatt', 
      isMe: true 
    },
    { 
      id: '3', 
      text: 'Ok', 
      sender: 'Lucas Fjongers', 
      isMe: false 
    },
    { 
      id: '4', 
      text: 'Takk', 
      sender: 'Ansatt', 
      isMe: true 
    },
    { 
      id: '5', 
      text: 'Sigurd har fått svineinfluensa og kan dessverre ikke komme i barnehagen.', 
      sender: 'Lucas Fjongers', 
      isMe: false 
    },
  ]);

  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'Ansatt',
        isMe: true,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageWrapper,
        item.isMe ? styles.myWrapper : styles.theirWrapper
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.isMe ? styles.myBubble : styles.theirBubble
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/chatOverview")}
        >
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lucas Fjongers</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        style={styles.messagesContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Skriv en melding..."
            placeholderTextColor="#999"
            multiline
            maxLength={500}
          />
          <TouchableOpacity onPress={sendMessage} disabled={!inputText.trim()}>
            <Text
              style={[
                styles.sendButton,
                !inputText.trim() && styles.sendButtonDisabled,
              ]}
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: { marginRight: 16 },
  backButtonText: { fontSize: 28, color: '#000', lineHeight: 28 },
  headerTitle: {
    fontSize: 20, fontWeight: '600', color: '#000', flex: 1, textAlign: 'center',
    marginRight: 28,
  },

  messagesContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messageList: {
    padding: 20,
  },

  /* wrappers */
  messageWrapper: {
    marginBottom: 18,
    maxWidth: '85%',
  },
  theirWrapper: {
    alignSelf: 'flex-start',
  },
  myWrapper: {
    alignSelf: 'flex-end',
  },

  /* Message-bubbles */
  messageBubble: {
    padding: 12,
    borderRadius: 12,
  },
  theirBubble: {
    backgroundColor: '#FBB599',
    borderTopLeftRadius: 2,
  },
  myBubble: {
    backgroundColor: '#fff',
    borderTopRightRadius: 2,
  },

  messageText: {
    fontSize: 15,
    lineHeight: 20,
    color: '#000',
  },

  inputContainer: {
    padding: 16,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    maxHeight: 100,
  },
  sendButton: {
    color: '#ff5722',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    color: '#ccc',
  },
});
