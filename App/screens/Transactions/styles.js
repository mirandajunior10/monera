import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        marginTop: 10,
        backgroundColor: "white",
    },
    header: {
        marginTop: 20,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    fontHeader: {
        color: "#666666",
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: '30%'
    },
    menu: {
        color: "#00C79C",
        fontSize: 40,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    dialogInput: {
        borderBottomWidth: 1,
        borderColor: '#D4D4D4',
    }
});

export default styles;
