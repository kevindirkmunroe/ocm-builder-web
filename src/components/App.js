import React from 'react';
import {View} from 'react-native';
import { Routes } from "react-router";

import { Router, Route } from '../navigation/router';
import {ProvideAuth} from './Pages/authContext';
import OCMBuilderHeader from "./Header/OCMBuilderHeader";
import StartProject from "./Pages/StartProject";
import SelectOCMFinish from "./Pages/SelectOCMFinish";
import CreateCustomFinish from "./Pages/CreateCustomFinish";
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
            <Route path="/ocm-finish" element={<SelectOCMFinish />} />
            <Route path="/custom-finish" element={<CreateCustomFinish />} />
            <Route path="/edit" element={<EditProject />} />
          </Routes>
        </View>
      </Router>
    </ProvideAuth>
  );
};

export default App;
