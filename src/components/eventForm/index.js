import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./style";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuthentication } from "../../hooks/useAuthentication";
import * as database from '../../database';
import { useCallback } from "react";


export default function EventForm({ navigation }) {
    const [eventName, setEventName] = useState("");
    const [location, setLocation] = useState("");
    const [dateTime, setDateTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState('date');
    const [loading, setLoading] = useState(false)
    const { user } = useAuthentication();

    const showDateTimePicker = useCallback(() => {
        setShowPicker(true);
        setPickerMode('date');
    }, []);

    const formatDateTime = useCallback((date) => {
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
            dateTime: dateTime,
            favourite: false,
            email: user.email

        }
        try {
            setLoading(true)
            const id = await database.addEvent(data);
            if (id) {
                navigation.goBack();
            } else {
                Alert.alert('Error on adding events. ', 'Try again later');
            }
        } catch (error) {
            Alert.alert('Error on adding events. ', 'Try again later');
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
                onPress={handleSubmitEventForm}
                disabled={!eventName || !location || !dateTime}
            >
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>

    )
}