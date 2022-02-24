import React, { Component } from "react";
import { LinearProgress } from "react-native-elements";
import { StyleSheet, useColorScheme, View, Appearance } from "react-native";

class LinearProgressAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: this.getRemainingTime(),
      time: parseInt(Date.now() / 1000) || 0,
      isDark: this.props.isDark,
    };
  }

  setProgress(progress) {
    this.setState({ progress });
  }

  tick() {
    this.setState({
      time: parseInt(Date.now() / 1000),
      progress: this.state.progress + 0.03,
    });
    if (this.state.progress >= 1) {
      this.setState({ progress: 0 });
      this.props.updateFunc();
    }
  }

  getRemainingTime() {
    var time_rem = parseInt(Date.now() / 1000) % 30;
    console.log(time_rem / 30, time_rem);
    return time_rem / 30;
  }

  componentDidMount() {
    Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ isDark: colorScheme === "dark" });
    });
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <View>
        <View
          style={{
            margin: 10,
          }}
        >
          <LinearProgress
            style={[
              styles.linearProgress,
              {
                backgroundColor: this.state.isDark ? "#000" : "#F0FFC2",
              },
            ]}
            value={this.state.progress}
            color={this.state.isDark ? "#F0FFC2" : "#000"}
            animation={false}
            variant="determinate"
          />
        </View>
      </View>
    );
  }
}

const Loading = ({ updateFunc }) => {
  const isDarkMode = useColorScheme() === "dark";

  return <LinearProgressAPI isDark={isDarkMode} updateFunc={updateFunc} />;
};

const styles = StyleSheet.create({
  linearProgress: {
    marginVertical: 10,
    borderRadius: 20,
    height: 20,
  },
});

export default Loading;
