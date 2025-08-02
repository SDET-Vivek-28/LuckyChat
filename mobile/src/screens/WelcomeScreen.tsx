import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  navigation: any;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#fef7e6', '#fdecc3', '#fbd68a']}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fef7e6" />
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="dog" size={120} color="#f2850e" />
        </View>
        
        <Text style={styles.title}>LuckyChat</Text>
        <Text style={styles.subtitle}>Your Talking Dog AI Assistant</Text>
        
        <View style={styles.descriptionContainer}>
                  <Text style={styles.description}>
          Meet Lucky, your friendly AI dog assistant who helps you find information quickly. 
          A tribute to a beloved companion who continues to help others. Powered by Appvik.
        </Text>
        </View>
        
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Icon name="lightbulb" size={24} color="#f2850e" />
            <Text style={styles.featureText}>Smart AI Assistant</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="message-text" size={24} color="#f2850e" />
            <Text style={styles.featureText}>Natural Conversations</Text>
          </View>
          <View style={styles.feature}>
            <Icon name="heart" size={24} color="#f2850e" />
            <Text style={styles.featureText}>Made with Love</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Chat')}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#f2850e', '#e36a0a']}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Start Chatting with Lucky</Text>
          <Icon name="arrow-right" size={20} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#4a5568',
    marginBottom: 40,
    textAlign: 'center',
  },
  descriptionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    width: '100%',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  featureText: {
    fontSize: 16,
    color: '#2d3748',
    marginLeft: 15,
    fontWeight: '500',
  },
  button: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default WelcomeScreen; 