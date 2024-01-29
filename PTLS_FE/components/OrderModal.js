import { useState } from "react";
import { View, Modal, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from "react-native";
import OrderProductList from "./OrderProductList";
import { getToken } from "../store/SetToken";
import { useRecoilValue } from "recoil";

function OrderModal({ visible, setVisible, id, products, time, orderId, finish, setFinish }) {
  const token = useRecoilValue(getToken);
  const closeModal = () => {
    setVisible(!visible);
  };

  // When you press the confirm button, the order enters and delivers the order to the hardware.
  const confirmBtnClick = async () => {
    await fetch(`http://${process.env.API_ADRESS}/user/operator/accept?orderId=${orderId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((result) => {
      result.json().then((re) => {
        console.log(re);
      });
      if (result.status === 200) {
        setFinish(!finish);
      }
    });
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
          <View style={styles.userIdBox}>
            <Text style={{ fontSize: 30, fontWeight: "700" }}>{id}</Text>
            <Text style={{ fontSize: 13, fontWeight: "500", marginTop: 15, marginLeft: 10 }}>{time}</Text>
          </View>
          <View style={styles.orderPrductsBox}>
            <View style={styles.contentBox}>
              <View style={styles.idBox}>
                <Text>ID</Text>
              </View>
              <View style={styles.nameBox}>
                <Text>NAME</Text>
              </View>
              <View style={styles.locationBox}>
                <Text>LOCATION</Text>
              </View>
            </View>
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <OrderProductList id={item.id} name={item.name} location={item.location} keyExtractor={(item) => item.id} />
              )}
            />
          </View>
          <View style={styles.confirmBtnBox}>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => {
                confirmBtnClick();
              }}
            >
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default OrderModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalBox: {
    width: "70%",
    height: "50%",
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
  userIdBox: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  contentBox: {
    flexDirection: "row",
    width: 200,
    height: 20,
    borderBottomWidth: 1,
  },
  orderPrductsBox: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    marginTop: 20,
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
  confirmBtnBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  confirmBtn: {
    width: 60,
    height: 30,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 8,
  },
});
