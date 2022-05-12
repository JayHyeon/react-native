import { StyleSheet } from 'react-native';

const Manage = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: '5%'
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
});

const CategoryManage = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: '5%'
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
});

const CategoryAdd = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: '5%'
    },
    dropdownContainer: {
        flexDirection: 'row',
        width: '100%'
    },
    dropdown: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
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
    divider: {
        width: 12
    },
});


export {
    Manage, 
    CategoryManage,
    CategoryAdd
};