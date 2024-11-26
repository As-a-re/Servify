import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SPScreen({ route, navigation }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { serviceName = "Service", providerName = "Provider" } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const closeMenu = () => {
    if (menuOpen) setMenuOpen(false);
  };

  const sendMessage = () => {
    if (messageText.trim() === "") return;
    const newMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageText("");
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "user" ? styles.userBubble : styles.providerBubble,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          { color: item.sender === "user" ? "white" : "black" },
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {menuOpen && (
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("Main");
                toggleMenu();
              }}
            >
              <Ionicons name="home-outline" size={20} color="#2E7D32" />
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("About");
                toggleMenu();
              }}
            >
              <Ionicons name="information-circle-outline" size={20} color="#2E7D32" />
              <Text style={styles.menuText}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("Contact");
                toggleMenu();
              }}
            >
              <Ionicons name="call-outline" size={20} color="#2E7D32" />
              <Text style={styles.menuText}>Contact</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerButton}>
            <Ionicons name="menu-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Chat with {providerName}</Text>
            <Text style={styles.subtitle}>Discuss about: {serviceName}</Text>
          </View>
          <View style={styles.hamburgerPlaceholder} />
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No messages yet. Start chatting!</Text>
          }
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Type a message..."
            placeholderTextColor="#666"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  // Styles remain the same
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    padding: 20,
    backgroundColor: "#2E7D32",
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
  },
  hamburgerButton: {
    width: 28,
  },
  hamburgerPlaceholder: {
    width: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e0e0",
    marginTop: 8,
    textAlign: "center",
  },
  menu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "60%",
    height: "100%",
    backgroundColor: "#FFF",
    paddingTop: 50,
    paddingHorizontal: 20,
    elevation: 5,
    zIndex: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 15,
    color: "#333",
  },
  chatContainer: {
    flexGrow: 1,
    padding: 20,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#34D399",
  },
  providerBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e5ea",
  },
  messageText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 20,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#2E7D32",
    padding: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
