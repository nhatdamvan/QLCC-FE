import React from 'react';
import { useInfoViewActionsContext } from '@crema/context/InfoViewContextProvider';
// import FirebaseAuthProvider from '@crema/services/auth/FirebaseAuthProvider';
import JWTAuthAuthProvider from '@crema/services/auth/JWTAuthProvider';

const AppAuthProvider = ({ children }) => {
  const { fetchStart, fetchSuccess, fetchError, showMessage } =
    useInfoViewActionsContext();

  return (
    <JWTAuthAuthProvider
      fetchStart={fetchStart}
      fetchError={fetchError}
      fetchSuccess={fetchSuccess}
      showMessage={showMessage}
    >
      {children}
    </JWTAuthAuthProvider>
  );
};

export default AppAuthProvider;
