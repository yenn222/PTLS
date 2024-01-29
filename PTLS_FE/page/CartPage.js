import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import { useRecoilValue, useRecoilState } from "recoil";

import { setCartItems } from "../store/setCartItems";
import { getToken } from "../store/SetToken";
import CartList from "../components/CartList";

function CartPage() {
  const [cart, setCart] = useRecoilState(setCartItems);
  const cartList = useRecoilValue(setCartItems);
  const token = useRecoilValue(getToken);

  //Replace items in the cart with the format required by the server before sending them to the server.
  const makeOrder = () => {
    const order = [];
    for (list of cartList) {
      order.push({ count: list.count, productId: list.id });
    }
    sendOrder(order);
  };

  // When you click a button, change the format and deliver it to the server.
  const sendOrder = async (order) => {
    await fetch(`http://${process.env.API_ADRESS}/user/manager/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(order),
    })
      .then((result) => {
        result.json().then((re) => {
          console.log(re);
          console.log(result);
          setCart([]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.idAndCountBox}>
          <Text style={styles.contentText}>ID</Text>
        </View>
        <View style={styles.nameBox}>
          <Text style={styles.contentText}>NAME</Text>
        </View>
        <View style={styles.idAndCountBox}>
          <Text style={styles.contentText}>COUNT</Text>
        </View>
      </View>
      <FlatList
        data={cartList}
        renderItem={({ item }) => <CartList id={item.id} name={item.name} count={item.count} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.btnBox}>
        <View style={styles.sendBtnBox}>
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => {
              makeOrder();
            }}
          >
            <Image style={{ width: 25, height: 25 }} source={require("../assets/send.png")} />
          </TouchableOpacity>
        </View>
        {/* Click the button below to erase all items in the cart. */}
        <View style={styles.resetBtnBox}>
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => {
              setCart([]);
            }}
          >
            <Image style={{ width: 25, height: 25 }} source={require("../assets/bin.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default CartPage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  content: {
    width: "100%",
    height: 40,
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
  btnBox: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    flexDirection: "row",
  },
  resetBtn: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  sendBtn: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  sendBtnBox: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  resetBtnBox: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export const headerOptions = () => {
  return {
    title: "CART",
    headerTintColor: "black",
    headerTitleStyle: {
      fontSize: 30,
    },
    headerTitleAlign: "center",
  };
};
