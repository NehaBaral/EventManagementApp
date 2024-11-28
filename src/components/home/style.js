import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray'
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'green',
        borderRadius: 30,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainView: {
        height: '100%',
    },
    eventItemContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 16,
        margin: 8,
        borderRadius: 10,

    },
    transactionView: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },

    eventView1: {
        flex: 1,
    },

    eventName: {
        flexShrink: 1,
        color: 'black',
        fontSize: 16,
        marginEnd: 16,
        width: '70%',
        fontWeight: '700'
    },

    eventDate: {
        flexShrink: 1,
        color: 'black',
        fontSize: 14,
    },

    eventLocation: {
        flexShrink: 1,
        color: 'saddlebrown',
        fontSize: 14,
        marginEnd: 16,
        fontWeight : '600'
    },

    favoriteIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10
    },
})

