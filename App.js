import { useAuthentication } from './src/hooks/useAuthentication';
import HomeStack from './src/navigation/homeStack';
import AuthStack from './src/navigation/authStack';

export default function App() {
  const { user } = useAuthentication();
  return user ? <HomeStack /> : <AuthStack />
}