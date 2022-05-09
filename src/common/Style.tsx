import { StyleSheet } from 'react-native';

const Common = StyleSheet.create({
    InputBox: {
        borderWidth: 1,
        borderRadius: 5,
        minHeight: 45,
        padding: 5
    },
    ButtonContainer: {
        flexDirection: 'row',
        marginTop: '2%'
    },
    Button: {
        flex: 1,
        padding: '3%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'column',
        backgroundColor: 'white'
    },    
    ButtonPositive: {
        marginLeft: '1%'
    },
    ButtonNegative: {
        marginRight: '1%'
    },
    ButtonText: {
        fontSize: 18
    },
    ButtonSmallText: {
        fontSize: 12,
        marginTop: 4
    },
    ButtonTextPositive: {

    },
    ButtonTextNegative: {

    },
    ButtonImage: {
        
    },
    ProgressBarContainer: {
        display: 'none',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    ProgressBar: {
        position: 'absolute'        
    }
});

export {
    Common
};