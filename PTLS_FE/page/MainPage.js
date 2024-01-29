import { useState } from "react";
import CustomHeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useRecoilValue } from "recoil";
import { getRole } from "../store/SetRole";
import { CommonActions } from "@react-navigation/native";

import ManagerScreen from "../components/ManagerScreen";
import OperatorScreen from "../components/OperatorScreen";
import { View } from "react-native";

function MainPage({ items }) {
  const role = useRecoilValue(getRole);

  // The screen changes depending on the role.
  return <View>{role === "MANAGER" ? <ManagerScreen items={items} /> : <OperatorScreen order={items} />}</View>;
}

export default MainPage;

export const mainHeaderOptions = ({ route, navigation }) => {
  const { userRole } = route.params;
  return {
    title: "PTLS",
    headerBackVisible: false,
    headerTintColor: "black",
    headerTitleStyle: {
      fontSize: 30,
    },
    headerTitleAlign: "center",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        {/* If the role is not a manager, you don't need a cart function. */}
        {userRole === "MANAGER" ? (
          <Item
            title="logout"
            iconName={"ios-cart"}
            onPress={() => {
              navigation.navigate("Cart");
            }}
          />
        ) : null}
        <Item
          title="logout"
          iconName={"ios-log-out"}
          onPress={() => {
            navigation.dispatch(CommonActions.setParams({ userRole: null }));
            navigation.pop();
          }}
        />
      </HeaderButtons>
    ),
  };
};
