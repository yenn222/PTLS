import { View, Text, StyleSheet } from "react-native";

function OrderProductList({ id, name, location }) {
  return (
    <View style={styles.container}>
      <View style={styles.idBox}>
        <Text>{id}</Text>
      </View>
      <View style={styles.nameBox}>
        <Text>{name}</Text>
      </View>
      <View style={styles.locationBox}>
        <Text>{location}</Text>
      </View>
    </View>
  );
}

export default OrderProductList;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 20,
    flexDirection: "row",
  },
  idBox: {
    width: "20%",
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
  locationBox: {
    width: "40%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
