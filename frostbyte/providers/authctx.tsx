// providers/authctx.tsx
import { auth } from "@/firebaseConfig";
import {
  createUser,
  setUserDisplayName,
  signIn as apiSignIn,
  signOut as apiSignOut,
} from "@/api/authApi";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  signIn: (userEmail: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  createUser: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  userNameSession?: string | null;
  isLoading: boolean;
  user: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error(
      "useAuthSession must be used within an AuthSessionProvider"
    );
  }

  return value;
}

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const [userSession, setUserSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userAuthSession, setUserAuthSession] = useState<User | null>(null);

  // Lytt etter endringer i Firebase-auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuthSession(user);
        setUserSession(user.displayName ?? null);
      } else {
        setUserAuthSession(null);
        setUserSession(null);
      }
      setIsLoading(false);
    });

    // Rydd opp når komponenten unmountes
    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    signIn: async (userEmail: string, password: string) => {
      await apiSignIn(userEmail, password);
      // onAuthStateChanged fikser resten
    },
    signOut: async () => {
      await apiSignOut();
    },
    createUser: async (email, password, displayName) => {
      const newUser = await createUser(email, password);
      if (newUser) {
        await setUserDisplayName(newUser, displayName);
        setUserSession(displayName);
      }
    },
    userNameSession: userSession,
    isLoading,
    user: userAuthSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
