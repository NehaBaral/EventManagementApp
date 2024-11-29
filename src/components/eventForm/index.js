import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./style";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuthentication } from "../../hooks/useAuthentication";
import * as database from '../../database';
import { useCallback } from "react";
import { Timestamp } from 'firebase/firestore';


export default function EventForm({ navigation, route }) {
    const { id } = route.params || {};
    const [eventName, setEventName] = useState("");
    const [location, setLocation] = useState("");
    const [favourite, setFavourite] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState('date');
    const [loading, setLoading] = useState(false)
    const { user } = useAuthentication();

    useEffect(() => {
        async function fetchEventById() {
            try {
                setLoading(true)
                const event = await database.fetchEventById(id)
                if (event) {
                    setEventName(event.name);
                    setLocation(event.location);
                    setDateTime(event.dateTime.toDate());
                    setFavourite(event.favourite)
                }
            } catch (error) {
                console.log("")
            } finally {
                setLoading(false)
            }
        }
        fetchEventById()
    }, [id])

    // const formatDateTimeData = useCallback((date) => {
    //     const jsDate = date.toDate();
    //     return jsDate.toLocaleString('en-US', {
    //         year: 'numeric',
    //         month: 'short',
    //         day: 'numeric',
    //         hour: '2-digit',
    //         minute: '2-digit'
    //     });
    // }, []);

    const showDateTimePicker = useCallback(() => {
        setShowPicker(true);
        setPickerMode('date');
    }, []);

    const formatDateTime = useCallback((date) => {
        if (date instanceof Timestamp) {
            return date.toDate().toLocaleString();
        }
        return date.toLocaleString();
    }, []);

    const onDateTimeChange = useCallback((event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setDateTime(selectedDate);
            if (pickerMode === 'date') {
                setPickerMode('time');
                setShowPicker(true);
            }
        }
    }, [pickerMode]);

    const handleSubmitEventForm = async () => {
        const data = {
            name: eventName,
            location: location,
            dateTime: Timestamp.fromDate(dateTime),
            favourite: favourite,
            email: user.email

        }
        try {
            setLoading(true)
            const eventId = await database.addEvent(data);
            if (eventId) {
                navigation.goBack();
            } else {
                Alert.alert('Error on adding events. ', 'Try again later');
            }
        }
        catch (error) {
            Alert.alert('Error on adding events. ', 'Try again later');
        } finally {
            setLoading(false)
        }
    }

    const handleEditEvent = async () => {
        const data = {
            name: eventName,
            location: location,
            dateTime: Timestamp.fromDate(dateTime),
            favourite: favourite,
            email: user.email
        }

        try {
            setLoading(true)
            const isUpdated = await database.editEvent(id, data)
            if (isUpdated) {
                navigation.goBack();
            } else {
                Alert.alert('Error on updating events. ', 'Try again later');
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#2856ad" />
                    <Text style={styles.loadingText}>Please wait. Adding.....</Text>
                </View>
            )}
            <Text style={styles.inputTitle}>Event name</Text>
            <TextInput
                placeholder=""
                value={eventName}
                onChangeText={setEventName}
                keyboardType="text"
                style={styles.input}
            />

            <Text style={styles.inputTitle}>Location</Text>
            <TextInput
                placeholder=""
                value={location}
                onChangeText={setLocation}
                keyboardType="text"
                style={styles.input}
            />

            <Text style={styles.inputTitle}>Tab below to select date and time.</Text>
            <TouchableOpacity onPress={showDateTimePicker}>
                <TextInput
                    placeholder="Tap to select date and time"
                    value={formatDateTime(dateTime)}
                    style={styles.input}
                    editable={false}
                />
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dateTime}
                    mode={pickerMode}
                    is24Hour={true}
                    display="default"
                    onChange={onDateTimeChange}
                    onTouchCancel={() => setShowPicker(false)}

                />
            )}

            <TouchableOpacity
                style={[styles.button, { opacity: !eventName || !location || !dateTime ? 0.5 : 1 }]}
                onPress={() => id === undefined ? handleSubmitEventForm() : handleEditEvent()}
                disabled={!eventName || !location || !dateTime}
            >
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View >

    )
}