import { useNavigation } from "@react-navigation/native";

const useBackHandler = (setAlertMsg: any) => {
    const navigation = useNavigation();
    const preventGoBack = (e: any) => {
        e.preventDefault();
        setAlertMsg('Cannot go back from here!')
    };
    const backHandler = () => {
        try {
            navigation.addListener("beforeRemove", preventGoBack);
        } catch (error) { }
    };
    const removeListener = () => {
        try {
            navigation.removeListener("beforeRemove", preventGoBack);
        } catch (error) { }
    };
    return { backHandler, removeListener };
};

export default useBackHandler;
