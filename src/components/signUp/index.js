import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, ActivityIndicator, ImageBackground, Image, ToastAndroid } from 'react-native';
import { auth, db } from '../../database/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import styles from './style';

export default function Signup({ }) {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () => {
        let valid = true;
        setErrorMessage('');

        if (!email) {
            setErrorMessage('Email is required');
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage('Please enter a valid email');
            valid = false;
        }

        if (!password) {
            setErrorMessage('Password is required');
            valid = false;
        } else if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters');
            valid = false;
        }

        if (!username) {
            setErrorMessage('Username is required');
            valid = false;
        }

        if (!valid) {
            Alert.alert('Error', errorMessage);
            setIsValid(false);
        }

        return valid;
    };

    const handleSignup = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;
            await setDoc(doc(db, 'users', userId), {
                email,
                username,
                createdAt: serverTimestamp(),
            });
            setEmail('');
            setPassword('');
            setUsername('');
            navigation.replace('Login');
        } catch (error) {
            Alert.alert("Signup error:", error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#2856ad" />
                    <Text style={styles.loadingText}>Please wait. Registering your account.....</Text>
                </View>
            )}
            <View style={styles.topContainer}>
                <Text style={styles.title}>Event Management App</Text>
            </View>
            <View style={styles.signupView}>
                <Text style={styles.header}>Sign up</Text>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity
                    style={[styles.signbutton, { opacity: loading || !email || !password || !username ? 0.5 : 1 }]}
                    onPress={handleSignup}
                    disabled={loading || !email || !password || !username}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.loginContainer}>
                    <Text style={styles.subheader}>Already have an account? </Text>
                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.loginText}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

