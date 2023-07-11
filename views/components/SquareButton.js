import { StyleSheet, Pressable, Text, View} from 'react-native';


export default function SquareButton({buttonText, buttonWidth='1', buttonHeight = '1', color = '#04A69D', disabled = false, onClick}){
    return(
        <View>
            <Pressable style={[styles.buttonSelf, {width: 90 * parseFloat(buttonWidth), height: 50*parseFloat(buttonHeight), backgroundColor: (color),}]}
            onPress = {onClick}
            disabled = {disabled}>
                <Text style={styles.buttonText}>
                    {buttonText}
                </Text>
            </Pressable>
        </View>
            
    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
        lineHeight: 18,
        color: '#FFFFFF',
        paddingVertical: 15,
        textAlign: 'center',
        alignSelf: 'center',
    },
    buttonSelf: {
        borderRadius: 5,
        alignItems: 'center',  
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 5,
        marginHorizontal: 5,
    },
})