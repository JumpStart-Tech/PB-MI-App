import { StyleSheet, Pressable, Text, View } from 'react-native';

export default function RoundButton({buttonText, buttonWidth='1', style, onClick}){

    return(
        <View style={{...style}}>
            <Pressable style={[styles.buttonSelf, {width: 148 * parseInt(buttonWidth)}]}
            onPress={onClick}>
                <Text style={styles.buttonText}>
                    {buttonText}
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        lineHeight: 22,
        color: '#FFFFFF',
        paddingVertical: 12,
    },
    buttonSelf: {
        borderRadius: 100,
        alignItems: 'center',  
        backgroundColor: '#04A69D',
        alignSelf: 'center',
    },
})