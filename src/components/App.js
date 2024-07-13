import React from 'react';
import {View, Image, Text} from 'react-native';
import { Navigate, Routes } from "react-router";

import { Router, Route } from '../navigation/router';
import {ProvideAuth} from './Pages/authContext';
import OCMBuilderHeader from "./Header/OCMBuilderHeader";
import StartMyProject from "./Pages/StartMyProject";
import StartMyProjectClassicOCMFinish from "./Pages/StartMyProjectClassicOCMFinish";
import StartMyProjectCustomFinish from "./Pages/StartMyProjectCustomFinish";
import Welcome from "./Pages/Welcome";
import MyProject from "./Pages/MyProject";
import EmailMyProject from "./Pages/EmailMyProject";
import SaveAsPDF from "./Pages/SaveAsPDF";
import AddALayer from "./Pages/AddALayer";
import ErrorBoundary from "./ErrorBoundary";
import EditPattern from "./Pages/EditPattern";
import EditColor from "./Pages/EditColor";


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
