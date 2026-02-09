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
import theme from "./theme";

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
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    padding: 16,
    backgroundColor: theme.colors.card,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 12,
  },
  hamburgerButton: {
    width: 28,
    padding: 4,
  },
  hamburgerPlaceholder: {
    width: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
    textAlign: "center",
    fontWeight: "400",
  },
  menu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "60%",
    height: "100%",
    backgroundColor: theme.colors.card,
    paddingTop: 50,
    paddingHorizontal: 16,
    elevation: 5,
    zIndex: 10,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 16,
    color: theme.colors.textPrimary,
    fontWeight: "500",
  },
  chatContainer: {
    flexGrow: 1,
    padding: 16,
  },
  messageBubble: {
    maxWidth: "75%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: theme.colors.primary,
  },
  providerBubble: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  messageText: {
    fontSize: 16,
    fontWeight: "400",
  },
  emptyText: {
    textAlign: "center",
    color: theme.colors.textTertiary,
    marginTop: 20,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: theme.colors.surface,
    fontWeight: "700",
    fontSize: 14,
  },
});
