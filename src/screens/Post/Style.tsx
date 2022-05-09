import { StyleSheet } from 'react-native';

const Post = StyleSheet.create({
    Container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#FFFFFF'
    },
    Header: {
        height: 60,        
        backgroundColor: 'red',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 10000
    },
    HeaderContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    HeaderSearchIcon: {
        position: 'absolute',
        right: 20
    },
    HeaderText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    SearchArea: {
        borderWidth: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        marginLeft: 18,
        marginRight: 55
    },
    HeaderSearchText: {
        flex: 1,
        height: 30,        
        lineHeight: 30
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
    ButtonContainer: {
        height: 60,
        backgroundColor: 'red',
        paddingVertical: 5,
        marginTop: 0
    }
});

const PostWrite = StyleSheet.create({
    Container: {
        flex: 1,
        padding: '2%',
        backgroundColor: '#FFFFFF'
    },
    InputContent: {
        flex: 1,
        marginTop: '2%'        
    }  
});

const PostSearch = StyleSheet.create({
    Container: {
        padding: '2%',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF'
    },
    SearchForm: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    SearchInput: {
        flex: 1
    },
    BackButton: {   
        marginLeft: 12,
        marginRight: 16,
        marginTop: -4
    },
    SearchWordList: {
        flex: 1
    },
    ItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12
    },
    ClockIcon: {

    },
    itemWord: {
        marginLeft: 15
    }
});

export {
    Post,
    PostWrite,
    PostSearch
};