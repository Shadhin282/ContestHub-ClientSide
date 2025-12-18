import  { useEffect, useState, createContext, useContext } from 'react';
// import { MOCK_USERS } from '../utils/mockData';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';


const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export function AuthProvider({
  children
}) {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // mount the observer
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    // clear the observer on unmount
    return () => {
      unsubscribe();
    };
  }, []);


  const login = async (email, password) => {
    setIsLoading(true);
    
    return signInWithEmailAndPassword(auth, email, password);
  };


  const signup = (email, password) => {
    
    return createUserWithEmailAndPassword(auth, email, password);
    
  };


  const logout = () => {
     return signOut(auth)
  };

  const googleSign = () => {
    return signInWithPopup(auth, googleProvider);
  };


  const userProfile = (updateData) => {

    return updateProfile(auth.currentUser, updateData);
  };


  return <AuthContext.Provider value={{
    user,
    setUser,
    isAuthenticated: !!user,
    isLoading,
    setIsLoading,
    login,
    signup,
    logout,
    userProfile,
    googleSign
  }}>
    {children}
  </AuthContext.Provider>;
}


export const useAuth = ()=> {

  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}