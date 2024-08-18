import React, { createContext, useContext, useState, ReactNode } from 'react';
import AuthScreen from '../screens/AuthScreen';
import MainScreen from '../screens/MainScreen';

type Screen = 'home' | 'login';

interface ScreenContextType {
    currentScreen: React.ReactNode;
    changeScreen: (screen: Screen) => void;
}

const ScreenContext = createContext<ScreenContextType | undefined>(undefined);

export const ScreenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentScreen, setCurrentScreen] = useState<React.ReactNode>(null);

    const getScreen = (screen: string) => {    
        switch (screen) {
            case 'home':
                return <MainScreen />
            default:
                return <AuthScreen />
        }
    }

    const changeScreen = (screen: Screen) => {
        setCurrentScreen(getScreen(screen));
    };

    return (
        <ScreenContext.Provider value={{ currentScreen, changeScreen }}>
            {children}
        </ScreenContext.Provider>
    );
};

export const useScreen = (): ScreenContextType => {
    const context = useContext(ScreenContext);
    if (!context) {
        throw new Error('useScreen must be used within a ScreenProvider');
    }
    return context;
};