import { View, StyleSheet, Text, FlatList } from "react-native";
import ItemList from "./ItemList";

function ManagerScreen({ items }) {
  // When the role is a manager, it shows information about items.
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.idBox}>
          <Text>ID</Text>
        </View>
        <View style={styles.nameBox}>
          <Text>NAME</Text>
        </View>
        <View style={styles.locationBox}>
          <Text>LOCATION</Text>
        </View>
        <View style={styles.amountBox}>
          <Text>AMOUNT</Text>
        </View>
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => <ItemList id={item.id} name={item.name} location={item.location} amount={item.productCount} />}
        keyExtractor={(items) => items.id}
      />
    </View>
  );
}

export default ManagerScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  content: {
    width: "100%",
    height: 40,
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
