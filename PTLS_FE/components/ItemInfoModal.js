import { useState } from "react";
import { View, Modal, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CartList } from "../utils/classes";
import { useRecoilState } from "recoil";

import { setCartItems } from "../store/setCartItems";

function ItemInfoModal({ visible, setVisible, id, name, location, total }) {
  const [orderCount, setOrderCount] = useState(0);
  const [items, setItems] = useRecoilState(setCartItems);

  const closeModal = () => {
    setVisible(!visible);
    setOrderCount(0);
  };

  // A function that reduces the amount of water to be placed in the cart.
  const subBtnClick = () => {
    if (orderCount > 0) {
      setOrderCount(orderCount - 1);
    }
  };

  // Function that increases the quantity to be placed in the cart.
  const plusBtnClick = () => {
    if (orderCount < total) {
      setOrderCount(orderCount + 1);
    }
  };

  // Function to add as many quantities as you choose to the cart.
  const addBtnClick = () => {
    if (orderCount <= 0) {
      Alert.alert("Not available for ordering.");
    } else {
      const order = new CartList(id, name, orderCount);
      setItems((oldItems) => [...oldItems, order]);
    }
  };

  return (
    <Modal animationType="fade" visible={visible} transparent statusBarTranslucent>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          closeModal();
        }}
      >
        <View style={styles.modalBox}>
          <View style={styles.closeBox}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                closeModal();
              }}
            >
              <Text>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.IdAndNameBox}>
            <Text style={{ fontSize: 25, fontWeight: "600", marginLeft: 10 }}>
              {id}. {name}
            </Text>
          </View>
          <View style={styles.locationAndTotalBox}>
            <Text style={{ marginLeft: 10, fontSize: 15 }}>Location: {location}</Text>
          </View>
          <View style={styles.locationAndTotalBox}>
            <Text style={{ marginLeft: 10, fontSize: 15 }}>Item count: {total}</Text>
          </View>
          <View style={styles.orderBox}>
            <View style={styles.plussubBox}>
              <TouchableOpacity
                style={styles.subBtn}
                onPress={() => {
                  subBtnClick();
                }}
              >
                <Text style={{ fontSize: 20 }}>▼</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 20 }}>{orderCount}</Text>
              <TouchableOpacity
                style={styles.plusBtn}
                onPress={() => {
                  plusBtnClick();
                }}
              >
                <Text style={{ fontSize: 20 }}>▲</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.orderBtnBox}>
              <TouchableOpacity
                style={styles.orderBtn}
                onPress={() => {
                  addBtnClick();
                }}
              >
                <Text style={{ color: "white", fontWeight: "500" }}>ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default ItemInfoModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalBox: {
    width: "60%",
    height: "30%",
    backgroundColor: "white",
    borderRadius: 8,
    flexDirection: "column",
  },
  closeBox: {
    width: "100%",
    height: "8%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  closeBtn: {
    width: "10%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  IdAndNameBox: {
    width: "100%",
    height: "30%",
    display: "flex",
    justifyContent: "center",
  },
  locationAndTotalBox: {
    width: "100%",
    height: "15%",
    display: "flex",
    justifyContent: "center",
  },
  orderBox: {
    width: "100%",
    height: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  plussubBox: {
    width: "40%",
    height: "100",
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subBtn: {
    marginRight: 10,
    borderWidth: 1,
  },
  plusBtn: {
    marginLeft: 10,
    borderWidth: 1,
  },
  orderBtnBox: {
    width: "30%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  orderBtn: {
    width: "100%",
    height: "50%",
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
});
