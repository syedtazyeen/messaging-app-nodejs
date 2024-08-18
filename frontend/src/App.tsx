import React from 'react';
import { useScreen } from './providers/ScreenProvider';

const App: React.FC = () => {
    const { currentScreen } = useScreen();
    return (
        <>{currentScreen}</>
    );
};

export default App;
