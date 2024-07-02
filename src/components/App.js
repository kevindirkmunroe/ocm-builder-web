import React from 'react';
import {View} from 'react-native';
import { Routes } from "react-router";

import { Router, Route } from '../navigation/router';
import {ProvideAuth} from './Pages/authContext';
import OCMBuilderHeader from "./Header/OCMBuilderHeader";
import StartProject from "./Pages/StartProject";
import StartProjectOCMFinish from "./Pages/StartProjectOCMFinish";
import StartProjectCustomFinish from "./Pages/StartProjectCustomFinish";
import Welcome from "./Pages/Welcome";
import EditProject from "./Pages/EditProject";


const App = () => {

  return (
    <ProvideAuth>
      <Router basename="/">
        <View style={{flex: 1}}>
          <OCMBuilderHeader />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/start" element={<StartProject/>} />
            <Route path="/ocm-finish" element={<StartProjectOCMFinish />} />
            <Route path="/custom-finish" element={<StartProjectCustomFinish />} />
            <Route path="/my-project" element={<EditProject />} />
          </Routes>
        </View>
      </Router>
    </ProvideAuth>
  );
};

export default App;
