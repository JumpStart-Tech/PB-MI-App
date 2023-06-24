import { StyleSheet, Pressable, Text, View } from 'react-native';

export default function RoundButton({buttonText, buttonWidth='1', style}){

    return(
        <View style={{...styles.border, ...style}}>
            <Pressable style={[styles.buttonSelf, {width: 148 * parseInt(buttonWidth)}]}>
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
    border: {
        borderColor: 'orange',
        borderStyle: 'solid',
        borderWidth: 2,
    },
})