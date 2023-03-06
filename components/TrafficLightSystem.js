import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import Road from "./road";
const RoadLightData = [
  [
    { Light: "green", active: false },
    { Light: "yellow", active: false },
    { Light: "red", active: true },
  ],
  [
    { Light: "green", active: false },
    { Light: "yellow", active: false },
    { Light: "red", active: true },
  ],
  [
    { Light: "green", active: false },
    { Light: "yellow", active: false },
    { Light: "red", active: true },
  ],
  [
    { Light: "green", active: false },
    { Light: "yellow", active: false },
    { Light: "red", active: true },
  ],
];

function TrafficLightSystem() {
  const [arrayIndex, setArrayIndex] = useState(0);
  const [indexOfArrayIndex, setIndexOfArrayIndex] = useState(0);
  const [roadLightArray, setRoadLightArray] = useState(RoadLightData);
  const [seconds, setSeconds] = useState(40);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      let cloneArray = [...roadLightArray];
      const intervalId = setTimeout(
        () => {
          setIndexOfArrayIndex((prevIndex) => {
            let newIndex = prevIndex + 1;
            if (newIndex > 2) {
              setArrayIndex((prevArrayIndex) => prevArrayIndex + 1);
              newIndex = 0;
            }
            if (seconds !== 0 && arrayIndex > 3) {
              setArrayIndex(0);
              setIndexOfArrayIndex(0);
            }
            if (seconds == 0) {
              cloneArray[arrayIndex][0]["active"] = false;
              cloneArray[arrayIndex][1]["active"] = false;
              cloneArray[arrayIndex][2]["active"] = true;
              setRoadLightArray(cloneArray);
              clearTimeout(intervalId);
            }
            return newIndex;
          });
        },
        indexOfArrayIndex > 1 ? 100 : 5000
      );
      return () => {
        clearTimeout(intervalId);
      };
    }
  }, [arrayIndex, isRunning, indexOfArrayIndex]);

  useEffect(() => {
    if (isRunning) {
      let cloneArray = [...roadLightArray];
      if (cloneArray[arrayIndex]) {
        if (indexOfArrayIndex > 0) {
          cloneArray[arrayIndex][indexOfArrayIndex - 1]["active"] = false;
          cloneArray[arrayIndex][indexOfArrayIndex]["active"] = true;
        } else {
          cloneArray[arrayIndex][indexOfArrayIndex]["active"] = true;
          cloneArray[arrayIndex][indexOfArrayIndex + 2]["active"] = false;
        }
        setRoadLightArray(cloneArray);
      }
    }
  }, [indexOfArrayIndex, isRunning, arrayIndex]);

  useEffect(() => {
    let countdown;
    if (isRunning) {
      countdown = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 0) {
      console.log("Time's up!");
      setIsRunning(false);
    }
  }, [seconds]);

  const handleStart = () => {
    setIsRunning(true);
  };

  return (
    <View>
      <View
        style={{
          marginLeft: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontSize: 30 }}>{seconds}</Text>
        </View>
        {seconds == 40 ? (
          <TouchableOpacity
            style={{
              margin: 10,
              backgroundColor: "#0c81f6",
              padding: 8,
              borderRadius: 8,
            }}
            onPress={handleStart}
          >
            <Text style={{ fontSize: 30, color: "white" }}>Start</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={{
          padding: 8,
          borderWidth: 2,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Road
          roadStyle={{
            margin: 8,
            padding: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            borderWidth: 1,
            borderRadius: 8,
          }}
          array={roadLightArray[0]}
        />
        <Road
          roadStyle={{
            margin: 8,
            padding: 8,
            alignSelf: "flex-start",
            backgroundColor: "black",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderRadius: 8,
          }}
          array={roadLightArray[1]}
        />
        <Road
          roadStyle={{
            margin: 8,
            padding: 8,
            flexDirection: "row",
            backgroundColor: "black",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderRadius: 8,
          }}
          array={roadLightArray[2]}
        />
        <Road
          roadStyle={{
            alignSelf: "flex-end",
            position: "absolute",
            top: 100,
            right: 8,
            alignItems: "center",
            justifyContent: "center",
            margin: 8,
            padding: 8,
            backgroundColor: "black",
            borderWidth: 1,
            borderRadius: 8,
          }}
          array={roadLightArray[3]}
        />
      </View>
    </View>
  );
}

export default TrafficLightSystem;
