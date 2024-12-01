import { useAuthentication } from './src/hooks/useAuthentication';
import HomeStack from './src/navigation/homeStack';
import AuthStack from './src/navigation/authStack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const { user } = useAuthentication();
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  )

}