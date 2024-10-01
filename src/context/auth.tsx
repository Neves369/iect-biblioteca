import { createContext, useState, useEffect } from "react";
import IUser from "../models/IUsuario";

interface AuthContextData {
  signed: boolean;
  user: IUser | undefined;
  signIn(usuario: IUser): Promise<void>;
  signOut(): void;
  signOutClearUser(): void;
  signOutClearAll(): void;
}

const AuthContext = createContext<AuthContextData | any>({});

export const AuthProvider: any = ({ children }: any) => {
  const [signedUser, setSignedUser] = useState(false);
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    function loadStorageData() {
      const storageUser = sessionStorage.getItem("user");
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setSignedUser(true);
      }
    }
    loadStorageData();
  }, []);

  function signIn(usuario: IUser) {
    setUser(usuario);
    setSignedUser(true);
    sessionStorage.setItem("user", JSON.stringify(usuario));
  }

  //Mantém o usuário setado e encerra a sessão.
  function signOut() {
    setSignedUser(false);
  }

  //Remove o usuário setado e encerra a sessão.
  async function signOutClearAll() {
    sessionStorage.clear();
    setSignedUser(false);
    setUser(undefined);
    // await AsyncStorage.clear().then(()=>{
    //   setSignedUser(false)
    // })
  }

  //Remove o usuário setado e encerra a sessão.
  async function signOutClearUser() {
    // const keys = ["@Usuario:user"];
    // await AsyncStorage.multiRemove(keys).then(()=>{
    //   setSignedUser(false)
    // })
  }

  return (
    <AuthContext.Provider
      value={{
        signed: signedUser,
        user,
        signIn,
        signOut,
        signOutClearAll,
        signOutClearUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
