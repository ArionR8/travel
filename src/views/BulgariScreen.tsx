// src/views/BulgariScreen.tsx
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import BullgariImageCard from "../components/BulgariImageCard";
import Footer from "../components/Footer";
import NavBoard from "../components/NavBoard";
import { useBullgariImages } from "../viewmodels/useBulgariImage";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

const { width } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Bulgari">;

export default function BulgariScreen({ navigation }: Props) {
    const { images, loading, error } = useBullgariImages();
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length === 0) return;

        const intervalId = setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= images.length) nextIndex = 0;
            setCurrentIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }, 3000);

        return () => clearInterval(intervalId);
    }, [currentIndex, images.length]);

    if (loading) {
        return <ActivityIndicator style={{ flex: 1 }} />;
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Fixed NavBoard */}
            <View style={styles.navbarWrapper}>
                <NavBoard navigation={navigation} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollWrapper}>
                {/* Text block above carousel */}
                <View style={styles.textBlockContainer}>
                    <Text style={styles.titleText}>Bankso | Bullgari</Text>

                    <Text style={styles.descriptionText}>
                        Përjetoni aventurën e skijimit në Bullgari, një nga destinacionet më të njohura në Evropë për ski! Me
                        peisazhet e saj mahnitëse dhe skistat e shkëlqyer, Bullgaria ofron mundësi të pafundme për të gjithë ata
                        që duan të kalojnë një fundjavë të paharrueshme në mal.
                    </Text>
                </View>

                {/* Image carousel */}
                <FlatList
                    ref={flatListRef}
                    data={images}
                    keyExtractor={(img) => img.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={{ width }}>
                            <BullgariImageCard image={item} />
                        </View>
                    )}
                    getItemLayout={(_, index) => ({
                        length: width,
                        offset: width * index,
                        index,
                    })}
                    onScrollToIndexFailed={() => { }}
                    style={styles.flatList}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />

                {/* Hotel Lion Bansko Info Section */}
                <View style={styles.hotelContainer}>
                    <Text style={styles.hotelTitle}>Hotel Lion Bansko</Text>

                    <Text style={styles.hotelDescription}>
                        Mirë se vini në Hotel Lion Bansko, një destinacion ideal për ata që kërkojnë një përvojë të paharrueshme në
                        zemër të natyrës. I vendosur në një nga resortet më të njohura të skijimit dhe turizmit në Bullgari, hoteli
                        ofron komoditet dhe shërbim të shkëlqyer për çdo vizitor.
                    </Text>

                    {/* Info Table */}
                    <View style={styles.table}>
                        <View style={styles.tableRowHeader}>
                            <Text style={[styles.tableCell, styles.tableHeader]}>Lloji i shërbimit</Text>
                            <Text style={[styles.tableCell, styles.tableHeader]}>Akomodim + ski paketa</Text>
                        </View>
                        {[
                            ["Kategoria", "4 yje"],
                            ["Akomodimi", "4 ditë, 5 ditë, 6 ditë, 7 ditë"],
                            ["Shërbimi", "Half Board"],
                            ["Destinacioni", "Bullgari"],
                            ["Nuk përfshihet", "Taksat turistike"],
                        ].map(([left, right], i) => (
                            <View key={i} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{left}</Text>
                                <Text style={styles.tableCell}>{right}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.dateHeader}>01-13 Dhjetor</Text>

                    {/* Ski Pass Sections */}
                    {[
                        {
                            title: "Ski pass, Skitë dhe Shkopinjtë",
                            subtitle: "Adult",
                            prices: [
                                ["4 ditë/ 3 ditë Skijim", "€ 400"],
                                ["5 ditë/ 4 ditë Skijim", "€ 518"],
                                ["7 ditë/ 6 ditë Skijim", "€ 676"],
                            ],
                        },
                        {
                            title: "Ski pass, Skitë, Shkopinjtë dhe Këpucët për Skitë",
                            subtitle: "Adult",
                            prices: [
                                ["4 ditë/ 3 ditë Skijim", "€ 422"],
                                ["5 ditë/ 4 ditë Skijim", "€ 543"],
                                ["7 ditë/ 6 ditë Skijim", "€ 698"],
                            ],
                        },
                        {
                            title: "Big Ski pass dhe Skitë",
                            subtitle: "Adult",
                            prices: [
                                ["4 ditë/ 3 ditë Skijim", "€ 517"],
                                ["5 ditë/ 4 ditë Skijim", "€ 662"],
                                ["7 ditë/ 6 ditë Skijim", "€ 859"],
                            ],
                        },
                    ].map(({ title, subtitle, prices }, idx) => (
                        <View key={idx} style={styles.skiSection}>
                            <Text style={styles.skiTitle}>{title}</Text>
                            <Text style={styles.skiSubtitle}>{subtitle}</Text>
                            <View style={styles.table}>
                                {prices.map(([desc, price], i) => (
                                    <View key={i} style={styles.tableRow}>
                                        <Text style={styles.tableCell}>{desc}</Text>
                                        <Text style={styles.tableCell}>{price}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>

                <Footer />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 60, // space for navbar fixed at top
    },
    navbarWrapper: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: 60,
        zIndex: 100,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    scrollWrapper: {
        paddingBottom: 40,
    },
    textBlockContainer: {
        marginTop: 10,
        marginHorizontal: 20,
        alignItems: "center",
    },
    titleText: {
        color: "#1E293B",
        fontSize: 22,
        fontWeight: "700",
        letterSpacing: 0.5,
        marginBottom: 20,
        textAlign: "center",
    },
    descriptionText: {
        color: "#555555",
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },
    flatList: {
        flexGrow: 0,
        marginBottom: 20,
    },
    hotelContainer: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    hotelTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
        color: "#1E293B",
    },
    hotelDescription: {
        fontSize: 14,
        fontWeight: "400",
        color: "#555555",
        marginBottom: 20,
    },
    table: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 20,
    },
    tableRowHeader: {
        flexDirection: "row",
        backgroundColor: "#2563EB",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    tableHeader: {
        color: "#fff",
        fontWeight: "700",
        flex: 1,
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderTopWidth: 1,
        borderColor: "#ccc",
    },
    tableCell: {
        flex: 1,
        fontSize: 14,
        color: "#444",
    },
    dateHeader: {
        fontWeight: "700",
        fontSize: 16,
        marginBottom: 20,
        color: "#1E293B",
    },
    skiSection: {
        marginBottom: 30,
    },
    skiTitle: {
        fontWeight: "700",
        fontSize: 16,
        color: "#1E293B",
        marginBottom: 5,
    },
    skiSubtitle: {
        fontWeight: "500",
        fontSize: 14,
        color: "#555",
        marginBottom: 10,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "red",
        fontSize: 16,
    },
});
