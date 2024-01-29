import { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import OrderList from "./OrderList";

function OperatorScreen({ order }) {
  // The screen that you see when the role is an operator. You can view incoming orders and view details when you click on an order.
  const [finish, setFinish] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.nameBox}>
          <Text>ID</Text>
        </View>
        <View style={styles.productBox}>
          <Text>PRODUCTS</Text>
        </View>
        <View style={styles.timeAndamount}>
          <Text>TIME</Text>
        </View>
      </View>
      <FlatList
        data={order}
        renderItem={({ item }) => (
          <OrderList
            name={item.id}
            product={item.products}
            products={item.orderProducts}
            time={item.time}
            orderId={item.orderId}
            finish={finish}
            setFinish={setFinish}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

export default OperatorScreen;

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
  nameBox: {
    width: "20%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productBox: {
    width: "60%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timeAndamount: {
    width: "20%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
