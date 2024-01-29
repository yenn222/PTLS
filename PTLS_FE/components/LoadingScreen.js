import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import { useIsFocused } from "@react-navigation/native";

import { getRole } from "../store/SetRole";
import { getToken } from "../store/SetToken";
import MainPage from "../page/MainPage";

function LoadingScreen() {
  const [loading, setLoading] = useState(false);
  const [items, setItemsList] = useState([]);

  const role = useRecoilValue(getRole);
  const token = useRecoilValue(getToken);

  const isFocused = useIsFocused();

  const getItem = async () => {
    //Each role has different data from the server.
    if (role === "MANAGER") {
      await fetch(`http://${process.env.API_ADRESS}/user/manager/products`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((result) => {
          result.json().then((re) => {
            setItemsList(re);
            setLoading(true);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await fetch(`http://${process.env.API_ADRESS}/user/operator/order`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((result) => {
          result.json().then((re) => {
            setOrder(re);
            setLoading(true);
            console.log(re);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // It is a function that converts imported data into the desired format.
  const setOrder = (data) => {
    let newData = [];
    for (order of data) {
      let products = "";
      console.log(order);
      for (p of order.orderProducts) {
        products += p.name;
        products += ",";
      }
      newData.push({
        time: order.date,
        products: products,
        orderProducts: order.orderProducts,
        id: order.orderUserId,
        orderId: order.orderId,
      });
    }
    console.log(newData);
    setItemsList(newData);
  };

  useEffect(() => {
    getItem();
  }, [isFocused]);

  // If the data is imported successfully, the loading is completed and the next screen is moved on.
  return loading ? <MainPage items={items} /> : <View style={styles.container}></View>;
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
