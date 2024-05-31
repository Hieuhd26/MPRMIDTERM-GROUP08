// import tại đây
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Dimensions,
} from "react-native";
import { Button } from "../ui/Button";
import FlipCard from "react-native-flip-card";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "../../constants/Color";

// ------------------------------------------
// |  GROUP 08: HIỆU - HIỀN ANH - HUYỀN ANH |
// ------------------------------------------


export function GenerateGame({ Radio1, Radio2, onStartNewGame }) {
  const [resultArray, setResultArray] = useState([]); 
  const [isFlippedArray, setIsFlippedArray] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]); 
  const [matchedPairs, setMatchedPairs] = useState([]);


  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  
  const generateArray = () => {
    const numsOfItem = Radio2 * Radio1; 
    let array = []; 
    let flippedInitial = []; 
    for (let i = 1; i <= numsOfItem / 2; i++) {
      array.push(i, i);
      flippedInitial.push(false, false);
      setIsFlippedArray(flippedInitial);
      setFlippedIndices([]);
      setMatchedPairs([]);
    }
    setResultArray(shuffleArray(array)); 
  };

  useEffect(() => {
    generateArray();
  }, [Radio1, Radio2]);

  useEffect(() => {
    console.log("Matched pairs updated:", matchedPairs);
    //console.log(matchedPairs===(resultArray-1))
    console.log("ma", matchedPairs.length);
    console.log("re", resultArray.length);
  }, [matchedPairs]);

  // hàm thực hiện reset
  const handleReset = () => {
    generateArray(); 
    const flippedInitial = Array(resultArray.length).fill(false); 
    setIsFlippedArray(flippedInitial); 
  };

 
  const toggleFlip = (index) => {
 
    if (flippedIndices.length === 2 || matchedPairs.includes(index)) {
      return;
    }
   
    const newFlippedArray = [...isFlippedArray]; 
    newFlippedArray[index] = !newFlippedArray[index]; 
    setIsFlippedArray(newFlippedArray); 

    //
    const newFlippedIndices = [...flippedIndices, index]; 
  
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
    
      const [firstIndex, secondIndex] = newFlippedIndices; 
      if (resultArray[firstIndex] === resultArray[secondIndex] && firstIndex !==secondIndex) {
        setMatchedPairs((prev) => {
          const newMatchedPairs = [...prev, firstIndex, secondIndex];
          if (newMatchedPairs.length === resultArray.length) {
            Alert.alert("Win the game", "Chúc mừng con vợ đã làm đúng hết", [
              { text: "New game", style: "destructive", onPress: handleReset },
              {
                text: "Go back",
                style: "destructive",
                onPress: onStartNewGame,
              },
            ]);
          }
          return newMatchedPairs;
        });
        setFlippedIndices([]);
      } else {
        // nếu Khác
        setTimeout(() => {
          const resetFlippedArray = [...newFlippedArray]; 
          resetFlippedArray[firstIndex] = false; 
          resetFlippedArray[secondIndex] = false;
          setIsFlippedArray(resetFlippedArray); 
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth / Radio2;
  const cardHeight = screenWidth / 4;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>PLAYING GAME</Text>
      </View>
      <View>
        {Array.from({ length: Radio1 }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {resultArray
              .slice(rowIndex * Radio2, (rowIndex + 1) * Radio2)
              .map((item, index) => (
                <Pressable
                  onPress={() => toggleFlip(rowIndex * Radio2 + index)} //chỉ số tuyệt đối của ô hiện tại trong mảng.
                  key={index}
                  style={[
                    styles.cell,
                    { width: cardWidth, height: cardHeight },
                  ]}
                >
                  <FlipCard
                    style={styles.card}
                    friction={6}
                    perspective={5000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={isFlippedArray[rowIndex * Radio2 + index]}
                    clickable={false}
                  >
                    {/* Front */}
                    <View style={styles.box}>
                      <FontAwesome6 name="question" size={24} color="yellow" />
                    </View>

                    {/* Back */}
                    <View style={styles.box}>
                      {/* Render different content based on flipped and matched status */}
                      {isFlippedArray[rowIndex * Radio2 + index] &&
                      matchedPairs.includes(rowIndex * Radio2 + index) ? (
                        <FontAwesome name="remove" size={24} color="yellow" />
                      ) : (
                        <Text style={styles.cellText}>{item}</Text>
                      )}
                    </View>
                  </FlipCard>
                </Pressable>
              ))}
          </View>
        ))}
      </View>
      <View>
        <Button onPress={handleReset}>Reset</Button>
      </View>
      <View>
        <Button onPress={onStartNewGame}>Back to Home</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    borderWidth: 3,
    borderColor: colors.primary600,
    borderRadius: 3,
    backgroundColor: colors.primary700,
  },
  row: {
    flexDirection: "row",
    
    marginVertical: 5,
  },
  cell: {
    backgroundColor: colors.primary700,
    borderRadius: 9,
    margin: 5,
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center', // Center the content inside the card
    borderRadius: 4,
    
  },

  title: {
    fontSize: 24,
    color: "#ecf0f1",
    marginBottom: 16,
  },
  cellText: {
    color: "#ecf0f1",
    fontSize: 18,
  },
});
