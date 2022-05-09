import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: '5%'
    },
    title: {
        fontSize: 35
    },
    inputAreaContainer: {
        marginTop: 36,
    },
    inputArea: {
        marginTop: 8,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: 'rgb(87,174,198)'
    },
    inputBox: {
        fontSize: 20,        
        height: 50,
        padding: '2%'
    },
    loginBtnContainer: {
        justifyContent: 'flex-end',
        backgroundColor: 'rgb(87,174,198)',
        padding: 20,
        marginTop: 24,
        borderRadius: 7
    },
    loginBtnText: {
        fontSize: 20, 
        textAlign: 'center', 
        color: 'white'
    },
    joinBtnContainer: {
       marginTop: 12,
       alignItems: 'flex-end'
    },
    joinBtnText: {
        fontSize: 16 
    }
});


export default styles;