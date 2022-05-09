import { StyleSheet } from 'react-native';

const Notificate = StyleSheet.create({
    Container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#FFFFFF'
    },
    ItemContainer: {
        aspectRatio: 135 / 76,
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 5
    },
    ListContainer: {
        flex: 1,
        paddingHorizontal: 5        
    },
});

export {
    Notificate
};