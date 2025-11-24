/**
 * @format
 */

import { AppRegistry, LogBox } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { FlatList, Text, TextInput, ScrollView } from "react-native";

const patchDefaultProps = (Component, defaultProps) => {
    const render = Component.render; // save the original render
    Component.render = function renderOverride(props, ref) {
        // merge defaults + incoming props
        return render.apply(this, [{ ...defaultProps, ...props }, ref]);
    };
};

patchDefaultProps(Text, { allowFontScaling: false });
patchDefaultProps(TextInput, { allowFontScaling: false });
patchDefaultProps(FlatList, {
    showsVerticalScrollIndicator: false,
    showsHorizontalScrollIndicator: false,
});
patchDefaultProps(ScrollView, {
    showsVerticalScrollIndicator: false,
    showsHorizontalScrollIndicator: false,
});

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
