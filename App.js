import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Radio } from "./components/ui/Radio";
import { colors } from "./constants/Color";
import { Button } from "./components/ui/Button";
import { GenerateGame } from "./components/game/GenerateGame";

export default function App() {
  const [selectedRadio1, setSelectedRadio1] = useState(null);
  const [selectedRadio2, setSelectedRadio2] = useState(null);


  function pickNumberHandler1(pickNumber) {
      setSelectedRadio1(pickNumber)

  }

  function pickNumberHandler2(pickNumber) {
      setSelectedRadio2(pickNumber)
      
  }
  function StartGame(){
    setSelectedRadio1(null)
    setSelectedRadio2(null)
  }
  let screen = <Radio  confirmRadio1={pickNumberHandler1} confirmRadio2 ={pickNumberHandler2}/>
  
  if(selectedRadio1 && selectedRadio2){
    screen = <GenerateGame Radio1={selectedRadio1} Radio2={selectedRadio2} onStartNewGame={StartGame} />
  }

  

  return (
    <View style={styles.container}>
     {screen}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.primary500,
    alignItems: "center",
    justifyContent: "center",
  },
});
