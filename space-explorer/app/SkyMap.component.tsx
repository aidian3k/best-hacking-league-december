import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
    GestureHandlerRootView,
    GestureDetector,
    Gesture,
} from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDecay,
} from "react-native-reanimated";
import {Canvas, Circle, Group, Line, Path} from "@shopify/react-native-skia";

type Star = {
    ra: { h: number; m: number; s: number };
    dec: number;
    magnitude: number;
};

const stars: Star[] = [
    { ra: { h: 5, m: 34, s: 32 }, dec: -10, magnitude: 1 },
    { ra: { h: 6, m: 45, s: 20 }, dec: 20, magnitude: 2 },
    { ra: { h: 3, m: 12, s: 45 }, dec: 45, magnitude: 1.5 },
    { ra: { h: 10, m: 14, s: 15 }, dec: -30, magnitude: 3 },
    { ra: { h: 15, m: 34, s: 55 }, dec: 10, magnitude: 1.8 },
    { ra: { h: 7, m: 20, s: 12 }, dec: -20, magnitude: 2.5 },
    { ra: { h: 4, m: 45, s: 30 }, dec: 25, magnitude: 1.2 },
    { ra: { h: 11, m: 5, s: 10 }, dec: -35, magnitude: 2.7 },
];

const raToDegrees = (ra: { h: number; m: number; s: number }) => {
    return (ra.h + ra.m / 60 + ra.s / 3600) * 15;
};

const normalizeCoordinates = (raDeg: number, dec: number, size: number) => {
    const x = (raDeg / 360) * size;
    const y = size / 2 - (dec / 90) * (size / 2);
    return { x, y };
};

const SkyMap = () => {
    const [mapSize] = useState(2000);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const rotation = useSharedValue(0);
    const savedRotation = useSharedValue(0);
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    const panGesture = Gesture.Pan()
        .onStart(() => {
            savedTranslateX.value = translateX.value;
            savedTranslateY.value = translateY.value;
        })
        .onUpdate((e) => {
            const newTranslateX = savedTranslateX.value + e.translationX;
            const newTranslateY = savedTranslateY.value + e.translationY;

            console.log(newTranslateY)

            if (newTranslateX >= -850 && newTranslateX <= 850) {
                translateX.value = newTranslateX;
            }

            if (newTranslateY <= 50 && newTranslateY >= -1250) {
                translateY.value = newTranslateY;
            }
        })
        .onEnd((e) => {
            translateX.value = withDecay({
                velocity: e.velocityX,
                clamp: [-850, 850],
            });
            translateY.value = withDecay({
                velocity: e.velocityY,
                clamp: [-1250, 50],
            });
        });


    const rotationGesture = Gesture.Rotation()
        .onUpdate((e) => {
            rotation.value = savedRotation.value + e.rotation;
        })
        .onEnd(() => {
            savedRotation.value = rotation.value;
        });

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = Math.max(0.2, Math.min(2, savedScale.value * e.scale));
        })
        .onEnd(() => {
            savedScale.value = scale.value;
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { rotateZ: `${(rotation.value / Math.PI) * 180}deg` },
            { scale: scale.value },
        ],
    }));

    const generateSkyDomeCurvedLines = (radius: number, step: number) => {
        const lines = [];
        for (let i = step; i <= radius / 2; i += step) {
            lines.push({
                radius: i,
                color: i === radius / 2 ? "#FF6347" : "#00BFFF",
            });
        }
        return lines;
    };

    const generateMeridians = (centerX: number, centerY: number, radius: number, step: number) => {
        const meridians = [];
        for (let i = 0; i < 360; i += step) {
            const angleRad = (i * Math.PI) / 180;
            const x = centerX + radius * Math.cos(angleRad);
            const y = centerY + radius * Math.sin(angleRad);
            meridians.push({
                p1: { x: centerX, y: centerY },
                p2: { x, y },
            });
        }
        return meridians;
    };

    return (
        <View style={styles.container}>
            <GestureHandlerRootView>
                <GestureDetector gesture={Gesture.Simultaneous(panGesture, rotationGesture, pinchGesture)}>
                    <Animated.View style={[styles.canvasContainer, animatedStyle]}>
                        <Canvas style={{ width: mapSize, height: mapSize, zIndex: 1 }}>
                            {generateSkyDomeCurvedLines(mapSize, 100).map((line, index) => (
                                <Circle
                                    key={`line-${index}`}
                                    cx={mapSize / 2}
                                    cy={mapSize / 2}
                                    r={line.radius}
                                    color={line.color}
                                    style="stroke"
                                    strokeWidth={1}
                                    opacity={0.3}
                                />
                            ))}
                            {generateMeridians(mapSize / 2, mapSize / 2, mapSize / 2, 15).map((line, index) => (
                                <Line
                                    key={`meridian-${index}`}
                                    p1={line.p1}
                                    p2={line.p2}
                                    color="#00BFFF"
                                    strokeWidth={1}
                                    opacity={0.3}
                                />
                            ))}
                            {stars.map((star, index) => {
                                const raDeg = raToDegrees(star.ra);
                                const { x, y } = normalizeCoordinates(raDeg, star.dec, mapSize);

                                const starRadius = 5 - star.magnitude;
                                const glowRadius = starRadius * 8;

                                return (
                                    <Group key={index}>
                                        <Circle cx={x} cy={y} r={glowRadius} color="white" opacity={0.1} />
                                        <Circle cx={x} cy={y} r={starRadius} color="#FFFFFF" />
                                    </Group>
                                );
                            })}
                        </Canvas>

                    </Animated.View>
                </GestureDetector>
            </GestureHandlerRootView>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                    Zoom: {scale.value.toFixed(2)}x
                </Text>
                <Text style={styles.infoText}>
                    Rotation: {(rotation.value / Math.PI) * 180}°
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    canvasContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#090326",
        height: 2000,
        width: 2000,
        borderRadius: 1000,
        overflow: "hidden",
    },
    infoContainer: {
        position: "absolute",
        zIndex: 2,
        bottom: 40,
        left: 40,
    },
    infoText: {
        color: "#ffffff",
        fontSize: 14,
    },
});

export default SkyMap;
