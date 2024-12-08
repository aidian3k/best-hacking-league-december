import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    fixedButton: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        backgroundColor: "#6200ea",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    elementRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    elementInfo: {
        flex: 1,
    },
});

