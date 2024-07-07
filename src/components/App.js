import React from 'react';
import {View} from 'react-native';
import { Navigate, Routes } from "react-router";

import { Router, Route } from '../navigation/router';
import {ProvideAuth} from './Pages/authContext';
import OCMBuilderHeader from "./Header/OCMBuilderHeader";
import StartMyProject from "./Pages/StartMyProject";
import StartMyProjectClassicOCMFinish from "./Pages/StartMyProjectClassicOCMFinish";
import StartMyProjectCustomFinish from "./Pages/StartMyProjectCustomFinish";
import Welcome from "./Pages/Welcome";
import MyProject from "./Pages/MyProject";
import SendMyProject from "./Pages/SendMyProject";
import SavePrintPDF from "./Pages/SavePrintPDF";
import AddALayer from "./Pages/AddALayer";
import ErrorBoundary from "./ErrorBoundary";


const App = () => {

  return (
    <ErrorBoundary fallback={<div><img alt="OCM Coil" src="ocm-image-small.png"/><h2>&nbsp;&nbsp;An Error has occurred. <a href='/'>Home</a></h2></div>}>
      <ProvideAuth>
        <Router basename="/">
          <View style={{flex: 1}}>
            <OCMBuilderHeader />
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/start" element={<StartMyProject/>} />
              <Route path="/ocm-finish" element={<StartMyProjectClassicOCMFinish />} />
              <Route path="/custom-finish" element={<StartMyProjectCustomFinish />} />
              <Route path="/my-project" element={<MyProject />} />
              <Route path="/add-layer" element={<AddALayer />} />
              <Route path="/send" element={<SendMyProject />} />
              <Route path="/save-print-pdf" element={<SavePrintPDF />} />

              {/* default redirect to home page */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </View>
        </Router>
      </ProvideAuth>
    </ErrorBoundary>
  );
};

export default App;
