import { useEffect } from 'react';
import { app } from './firebase';

function App() {
  useEffect(() => {
    console.log('Firebase App initialized:', app);
    // or call Firestore/Auth functions that require `app`
  }, []);

  return (
    <div>
      <h1>Campus-Connect Yayyyy!!!</h1>
    </div>
  );
}

export default App;
