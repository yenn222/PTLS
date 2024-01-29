import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ItemInfoModal from "./ItemInfoModal";

function ItemList({ id, name, location, amount }) {
  const [visible, setVisible] = useState(false);
  // If you click on each item in the list, you will see information on the item, buttons that can be put in the cart, and modal that can be selected.
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setVisible(true);
      }}
    >
      <View style={styles.idBox}>
        <Text>{id}</Text>
      </View>
      <View style={styles.nameBox}>
        <Text>{name}</Text>
      </View>
      <View style={styles.locationBox}>
        <Text>{location}</Text>
      </View>
      <View style={styles.amountBox}>
        <Text>{amount}</Text>
      </View>
      <ItemInfoModal visible={visible} setVisible={setVisible} id={id} name={name} location={location} total={amount} />
    </TouchableOpacity>
  );
}

export default ItemList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "rgb(0,0,0)",
  },
  idBox: {
    width: "20%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  nameBox: {
    width: "20%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  locationBox: {
    width: "30%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  amountBox: {
    width: "30%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
