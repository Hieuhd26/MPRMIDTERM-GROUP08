import React from "react";
import { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Pressable } from "react-native";
import { colors } from "../../constants/Color";
import { Button } from "./Button";
import {Ionicons} from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

export function Radio({ confirmRadio1, confirmRadio2 }) {
  const [selectedRadio1, setSelectedRadio1] = useState(null);
  const [selectedRadio2, setSelectedRadio2] = useState(null);
  const [resultArray, setResultArray] = useState([]);

  const options1 = [2, 3, 4, 5, 6, 7];
  const options2 = [2, 3, 4];

  function confirmRadio() {
    confirmRadio1(selectedRadio1);
    confirmRadio2(selectedRadio2);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {options1.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setSelectedRadio1(option);
             // console.log(option)
            }}
          >
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

        {options2.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setSelectedRadio2(option);
              //console.log(option)
            }}
          >
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
        <Button onPress={confirmRadio}>Play Game</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary500,
    alignItems: "center",
    justifyContent: "center",
  },
  radio: {
    width: 40,
    height: 40,
    borderWidth: 3,
    borderRadius: 20,
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
    height: 28,
    width: 28,
    borderRadius: 14,
  },
  text: {
    color: "white",
  },
});
