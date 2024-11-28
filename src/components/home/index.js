import { View, TouchableOpacity, Alert, FlatList, Text } from "react-native";
import styles from "./style";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef, useCallback } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import * as database from '../../database';
import style from "./style";
import { format } from 'date-fns';

export default function Home() {
    const navigator = useNavigation();
    const { user } = useAuthentication();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const list = useRef(null);
    const [isFavourite, setfavourite] = useState()

    const handleFABPress = () => {
        navigator.navigate('AddEvent');
    }

    useEffect(() => {
        fetchData()
    }, [user])

    async function fetchData() {
        if (user && user.email) {

            try {
                setLoading(true)
                const eventList = await database.fetchEvents(user.email)
                setEvents(eventList)
            } catch (error) {
                console.log("Error==", error);
                Alert.alert("Error", "Error loading the events");
            } finally {
                setLoading(false)
            }
        } else {
            console.log("User or user email is undefined");
        }
    }

    const formatDateTime = useCallback((date) => {
        const jsDate = date.toDate();
        return jsDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }, []);

    const handleFavorite = async(id) => {
        // try{
        //     setfavourite(!isFavourite)
        //     const updated = await database.updateEventFavourite(id,updatedEvent)
        // }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={style.eventItemContainer} onPress={() => { console.log("Item clicked") }}>
            <View style={style.transactionView}>
                <View style={style.eventView1}>
                    <Text style={style.eventName}>{item.name}</Text>
                    <Text style={style.eventLocation}>Address : {item.location} </Text>
                    <Text style={style.eventDate}>{formatDateTime(item.dateTime)}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => handleFavorite(item.id)}
                    style={style.favoriteIconContainer}
                >
                    <MaterialIcons
                        name={item.favourite ? "favorite" : "favorite-border"}
                        size={24}
                        color={item.favourite ? "red" : "gray"}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <FlatList
                ref={list}
                keyExtractor={(item) => item.id}
                data={events}
                renderItem={renderItem}
            />
            <TouchableOpacity style={styles.fab} onPress={handleFABPress}>
                <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}