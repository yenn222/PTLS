import AppNavigator from "./navigator/AppNavigator";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <RecoilRoot>
      <AppNavigator />
    </RecoilRoot>
  );
}
