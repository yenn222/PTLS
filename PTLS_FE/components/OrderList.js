import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import OrderModal from "./OrderModal";

function OrderList({ name, product, products, time, orderId, finish, setFinish }) {
  const [visible, setVisible] = useState(false);

  //  You can view incoming orders and view details when you click on an order. Click to view details through modal.
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setVisible(!visible);
      }}
      disabled={finish}
    >
      <View style={styles.nameBox}>
        <Text>{name}</Text>
      </View>
      <View style={styles.productBox}>
        <Text>{product.length > 18 ? product.slice(0, 17) + "..." : product.slice(0, 17)}</Text>
      </View>
      <View style={styles.timeAndamount}>
        <Text>{time}</Text>
      </View>
      <OrderModal
        visible={visible}
        setVisible={setVisible}
        id={name}
        products={products}
        time={time}
        orderId={orderId}
        finish={finish}
        setFinish={setFinish}
      />
      {finish ? (
        <View style={styles.goingBox}>
          <Text style={{ color: "white", fontWeight: "700" }}>On Going</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

export default OrderList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
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
  goingBox: {
    height: "60%",
    width: "30%",
    borderColor: "red",
    backgroundColor: "red",
    borderWidth: 2,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "20%",
    left: "35%",
  },
});
