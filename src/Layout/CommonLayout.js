import { StyleSheet, ScrollView, View } from 'react-native'
import React from 'react'

const CommonLayout = ({ children }) => {
    return (
        <ScrollView keyboardShouldPersistTaps={'handled'}>
            <View style={styles.container}>
                {children}
            </View>
        </ScrollView>
    )
}

export default CommonLayout

const styles = StyleSheet.create({
    container: {
        padding: 14,
    },
})