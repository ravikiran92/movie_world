import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainLayout from '../Layout/MainLayout'
import CommonLayout from '../Layout/CommonLayout'
import AllMovieCard from '../Components/AllMovieCard'
import { getAllMovies } from '../Api/movieApi'
import { useSelector } from 'react-redux'

const Watchlist = () => {

    const watchList = useSelector((state) => state?.Movie?.watchlist)

    return (
        <MainLayout>
            <CommonLayout>
                {
                    watchList !== undefined &&
                        watchList !== null &&
                        watchList.length > 0 ?
                        <AllMovieCard
                            data={watchList}
                            title="Watch List"
                            faveIcon={true}
                            loader={false} />
                        :
                        <>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                <Text style={styles.title}>Watch List</Text>
                            </View>
                            <Text style={{ color: '#000', fontFamily: 'Poppins-SemiBold', fontSize: 12 }}>
                                Your Watchlist is currently empty
                                Add Movies that you want to watch later by clicking Add to Watchlist.
                            </Text>
                        </>
                }



            </CommonLayout>
        </MainLayout>
    )
}

export default Watchlist

const styles = StyleSheet.create({
    title: {
        color: "#013D62",
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
})