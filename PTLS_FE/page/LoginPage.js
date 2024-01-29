import { useState, createRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert, Image } from "react-native";
import { useRecoilState } from "recoil";
import { setRole } from "../store/SetRole";
import { setToken } from "../store/SetToken";

function LoginPage({ navigation }) {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [idState, setIdState] = useState(true);
  const [pwdState, setPwdState] = useState(true);
  const [visible, setVisible] = useState(true);

  const [type, setType] = useRecoilState(setRole);
  const [userToken, setUserToken] = useRecoilState(setToken);

  const pwdInputRef = createRef();
  const idInputRef = createRef();
  const btnRef = createRef();

  const clear = () => {
    idInputRef.current.clear();
    pwdInputRef.current.clear();
    idInputRef.current.focus();
  };

  const setParms = (r, t) => {
    setType(r);
    setUserToken(t);
    move(r);
  };

  const move = (r) => {
    navigation.navigate("Main", { userRole: r });
  };

  const SignInBtnClick = async () => {
    if (!userId) {
      Alert.alert("Please enter an ID.");
      setIdState(false);
      idInputRef.current.focus();
      return;
    } else if (!userPwd) {
      Alert.alert("Please enter an PASSWORD.");
      setPwdState(false);
      pwdInputRef.current.clear();
      return;
    } else {
      await fetch(`http://${process.env.API_ADRESS}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          password: userPwd,
        }),
      }).then((reponse) => {
        if (reponse.status === 200) {
          reponse.json().then((re) => {
            setParms(re.role, re.token);
            console.log(re);
          });
          clear();
          setUserId("");
          setUserPwd("");
        } else {
          Alert.alert("Something Problem.");
          return;
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Pick To Light System</Text>
        <TextInput
          style={idState ? styles.input : [styles.input, { borderColor: "red" }]}
          id="Id"
          placeholder="  ID"
          ref={idInputRef}
          onSubmitEditing={() => pwdInputRef.current && pwdInputRef.current.focus()}
          onChangeText={(id) => {
            setUserId(id);
            setIdState(true);
          }}
        />
        <View style={styles.pwdBox}>
          <TextInput
            style={pwdState ? styles.pwdinput : [styles.pwdinput, { borderColor: "red" }]}
            id="Pwd"
            placeholder="  PASSWORD"
            ref={pwdInputRef}
            onSubmitEditing={() => btnRef.current && btnRef.current.focus()}
            onChangeText={(pwd) => {
              setUserPwd(pwd);
              setPwdState(true);
            }}
            secureTextEntry={visible}
          />
          <TouchableOpacity
            style={styles.eyeBtn}
            onPress={() => {
              setVisible(!visible);
            }}
          >
            <Image source={visible ? require("../assets/hide.png") : require("../assets/show.png")} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginbtn}
          onPress={() => {
            SignInBtnClick();
          }}
          ref={btnRef}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.signuptext}>
          <Text style={{ fontSize: 15 }}>Don't have an account?</Text>
          <Text
            style={{ backgroundColor: "#FFD65380" }}
            onPress={() => {
              navigation.navigate("SignUp");
              clear();
              setIdState(true);
              setPwdState(true);
            }}
          >
            {" "}
            You can Sign up!
          </Text>
        </View>
        <Text style={{ marginTop: 15 }}>@ HBU & TKU</Text>
      </View>
    </View>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "80%",
    height: 350,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.2)",
  },
  pwdinput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.2)",
  },
  loginbtn: {
    width: "80%",
    height: 40,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EA7E93",
  },
  title: {
    fontStyle: "italic",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 40,
  },
  signuptext: {
    width: "80%",
    height: 20,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  pwdBox: {
    width: "80%",
    height: 40,
    marginBottom: 20,
  },
  eyeBtn: {
    position: "absolute",
    right: 10,
    top: 8,
  },
});

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};
