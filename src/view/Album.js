//Album
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const data = [
    { images: 'https://picsum.photos/id/53/200/300' },
    { images: 'https://picsum.photos/id/43/200/300' },
    { images: 'https://picsum.photos/200/300' },
    { images: 'https://picsum.photos/id/33/200/300' },
    { images: 'https://picsum.photos/id/34/200/300' },
    { images: 'https://picsum.photos/id/13/200/300' },
    { images: 'https://picsum.photos/id/23/200/300' },
    { images: 'https://picsum.photos/id/42/200/300' },
    { images: 'https://picsum.photos/id/51/200/300' },
    { images: 'https://picsum.photos/id/20/200/300' },
    { images: 'https://picsum.photos/id/30/200/300' },
    { images: 'https://picsum.photos/id/60/200/300' },
    { images: 'https://picsum.photos/id/70/200/300' },
    { images: 'https://picsum.photos/id/15/200/300' },
    { images: 'https://picsum.photos/id/25/200/300' },
    { images: 'https://picsum.photos/id/8/200/300' }
];

export default function Album() {
    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            <FlatList
                data={data}
                numColumns={2}
                columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
                contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
                keyExtractor={(item, idx) => item.images + idx}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                backgroundColor: '#6b7200',
                                flex: 1,
                                height: 200,
                                borderRadius: 20
                            }}
                        >
                            <Image source={{ uri: item.images }} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
                        </TouchableOpacity>
                    )
                }}
                ListHeaderComponentStyle={{ marginHorizontal: 10 }}
                ListHeaderComponent={() => (
                    <View>
                        <FlatList
                            horizontal={true}
                            style={{ paddingVertical: 5 }}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 10, paddingHorizontal: 12 }}
                            data={data}
                            keyExtractor={(item, idx) => item + idx}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        flexDirection: 'row',
                                        width: 300,
                                        height: 240,
                                        backgroundColor: "#fca5a5",
                                        borderRadius: 20
                                    }}
                                >
                                    <Image source={{ uri: item.images }} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
                                </TouchableOpacity>
                            )}
                        />
                        <View
                         style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingHorizontal: 12,
                            marginTop: 15,
                         }}
                        >
                            <Text style={{fontWeight: '600'}}>Popular</Text>
                            <Text style={{color: 'skyblue'}}>See All</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({});
