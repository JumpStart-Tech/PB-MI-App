import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function HeaderButton({buttonText}){

    return (

            <Pressable style={styles.buttonSelf}>
                <Text style={styles.buttonText}>
                    {buttonText}
                </Text>
            </Pressable>

        )
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
        lineHeight: 18.75,
    },
    buttonSelf: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 26,
        paddingRight: 26,
        borderRadius: 5,
    }
})