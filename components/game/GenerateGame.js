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
  const [resultArray, setResultArray] = useState([]);         // mảng các số để chơi
  const [isFlippedArray, setIsFlippedArray] = useState([]);   // mảng trạng thái lật của TẤT CẢ các thẻ
  const [flippedIndices, setFlippedIndices] = useState([]);   // mảng lưu trữ chỉ số của hai thẻ hiện ĐANG ĐƯỢC LẬT.
  const [matchedPairs, setMatchedPairs] = useState([]);       // mảng để lưu trữ các chỉ số của các thẻ đã ghép đôi thành công.


  // trộn mảng
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // tạo mảng
  const generateArray = () => {
    const numsOfItem = Radio2 * Radio1;
    let array = [];
    let flippedInitial = [];
    for (let i = 1; i <= numsOfItem / 2; i++) {
      array.push(i, i);                            // thêm số
      flippedInitial.push(false, false);          
      setIsFlippedArray(flippedInitial);           // thêm trạng thái ko lật
      setFlippedIndices([]);                      // mảng 2 thẻ ĐANG lật rỗng
      setMatchedPairs([]);                        // mảng các thẻ đã ghép THÀNH CÔNG rỗng
    }
    setResultArray(shuffleArray(array));
  };

  useEffect(() => {
    generateArray();
  }, [Radio1, Radio2]);

  // useEffect(() => {
  //   console.log("Matched pairs updated:", matchedPairs);
  //   console.log("ma", matchedPairs.length);
  //   console.log("re", resultArray.length);
  // }, [matchedPairs]);

  const handleReset = () => {
    generateArray();
    const flippedInitial = Array(resultArray.length).fill(false);
    setIsFlippedArray(flippedInitial);
  };

  const toggleFlip = (index) => {
    if (flippedIndices.length === 2 || matchedPairs.includes(index)) {  // mảng chứa 2 thẻ đang lật mà đủ thì ko ấn dc thẻ 3 hoặc 2 thẻ đã ghép thành công cũng ko ấn lại dc
      return;
    }

    const newFlippedArray = [...isFlippedArray];      // tạo bản sao mảng trạng thái lật tất cả các thẻ 
    newFlippedArray[index] = !newFlippedArray[index];  // đảo ngược trạng thái thẻ ở mảng mới
    setIsFlippedArray(newFlippedArray);                 // trạng thái lật các thẻ

    const newFlippedIndices = [...flippedIndices, index];  // tạo bản sao mảng 2 thẻ đang dc lật
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {                    // có đủ 2 thẻ trong mảng để so sánh
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (
        resultArray[firstIndex] === resultArray[secondIndex] &&          
        firstIndex !== secondIndex                                      // nếu có số giống nhau và khác index : <tránh ấn 1 thẻ 2 lần >
      ) {
        setMatchedPairs((prev) => {                                       // lưu vào mảng ghép thành công
          const newMatchedPairs = [...prev, firstIndex, secondIndex];
          if (newMatchedPairs.length === resultArray.length) {            
            Alert.alert(
              "Win the game",
              "Congratulation! You won this game. Press a button to start a new game or go back to the screen",
              [
                {
                  text: "New game",
                  style: "destructive",
                  onPress: handleReset,
                },
                {
                  text: "Go back",
                  style: "destructive",
                  onPress: onStartNewGame,
                },
              ]
            );
          }
          return newMatchedPairs;
        });
        setFlippedIndices([]);            // mảng chứa 2 thẻ đang lật về rỗng cho lần sau
      } else {
        setTimeout(() => {              // lật lại nếu ko đúng
          const resetFlippedArray = [...newFlippedArray];
          resetFlippedArray[firstIndex] = false;
          resetFlippedArray[secondIndex] = false;
          setIsFlippedArray(resetFlippedArray);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };
    // tạo thẻ, 
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  let wrapperWidth, wrapperHeight, cardWidth, cardHeight;
  if (Radio1 >= 5) {
    wrapperWidth = screenWidth;
    wrapperHeight = screenHeight;
    cardWidth = (screenWidth / (Radio2 + 0.3)) * 0.8;
    cardHeight = (screenWidth / 5) * 0.8;
  } else {
    wrapperWidth = Math.min(screenWidth, screenHeight * 0.7);
    wrapperHeight = wrapperWidth * (Radio1 / Radio2);
    cardWidth = screenWidth / (Radio2 + 0.3);
    cardHeight = screenWidth / 4;
  }

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.rootContainer,
          { width: wrapperWidth, height: wrapperHeight },
        ]}
      >
        <View style={styles.borderTitle}>
          <Text style={styles.title}>PLAYING GAME</Text>
        </View>

        <View>
          {Array.from({ length: Radio1 }).map((option, rowIndex) => (         //tạo mảng có chiều dài bằng sl hàng <hàng đại diện>, tạo từng hàng
            <View key={rowIndex} style={styles.row}>
              {resultArray
                .slice(rowIndex * Radio2, (rowIndex + 1) * Radio2)           // cắt dựa trên index đại diện hàng và sl cột 
                .map((item, index) => (
                  <Pressable
                    onPress={() => toggleFlip(rowIndex * Radio2 + index)}   // chỉ số của thẻ trong mảng ban đầu khi dc tạo (resultArray)
                    key={index}
                    style={[
                      styles.cell,
                      { width: cardWidth, height: cardHeight },
                      matchedPairs.includes(rowIndex * Radio2 + index) &&
                        styles.matchedCell,
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
                        <View style={styles.iconContainer}>
                          <FontAwesome6
                            name="question"
                            size={30}
                            color="yellow"
                          />
                        </View>
                      </View>

                      {/* Back */}
                      <View style={styles.box}>
                        {isFlippedArray[rowIndex * Radio2 + index] &&
                        matchedPairs.includes(rowIndex * Radio2 + index) ? (
                          <View style={styles.iconContainer}>
                            <FontAwesome
                              name="remove"
                              size={30}
                              color="yellow"
                            />
                          </View>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "5%",
          }}
        >
          <View style={{ marginRight: "10%" }}>
            <Button onPress={handleReset}>Reset</Button>
          </View>
          <View>
            <Button onPress={onStartNewGame}>Back to Home</Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  borderTitle: {
    marginBottom: "3%",
  },

  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    borderWidth: 3,
    borderColor: colors.primary600,
    borderRadius: 4, 
    padding: 6,
  },
  matchedCell: {
    opacity: 0.5,
  },
  row: {
    flexDirection: "row",  // xếp thẻ theo chiều ngang
    alignItems: "center",
  },
  cell: {
    backgroundColor: colors.primary700,
    borderRadius: 9,
    margin: 4,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    color: "#ecf0f1",
  },
  cellText: {
    color: colors.primary600,
    fontSize: 22,
  },
});
