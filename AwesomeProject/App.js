import React, {Component} from 'react';
import {Node} from 'react';
import {FAB, Button, LinearProgress} from 'react-native-elements';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Appearance,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {renderNode} from 'react-native-elements/dist/helpers';

const Header = ({color}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerText, {color: color}]}>Cypher Mains</Text>
      <Icon
        style={{paddingTop: 5}}
        name="options-vertical"
        size={30}
        color={color}
      />
    </View>
  );
};

var isDark = false;

class LinearProgressAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      time: parseInt(Date.now() / 1000) || 0,
      isDark: isDark,
    };
  }

  setProgress(progress) {
    this.setState({progress});
  }

  tick() {
    this.setState({
      time: parseInt(Date.now() / 1000),
      progress: this.state.progress + 0.03,
    });
    if (this.state.progress >= 1) {
      this.setState({progress: 0});
    }
  }

  componentDidMount() {
    Appearance.addChangeListener(({colorScheme}) => {
      this.setState({isDark: colorScheme === 'dark'});
    });
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {progress} = this.state;
    return (
      <View>
        <View
          style={{
            margin: 10,
          }}>
          <LinearProgress
            style={[
              styles.linearProgress,
              {
                backgroundColor: this.state.isDark ? '#000' : '#F0FFC2',
              },
            ]}
            value={progress}
            color={this.state.isDark ? '#F0FFC2' : '#000'}
            animation={false}
            variant="determinate"
          />
        </View>
      </View>
    );
  }
}

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <React.Fragment>
      <View style={styles.sectionContainer}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: !isDarkMode ? Colors.black : '#BFFFF0',
              },
            ]}>
            {title}
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: !isDarkMode ? Colors.black : '#BFFFF0',
              },
            ]}>
            {children}
          </Text>
        </View>
        <View>
          <LinearProgressAPI isDark={isDarkMode} />
        </View>
      </View>
    </React.Fragment>
  );
};
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  isDark = isDarkMode;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1F1C1B' : '#BFFFF0',
  };

  return (
    <View style={[backgroundStyle, {height: '100%'}]}>
      <Header color={isDarkMode ? '#Bffff0' : '#1F1C1B'} />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={backgroundStyle}>
          <Section title="Github" isDark={isDarkMode}>
            123-456
          </Section>

          <Section title="Heroku">456-789</Section>
          <Section title="HDFC Bank">128-495</Section>
          <Section title="Pikachu">458-451</Section>
          <Section title="Dragonite">420-264</Section>
          <Section title="Kadabra">{Date.now()}</Section>
        </View>
      </ScrollView>
      <View style={{alignItems: 'center', padding: 20, color: 'black'}}>
        <FAB
          visible={true}
          title="Authenticate"
          color={isDarkMode ? '#Bffff0' : '#1F1C1B'}
          titleStyle={{color: !isDarkMode ? '#Bffff0' : '#1F1C1B'}}
          upperCase={true}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    flex: 1,
    fontWeight: '400',
  },
  sectionDescription: {
    fontSize: 20,
    flex: 1,
    fontWeight: '400',
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  highlight: {
    fontWeight: '700',
  },
  rectangle: {
    marginTop: 10,
    width: 108,
    height: 0,
    borderWidth: 8,
    borderRadius: 10,
    borderColor: '#F0FFC2',
  },
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 25,
    paddingLeft: 25,
    textTransform: 'uppercase',
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
  },
  headerOptions: {
    alignSelf: 'flex-end',
  },
  linearProgress: {
    marginVertical: 10,
    borderRadius: 20,
    height: 20,
  },
});

export default App;
