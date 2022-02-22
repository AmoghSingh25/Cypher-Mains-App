import React from 'react';
import {Node} from 'react';
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
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
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
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={backgroundStyle}>
          <Section title="Github">123-456</Section>

          <Section title="Heroku">456-789</Section>
          <Section title="HDFC Bank">128-495</Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
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
});

export default App;
