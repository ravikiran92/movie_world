import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainLayout from '../Layout/MainLayout'
import CommonLayout from '../Layout/CommonLayout'
import AllMovieCard from '../Components/AllMovieCard'
import { getAllMovies } from '../Api/movieApi'
import { useSelector } from 'react-redux'

const Favorite = () => {

    const favoriteList = useSelector((state) => state?.Movie?.favorite)

    return (
        <MainLayout>
            <CommonLayout>
                {
                    favoriteList !== undefined &&
                        favoriteList !== null &&
                        favoriteList.length > 0 ?
                        <AllMovieCard
                            data={favoriteList}
                            title="Favorite List"
                            faveIcon={true}
                            loader={false} />
                        :

                        <>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                <Text style={styles.title}>Favorite List</Text>
                            </View>
                            <Text style={{ color: '#000', fontFamily: 'Poppins-SemiBold', fontSize: 12 }}>
                                Your Favorites is currently empty
                                Add Movies that you want to watch later by clicking Add to Favorite.
                            </Text>
                        </>

                }

            </CommonLayout>
        </MainLayout>
    )
}

export default Favorite

const styles = StyleSheet.create({
    title: {
        color: "#013D62",
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
})