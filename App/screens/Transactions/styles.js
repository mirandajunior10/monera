import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: 'auto',
        height: 650,
        marginTop: 10,
        backgroundColor: "white",
    },
    header: {
        marginTop: 20,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    fontHeader: {
        color: "#666666",
        fontSize: 25,
        fontWeight: 'bold',
        marginRight: 115
    },
    menu: {
        color: "#00C79C",
        fontSize: 40,
    },
    icon: {
      paddingLeft: 20,
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
