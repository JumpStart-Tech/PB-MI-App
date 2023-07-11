import { StyleSheet, Pressable, Text, View} from 'react-native';


export default function RoundButton({buttonText, buttonWidth='1', onClick}){
    return(
        <View>
            <Pressable style={[styles.buttonSelf, {width: 148 * parseFloat(buttonWidth)}]}
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
        fontSize: 18,
        lineHeight: 20,
        color: '#FFFFFF',
        paddingVertical: 12,
    },
    buttonSelf: {
        borderRadius: 100,
        alignItems: 'center',  
        backgroundColor: '#04A69D',
        alignSelf: 'center',
        marginVertical: 5,
        marginHorizontal: 10,
    },
})