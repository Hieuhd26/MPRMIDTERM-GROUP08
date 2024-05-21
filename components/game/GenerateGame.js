// import tại đây
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { Button } from "../ui/Button";
import FlipCard from "react-native-flip-card";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "../../constants/Color";

// ------------------------------------------
// |  GROUP 08: HIỆU - HIỀN ANH - HUYỀN ANH |
// ------------------------------------------

// Radio1: số hàng
// Radio2 : số cột
// "Không lật": mặt sô ở dưới, mặt icon ở trên
export function GenerateGame({ Radio1, Radio2, onStartNewGame }) {
  const [resultArray, setResultArray] = useState([]); // mảng các số để chơi
  const [isFlippedArray, setIsFlippedArray] = useState([]); // mảng trạng thái lật của TẤT CẢ các thẻ
  const [flippedIndices, setFlippedIndices] = useState([]); // mảng lưu trữ chỉ số của hai thẻ hiện ĐANG ĐƯỢC LẬT.
  const [matchedPairs, setMatchedPairs] = useState([]); // mảng để lưu trữ các chỉ số của các thẻ đã ghép đôi thành công.

  // hàm để đảo thứ tự, dùng thuật toán Fisher-Yates shuffle (Note:dùng logic khác cũng được miễn thay đổi vị trí)
  // Input: 1 mảng
  // Output: 1 mảng đã được hoán đổi vị trí
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

  // hàm tạo mảng dựa trên chỉ số chọn của người chơi
  const generateArray = () => {
    const numsOfItem = Radio2 * Radio1; // nhân vào để lấy số lượng thẻ
    let array = []; // mảng rỗng
    let flippedInitial = []; // Mảng để chứa trạng thái ban đầu của các thẻ
    for (let i = 1; i <= numsOfItem / 2; i++) {
      // làm vòng for để thêm số vào mảng, chia 2 lấy chẵn để lấy số lượng chẵn
      // Vd: 3 * 3 = 9 . Lấy 8 để chẵn và sẽ có cặp số giống nhau từ 1 đến 4 (bài thầy chơi từ số 1 nên i = 1 đầu tiên)
      array.push(i, i);
      flippedInitial.push(false, false); // Thêm trạng thái "không lật" cho mỗi thẻ vào mảng, Mỗi khi thêm một số vào array, thêm một giá trị false vào flippedInitial.
      setIsFlippedArray(flippedInitial); // Cứ sau mỗi lần thêm cặp số là set trạng thái "không lật"
      setFlippedIndices([]); // set mảng 2 thẻ ĐANG lật rỗng
      setMatchedPairs([]); // set mảng các thẻ đã ghép THÀNH CÔNG rỗng
    }
    setResultArray(shuffleArray(array)); // sau khi có mảng, thì cho qua hàm đảo thứ tự và set mảng đã đảo để chơi
  };

  // thực hiện tạo mảng để chơi
  useEffect(() => {
    generateArray();
  }, [Radio1, Radio2]); // hàm sẽ dc tạo lại mỗi khi mà có sự thay đổi về số hàng và cột

  useEffect(() => {
    console.log("Matched pairs updated:", matchedPairs);
    //console.log(matchedPairs===(resultArray-1))
    console.log("ma",matchedPairs.length)
    console.log("re",resultArray.length)
  }, [matchedPairs]);

  // hàm thực hiện reset
  const handleReset = () => {
    generateArray(); // reset thì sẽ tạo mảng mới
    const flippedInitial = Array(resultArray.length).fill(false); // Tạo mảng dựa trên độ dài của `resultArray`, tất cả giá trị là false
    setIsFlippedArray(flippedInitial); // đặt trạng thái lật là "không lật". Khi chơi mà đang dở có vài thẻ ĐÃ lật , ấn "RESET" nó sẽ lật ngược lại (về trạng thái không lật)
  };

  // hàm xử lí logic trờ chơi
  // Input: chỉ số của thẻ được ấn trong mảng
  const toggleFlip = (index) => { // LÀM THÊM KO CHO ẤN LẠI THẺ ĐÃ LẬT
    // kiểm tra ấn đủ 2 thẻ rồi xử lí, ko ấn thẻ thứ 3 và  đảm bảo rằng các thẻ đã khớp không thể được tương tác lại.
    if (flippedIndices.length === 2 || matchedPairs.includes(index)) {
      return;
    }
    // lật thẻ
    const newFlippedArray = [...isFlippedArray]; // một mảng 'newflippedarray' mới được tạo dưới dạng bản sao của mảng isflippedarray(trạng thái lật của TẤT CẢ các thẻ) hiện tại.
    newFlippedArray[index] = !newFlippedArray[index]; // trạng thái của thẻ ở chỉ mục đã chỉ định được đảo lại (tức là lật) (lật ở mảng mới)
    setIsFlippedArray(newFlippedArray); // đặt lại trạng thái lật của TẤT CẢ các thẻ (ỏ đây mảng đã có những thay đổi từ dự kiện ở trên)

    //
    const newFlippedIndices = [...flippedIndices, index]; // mảng 'newflippedindices' được tạo bằng cách sao chép các chỉ số 'flippedindices'  (hai thẻ hiện ĐANG ĐƯỢC LẬT)
    // hiện tại và thêm chỉ mục hiện tại vào nó.
    setFlippedIndices(newFlippedIndices); // trạng thái mảng 2 thẻ ghép đúng được cập nhật với mảng mới này.

    if (newFlippedIndices.length === 2) {
      //nếu 'newFlippedIndices' chứa chính xác hai chỉ số, điều đó có nghĩa là hai quân bài đã được lật và cần phải kiểm tra xem có trùng khớp hay không.
      const [firstIndex, secondIndex] = newFlippedIndices; // Destructuring
      if (resultArray[firstIndex] === resultArray[secondIndex]) {
        setMatchedPairs((prev) => {
          const newMatchedPairs = [...prev, firstIndex, secondIndex];
          if (newMatchedPairs.length === resultArray.length) {
            Alert.alert(
              "Win the game",
              "Chúc mừng con vợ đã làm đúng hết",
              [{ text: "New game", style: "destructive", onPress: handleReset }, { text: "Go back", style: "destructive", onPress: onStartNewGame }]
            );
          }
          return newMatchedPairs;
        });
        setFlippedIndices([]); 
       
      } else {
        // nếu Khác
        setTimeout(() => {
          const resetFlippedArray = [...newFlippedArray]; // mảng mới tạo dựa trên mảng trạng thái lật của tất cả các thẻ
          resetFlippedArray[firstIndex] = false; // đặt lại thẻ tại chỉ mục đó thành không lật ,
          resetFlippedArray[secondIndex] = false;
          setIsFlippedArray(resetFlippedArray); // đặt lại  mảng trạng thái lật của TẤT CẢ các thẻ,  các chỉ mục nào lật đúng thì vẫn là đúng, thẻ nào lật ko giống thì lại về false
          setFlippedIndices([]); //set mảng lưu trữ chỉ số hai thẻ đang được lật về rỗng cho lần check tiếp theo
        }, 1000);
      }
    }

    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Playing Game</Text>
      <View style={styles.gridContainer}>
        {Array.from({ length: Radio1 }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {resultArray
              .slice(rowIndex * Radio2, (rowIndex + 1) * Radio2)
              .map((item, index) => (
                <Pressable
                  onPress={() => toggleFlip(rowIndex * Radio2 + index)} //chỉ số tuyệt đối của ô hiện tại trong mảng.
                  key={index}
                  style={styles.cell}
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
      <Button onPress={handleReset}>Reset</Button>
      <Button onPress={onStartNewGame}>Back to Home</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderWidth: 3,
    borderColor: colors.primary600,
    borderRadius: 3,
    backgroundColor: colors.primary700,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#2c3e50",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#ecf0f1",
    marginBottom: 16,
  },
  // gridContainer: {
  //   //flexDirection: "column",
  //   alignItems: "center",

  // },
  row: {
    flexDirection: "row",
  },
  cell: {
    // width: 70,
    // height: 70,
    width: 70,
    height: 70,
    backgroundColor: "#1abc9c",
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    //   elevation: 4, // Add elevation for shadow (Android)
    //   shadowColor: "#000",
    //   shadowOffset: { width: 0, height: 2 },
    //   shadowOpacity: 0.3,
    //   shadowRadius: 2,
  },
  cellText: {
    color: "#ecf0f1",
    fontSize: 18,
  },
  card: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: "25%",
  },
});
