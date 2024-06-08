import { StyleSheet, View, Text, Pressable } from "react-native";
import { colors } from "../../constants/Color";

export function Button({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable style={styles.buttonOuterContainer} onPress={onPress}>
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    backgroundColor: colors.primary800,
    borderRadius: 8,
    margin: 10,
    overflow: "hidden",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
});
