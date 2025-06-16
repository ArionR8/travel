import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Aranzhmani } from "../models/Aranzhmani";
import { useAranzhmani } from "../viewmodels/useArazhmani";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 40; // më gjerë, i përshtatet paddingut të jashtëm
const CARD_HEIGHT = 280;

const SpecialOfferBox: React.FC = () => {
  const { items, loading, error, refresh } = useAranzhmani();
  const [specialOffers, setSpecialOffers] = useState<Aranzhmani[]>([]);

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    const filtered = items
      .filter((item) => Number(item.rating) >= 4)
      .sort((a, b) => Number(b.rating) - Number(a.rating))
      .slice(0, 5);
    setSpecialOffers(filtered);
  }, [items]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("sq-AL", {
      day: "numeric",
      month: "short",
    });

  const renderStars = (rating: string) => {
    const full = Math.floor(Number(rating));
    return Array.from({ length: 5 }, (_, i) => (
      <Text key={i} style={styles.star}>
        {i < full ? "★" : "☆"}
      </Text>
    ));
  };

  const renderOffer = ({ item }: { item: Aranzhmani }) => (
    <View style={styles.card}>
      <View style={styles.image}>
        <Text style={styles.imageText}>🛫 {item.titulli}</Text>
      </View>

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <View style={styles.badge}>
        <Text style={styles.badgeText}>OFERTË SPECIALE</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {item.titulli}
        </Text>

        <View style={styles.details}>
          <Text style={styles.detailPill}>{item.nrNeteve} Netë</Text>
          <Text style={styles.detailPill}>{item.nrPersonave} Persona</Text>
        </View>

        <Text style={styles.date}>
          {formatDate(item.dataNisjes)} - {formatDate(item.dataKthimit)}
        </Text>

        <View style={styles.footer}>
          <View style={styles.stars}>{renderStars(item.rating)}</View>
          <Text style={styles.price}>€{Number(item.cmimi).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  if (loading && specialOffers.length === 0) {
    return (
      <View style={styles.feedback}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.feedback}>
        <Text style={styles.errorText}>⚠️ Gabim: {error}</Text>
        <TouchableOpacity onPress={refresh} style={styles.buttonBlue}>
          <Text style={styles.buttonText}>Provo përsëri</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {specialOffers.length > 0 ? (
        <FlatList
          data={specialOffers}
          renderItem={renderOffer}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          decelerationRate="fast"
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.feedback}>
          <Text style={styles.emptyText}>
            Nuk ka oferta speciale momentalisht
          </Text>
          <TouchableOpacity onPress={refresh} style={styles.buttonGreen}>
            <Text style={styles.buttonText}>Rifresko ofertat</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    marginBottom: 30,
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 18,
    overflow: "hidden",
    marginRight: 20,
    backgroundColor: "#f0f0f0",
    elevation: 5,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 20,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
  },
  badge: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "#dc2626",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  badgeText: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },
  details: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  detailPill: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  date: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stars: {
    flexDirection: "row",
  },
  star: {
    color: "#FFD700",
    fontSize: 20,
    marginRight: 2,
  },
  price: {
    color: "white",
    fontSize: 26,
    fontWeight: "900",
  },
  feedback: {
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 15,
  },
  buttonBlue: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonGreen: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default SpecialOfferBox;
