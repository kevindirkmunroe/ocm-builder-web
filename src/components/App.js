import React from 'react';
import {View} from 'react-native';
import { Router, Route } from '../navigation/router';
import {ProvideAuth} from './Pages/authContext';
import OCMBuilderHeader from "./Header/OCMBuilderHeader";
import StartProject from "./Pages/StartProject";
import OCMFinish from "./Pages/OCMFinish";
import CustomFinish from "./Pages/CustomFinish";
import Welcome from "./Pages/Welcome";
import { Navigate, Routes } from "react-router";

const App = () => {

  return (
    <ProvideAuth>
      <Router basename="/">
        <View style={{flex: 1}}>
          <OCMBuilderHeader />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/start" element={<StartProject/>} />
            <Route path="/ocm-finish" element={<OCMFinish />} />
            <Route path="/custom-finish" element={<CustomFinish />} />
          </Routes>
        </View>
      </Router>
    </ProvideAuth>
  );
};

export default App;
