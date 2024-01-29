import { View, Text, StyleSheet } from "react-native";

function CartList({ id, name, count }) {
  return (
    <View style={styles.container}>
      <View style={styles.idAndCountBox}>
        <Text style={styles.contentText}>{id}</Text>
      </View>
      <View style={styles.nameBox}>
        <Text style={styles.contentText}>{name}</Text>
      </View>
      <View style={styles.idAndCountBox}>
        <Text style={styles.contentText}>{count}</Text>
      </View>
    </View>
  );
}

export default CartList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  idAndCountBox: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  nameBox: {
    width: "40%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    fontSize: 20,
    fontWeight: "600",
  },
});
