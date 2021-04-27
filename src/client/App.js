import React, { useReducer } from 'react';
import { AppRouter } from './routers/AppRouter';
import { AuthContext } from './auth/AuthContext';
import { authReducer } from './auth/authReducer';

function App() {
	const [userAuth, dispatch] = useReducer(authReducer, {});

	return (
		<AuthContext.Provider value={{ userAuth, dispatch }}>
			<AppRouter />
		</AuthContext.Provider>
	);
}

export default App;
