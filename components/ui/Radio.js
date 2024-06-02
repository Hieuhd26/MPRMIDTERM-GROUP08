import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Pressable } from "react-native";
import { colors } from "../../constants/Color";
import { Button } from "./Button";

export function Radio({ confirmRadio1, confirmRadio2 }) {
  const [selectedRadio1, setSelectedRadio1] = useState(null);
  const [selectedRadio2, setSelectedRadio2] = useState(null);

  const options1 = [2, 3, 4, 5, 6, 7];
  const options2 = [2, 3, 4];

  function confirmRadio() {
    confirmRadio1(selectedRadio1);
    confirmRadio2(selectedRadio2);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CARDS FLIP GAME</Text>

        <Text style={styles.instructionsTitle}>INSTRUCTIONS</Text>
        <Text style={styles.instructions}>
          Click the green cards to see what number they uncover and try to find
          the matching number underneath the other cards.
          {"\n\n"}
          Uncover two matching numbers in a row to eliminate them from the game.
          {"\n\n"}
          Eliminate all cards as fast as you can to win the game. Have fun
          FLIPing!
        </Text>
        <Text style={styles.instructionsTitle}>SELECT BOARD SIZE</Text>
      </View>

      <View style={styles.optionContainer}>
        <View style={styles.optionGroup}>
          <Text style={styles.optionTitle}>ROWS NUMBER:</Text>
          {options1.map((option, index) => (
            <Pressable key={index} onPress={() => setSelectedRadio1(option)}>
              <View style={styles.wrapper}>
                <View style={styles.radio}>
                  {selectedRadio1 === option ? (
                    <View style={styles.radioDot}></View>
                  ) : null}
                </View>
                <Text style={styles.text}>{option}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        <View style={styles.optionGroup}>
          <Text style={styles.optionTitle}>COLUMNS NUMBER:</Text>
          {options2.map((option, index) => (
            <Pressable key={index} onPress={() => setSelectedRadio2(option)}>
              <View style={styles.wrapper}>
                <View style={styles.radio}>
                  {selectedRadio2 === option ? (
                    <View style={styles.radioDot}></View>
                  ) : null}
                </View>
                <Text style={styles.text}>{option}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
      <Button onPress={confirmRadio}>Play Game</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary500,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  instructionsTitle: {
    fontSize: 18,
    color: colors.primary600,
    marginBottom: 5,
    textAlign: "left",
  },
  instructions: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    textAlign: "left",
  },
  optionContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  optionGroup: {
    alignItems: "center",
  },
  optionTitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  radio: {
    width: 30,
    height: 30,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: colors.primary600,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioDot: {
    backgroundColor: colors.primary600,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  text: {
    color: "white",
  },
});
