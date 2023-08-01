import { StyleSheet, Pressable, Text, View} from 'react-native';


export default function RoundButton({buttonText, buttonWidth='1', onClick, style = null, disabled}){
    const clickableStyle = (disabled) ? {opacity: .5} : {};
    return(
        <View style={clickableStyle}>
            <Pressable style={[styles.buttonSelf, style, {width: 148 * parseInt(buttonWidth)}]}
            onPress = {onClick} disabled={disabled}>
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
        marginVertical: 5,
    },
})