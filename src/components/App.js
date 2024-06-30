import React from 'react';
import {View} from 'react-native';
import { Router, Route } from '../router/router';
import {ProvideAuth} from './Pages/authContext';
import OCMBuilderHeader from "./Header/OCMBuilderHeader";
import StartProject from "./Pages/StartProject";
import CustomOCMFinish from "./Pages/CustomOCMFinish";
import NewFinish from "./Pages/NewFinish";
import Welcome from "./Pages/Welcome";
import { Routes } from "react-router";

const App = () => {
  return (
    <ProvideAuth>
      <Router basename="/ocmcoil">
        <View style={{flex: 1}}>
          <OCMBuilderHeader />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/start" element={<StartProject/>} />
            <Route path="/custom-finish" element={<CustomOCMFinish />} />
            <Route path="/new-finish" element={<NewFinish />} />
          </Routes>
        </View>
      </Router>
    </ProvideAuth>
  );
};

export default App;
