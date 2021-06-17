import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import MemberItem from './MemberItem';

const MemberFlatList = ({memberList}) => {
  return (
    <View style={styles.flexOne}>
      <FlatList
        data={memberList}
        renderItem={({item, index}) => <MemberItem item={item} key={index} />}
        keyExtractor={member => member.name.split(' ').join('')}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', padding: 30}}>
            No Data: Click above button to fetch data
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
});
export default MemberFlatList;
