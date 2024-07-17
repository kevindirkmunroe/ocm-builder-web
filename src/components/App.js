import React, { useEffect } from "react";
import {View, Image, Text} from 'react-native';
import { Navigate, Routes } from "react-router";

import { Router, Route } from '../navigation/router';
import {ProvideAuth} from './pages/authContext';
import OCMBuilderHeader from "./header/OCMBuilderHeader";
import StartMyProject from "./pages/StartMyProject";
import StartMyProjectClassicOCMFinish from "./pages/StartMyProjectClassicOCMFinish";
import StartMyProjectCustomFinish from "./pages/StartMyProjectCustomFinish";
import Welcome from "./pages/Welcome";
import MyProject from "./pages/MyProject";
import EmailMyProject from "./pages/EmailMyProject";
import SaveAsPDF from "./pages/SaveAsPDF";
import AddALayer from "./pages/AddALayer";
import ErrorBoundary from "./ErrorBoundary";
import EditPattern from "./pages/EditPattern";
import EditColor from "./pages/EditColor";


const App = () => {

  return (
    <ErrorBoundary fallback={<View><Image alt="OCM Coil" source="ocm-image-small.png"/><Text>An Error has occurred.</Text></View>}>
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
              <Route path="/edit-pattern" element={<EditPattern />} />
              <Route path="/edit-color" element={<EditColor />} />
              <Route path="/email" element={<EmailMyProject />} />
              <Route path="/save-as-pdf" element={<SaveAsPDF />} />

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
