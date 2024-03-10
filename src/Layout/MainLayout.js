import { StyleSheet, View } from 'react-native'
import React from 'react'

const MainLayout = ({ children }) => {
    return (
        <View style={styles.main}>
            {children}
        </View>
    )
}

export default MainLayout

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
})