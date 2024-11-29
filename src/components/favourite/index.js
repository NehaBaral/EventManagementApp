import { View, TouchableOpacity, Alert, FlatList, Text, ActivityIndicator } from "react-native";
import styles from "./style";
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState, useRef, useCallback } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import * as database from '../../database';
import style from "./style";

export default function Favorite() {
    const { user } = useAuthentication();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const list = useRef(null);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [user])
    );

    const fetchData = useCallback(async () => {
        if (user && user.email) {
            try {
                setLoading(true)
                const eventList = await database.fetchFavouriteEvents()
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
    })

    //Date time formatting function
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

    const handleFavorite = async (id) => {
        try {
            // Remove the event from the local state
            const updatedEvents = events.filter(event => event.id !== id);
            setEvents(updatedEvents);

            // Update in database
            const success = await database.updateEventFavourite(id, { favourite: false });

            if (!success) {
                // Revert local state if database update fails
                setEvents(events);
                Alert.alert("Error", "Failed to update favorite status");
            }
        } catch (error) {
            console.error("Error updating favorite:", error);
            Alert.alert("Error", "Failed to update favorite status");
        }
    }

    //UI for each favourite event
    const renderItem = ({ item }) => (
        <View style={style.itemView}>
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
        </View>
    )

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#2856ad" />
                    <Text style={styles.loadingText}>Please wait. Login.....</Text>
                </View>
            )}
            {events.length === 0 ? (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>No favorite events available</Text>
                </View>
            ) : (
                <FlatList
                    ref={list}
                    keyExtractor={(item) => item.id}
                    data={events}
                    renderItem={renderItem}
                />
            )}
        </View>
    )
}