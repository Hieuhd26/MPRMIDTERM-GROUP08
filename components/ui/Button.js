import { StyleSheet, View, Text, Pressable } from "react-native";
import { colors } from "../../constants/Color";
export function Button({children, onPress}){
    return(
        <View
      style={styles.buttonOuterContainer}
      // array style object
    >
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
       // android_ripple={{ color: colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
    )
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
      backgroundColor:colors.primary800,
        borderRadius: 8,
        margin: 4,
        overflow: "hidden", // nhung hieu ung nao, style nao cua vung ma di ra ngoai se KHONG duoc hien thi
      },
      buttonInnerContainer: {
        backgroundColor: colors.primary500,
        paddingVertical: 8, // top and bottom
        paddingHorizontal: 16,
        elevation: 2,
      },
      buttonText: {
        color: "white",
        textAlign: "center", // ko co key thua o trong reaCT NATIVE
        fontWeight:'bold',
        fontSize:14
      },
      pressed: {
        opacity: 0.75,
      },
  });