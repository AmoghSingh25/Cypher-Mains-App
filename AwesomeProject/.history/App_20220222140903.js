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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {renderNode} from 'react-native-elements/dist/helpers';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Cypher Mains</Text>
      <Icon
        style={{paddingTop: 5}}
        name="options-vertical"
        size={30}
        color="#BFFFF0"
      />
    </View>
  );
};

class LinearProgressAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      time: parseInt(Date.now() / 1000) || 0,
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
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //   React.useEffect(() => {
  //     let subs = true;
  //     if (progress < 1 && progress !== 0) {
  //       setTimeout(() => {
  //         if (subs) {
  //           setProgress(progress + 0.1);
  //         }
  //       }, 100);
  //     }
  //     return () => {
  //       subs = false;
  //     };
  //   }, [progress]);

  render() {
    const {progress} = this.state;
    return (
      <View>
        <View
          style={{
            margin: 10,
          }}>
          <Text>{this.state.time}</Text>
          <LinearProgress style={{marginVertical: 10}} />
          <Text>Indeterminate Variant with color</Text>
          <LinearProgress style={{marginVertical: 10}} color="red" />
          <Text>Determinate Variant</Text>
          <LinearProgress
            style={{
              marginVertical: 10,
              borderRadius: 20,
              height: 20,
              backgroundColor: '#BFFFF0',
            }}
            value={progress}
            color="#F0FFC2"
            animation={false}
            variant="determinate"
          />

          <Button
            disabled={progress > 0}
            onPress={() => {
              setProgress(0.00001);
            }}
            title={'Start Progress'}
            containerStyle={{margin: 10}}
          />
          <Button
            disabled={progress === 0}
            onPress={() => {
              setProgress(0);
            }}
            title={'Restart'}
            containerStyle={{margin: 10}}
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
          <View style={[styles.rectangle, {zIndex: 2}]} />
          <View
            style={[
              styles.rectangle,
              {
                zIndex: -1,
                width: '100%',
                borderColor: '#000000',
                position: 'absolute',
              },
            ]}
          />
        </View>
      </View>
    </React.Fragment>
  );
};
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1F1C1B' : '#BFFFF0',
  };

  return (
    <View style={[backgroundStyle, {height: '100%'}]}>
      <Header />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={backgroundStyle}>
          <Section title="Github">123-456</Section>

          <Section title="Heroku">456-789</Section>
          <Section title="HDFC Bank">128-495</Section>
          <Section title="Pikachu">458-451</Section>
          <Section title="Dragonite">420-264</Section>
          <Section title="Kadabra">{Date.now()}</Section>
        </View>
        <LinearProgressAPI />
      </ScrollView>
      <View style={{alignItems: 'center', padding: 20, color: 'black'}}>
        <FAB
          visible={true}
          title="Authenticate"
          color="#BFFFF0"
          titleStyle={{color: 'black'}}
          upperCase={true}
          style={{color: 'black'}}
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
    textTransform: 'uppercase',
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    color: '#Bffff0',
  },
  headerOptions: {
    alignSelf: 'flex-end',
  },
});

export default App;
