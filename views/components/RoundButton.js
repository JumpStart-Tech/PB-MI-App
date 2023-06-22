import { StyleSheet, Pressable, Text, View, Alert } from 'react-native';


export default function RoundButton({buttonText, buttonWidth='1', onClick}){
    return(
        <View>
            <Pressable style={[styles.buttonSelf, {width: 148 * parseInt(buttonWidth)}]}
            onPress = {onClick}>
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
        flex: 1,
        borderRadius: 100,
        alignItems: 'center',  
        backgroundColor: '#04A69D',
        alignSelf: 'center',
        marginVertical: 5,
        
    },
})