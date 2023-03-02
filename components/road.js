import { View } from "react-native";
const Road = function (props) {
  return (
    <>
      <View style={props.roadStyle}>
        {props.array.map((light, index) => {
          return (
            <>
              <View
                key={index}
                style={{
                  backgroundColor: light.Light,
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  margin: 4,
                  borderWidth: 4,
                  borderColor: "white",
                  opacity: light.active ? 1 : 0.1,
                }}
              ></View>
            </>
          );
        })}
      </View>
    </>
  );
};

export default Road;
