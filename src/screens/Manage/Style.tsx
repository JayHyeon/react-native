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


export {
    Manage, 
    CategoryManage,
    CategoryAdd
};