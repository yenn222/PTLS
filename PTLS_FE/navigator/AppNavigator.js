import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage, { screenOptions as LoginPageScreenOptions } from "../page/LoginPage";
import { mainHeaderOptions } from "../page/MainPage";
import LoadingScreen from "../components/LoadingScreen";
import SignUpPage, { headerOptions as SignUpPageHeaderOptions } from "../page/SignUpPage";
import CartPage, { headerOptions as CartPageHeaderOptions } from "../page/CartPage";

function AppNavigator() {
  const stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen component={LoginPage} name="Login" options={LoginPageScreenOptions} />
        <stack.Screen component={SignUpPage} name="SignUp" options={SignUpPageHeaderOptions} />
        {/* The reason why the loading page is assigned to the main page is that the main page needs a process of receiving data necessary for configuration. */}
        <stack.Screen component={LoadingScreen} name="Main" options={mainHeaderOptions} />
        <stack.Screen component={CartPage} name="Cart" options={CartPageHeaderOptions} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
