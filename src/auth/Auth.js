import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { addUser, getUser } from '../data/Database';
import { auth } from '../security/Secure';


const AuthContextProvider = createContext();
export const useAuth = () => useContext(AuthContextProvider);

export const AuthContext = ({children}) =>{
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState({signIn: false, isAdmin: false});
    const [user, setUser] = useState({});

    const signIn = async(email, password) =>{
        try{
            return await auth.signInWithEmailAndPassword(email, password);
        }catch(error){
            return {error:error.message};
        }
    }

    const register = async(newUser, notify=false) =>{
        try{
            const response = await auth.createUserWithEmailAndPassword(newUser.email, newUser.password);
            delete newUser.password;
            await addUser(newUser, response?.user?.uid);

            if (notify){
                response.user.sendEmailVerification();
            }
            return response;
        }catch(error){
            return {error: error.message};
        }
    }

    const signOut = () =>{
        auth.signOut();
    }

    useEffect(()=>{
        auth.onAuthStateChanged(async(user)=>{
            let uUser = await getUser(user?.uid);
            if (Object.keys(uUser || {}).length){
                uUser["id"] = user?.uid;
            }
            setUser(uUser);
            setAuthenticated({
                signIn: Object.keys(uUser || {}).length? true: false,
                isAdmin: uUser?.isAdmin,
            });
            setLoading(false);
        });
    },[]);

    const providerValue = {
        user,
        signIn,
        register,
        signOut,
        authenticated
    }
    return(
        <AuthContextProvider.Provider value={providerValue}>
            {!loading && children}
        </AuthContextProvider.Provider>
    )
}