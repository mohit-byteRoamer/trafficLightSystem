import { View } from "react-native";
const Road = function (props) {
  return (
    <>
      <View
        style={props.roadStyle}
      >
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
                  marginRight: 10,
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
