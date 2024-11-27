import { View, TouchableOpacity } from "react-native";
import styles from "./style";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function Home(){
    const navigator = useNavigation();
    const handleFABPress = () =>{
        navigator.navigate('AddEvent');
    }
    return (
        <View style = {styles.container}>
             <TouchableOpacity style={styles.fab} onPress={handleFABPress}>
                    <MaterialIcons name="add" size={24} color="white" />
                </TouchableOpacity>
        </View>
    )
}