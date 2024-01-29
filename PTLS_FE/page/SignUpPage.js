import { useState, createRef, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";

function SignUpPage({ navigation }) {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdChek, setPwdChek] = useState("");
  const [selected, setSelected] = useState("MANAGER");
  const [idState, setIdState] = useState(true);
  const [pwdState, setPwdState] = useState(true);
  const [pwdChekState, setPwdChekState] = useState(true);
  const [visible, setVisible] = useState(true);

  const idRef = createRef();
  const pwdRef = createRef();
  const pwdChekRef = createRef();
  const btnRef = createRef();
  const pickerRef = useRef();

  const clear = () => {
    idRef.current.clear();
    pwdRef.current.clear();
    pwdChekRef.current.clear();
    idRef.current.focus();
  };

  const SignUpBtnClick = () => {
    if (!id) {
      Alert.alert("Please enter an ID.");
      setIdState(false);
      idRef.current.focus();
      return;
    } else if (!pwd) {
      Alert.alert("Please enter an PASSWORD.");
      setPwdState(false);
      pwdRef.current.focus();
      return;
    } else if (!pwdChek) {
      Alert.alert("Please enter an PASSWORD CHECK.");
      setPwdChekState(false);
      pwdChekRef.current.focus();
      return;
    } else {
      fetch(`http://${process.env.API_ADRESS}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: id,
          password: pwd,
          role: selected,
        }),
      }).then((reponse) => {
        if (reponse.status === 200) {
          clear();
          setId("");
          setPwd("");
          setPwdChek("");
          navigation.navigate("Login");
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
        <TextInput
          style={idState ? styles.input : [styles.input, { borderColor: "red" }]}
          placeholder="  ID"
          ref={idRef}
          onSubmitEditing={() => pwdRef.current && pwdRef.current.focus()}
          onChangeText={(userId) => {
            setId(userId);
            setIdState(true);
          }}
        />
        <View style={styles.pwdBox}>
          <TextInput
            style={pwdState ? [styles.input, { width: "100%" }] : [styles.input, { borderColor: "red" }]}
            placeholder="  PASSWORD"
            ref={pwdRef}
            onSubmitEditing={() => pwdChekRef.current && pwdChekRef.current.focus()}
            onChangeText={(userPwd) => {
              setPwd(userPwd);
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
        <TextInput
          style={pwdChekState ? styles.input : [styles.input, { borderColor: "red" }]}
          placeholder="  PASSWORD CHECK"
          ref={pwdChekRef}
          onSubmitEditing={() => btnRef.current && btnRef.current.focus()}
          onChangeText={(userPwdChek) => {
            setPwdChek(userPwdChek);
            setPwdChekState(true);
          }}
          secureTextEntry={visible}
        />
        <View style={styles.picker}>
          <Picker selectedValue={selected} ref={pickerRef} onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}>
            <Picker.Item label="Manager" value="MANAGER" />
            <Picker.Item label="Operator" value="OPERATOR" />
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.signUpbtn}
          ref={btnRef}
          onPress={() => {
            SignUpBtnClick();
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Sign Up</Text>
        </TouchableOpacity>
        <Text>@ HBU & TKU</Text>
      </View>
    </View>
  );
}

export default SignUpPage;

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
    height: 360,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.3)",
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
  signUpbtn: {
    width: "80%",
    height: 40,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EA7E93",
    marginBottom: 20,
  },
  picker: {
    width: "80%",
    height: 40,
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.2)",
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
export const headerOptions = () => {
  return {
    title: "SIGN UP",
    headerTintColor: "black",
    headerTitleStyle: {
      fontSize: 30,
    },
    headerTitleAlign: "center",
  };
};
