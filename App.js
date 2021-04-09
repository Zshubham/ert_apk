import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Newspage from './src/screens/Newspage';
import CreatePost from './src/screens/CreatePost';
import CommentScreen from './src/screens/CommentScreen';
import UserProfile from './src/screens/UserProfile';
import { setToken, getUserId, logOut } from './src/Actions';
import { useSelector, useDispatch } from 'react-redux'

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    dispatch(setToken())
    dispatch(getUserId())

  }, [])

  const onPressLogout = () => {
    dispatch(logOut())
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token == null ? <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </>
          : <>
            <Stack.Screen
              name="NewsPage"
              component={Newspage}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#101726',
                },
                headerTintColor: '#43D9BD',
                headerRight: () => (
                  <Icon
                    name="logout"
                    size={30}
                    color="#43D9BD"
                    onPress={() => onPressLogout()}
                    style={{ marginRight: 10 }} />
                )
              }} />
            <Stack.Screen
              name="CreatePost"
              component={CreatePost}
              options={{
                headerShown: true, headerStyle: {
                  backgroundColor: '#2E3D59',
                },
                headerTintColor: '#43D9BD',
              }} />
            <Stack.Screen
              name="CommentScreen"
              component={CommentScreen}
              options={{
                headerShown: true, headerStyle: {
                  backgroundColor: '#2E3D59',
                },
                headerTintColor: '#43D9BD',
              }} />
            <Stack.Screen
              name="UserProfile"
              component={UserProfile}
              options={{
                headerShown: false, headerStyle: {
                  backgroundColor: '#101726',
                },
                headerTintColor: '#43D9BD',
              }} />
          </>

        }

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;




//{x==5?shubham:nikhil}