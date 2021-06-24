import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import MemberItem from './MemberItem';

const MemberFlatList = ({memberList}) => {
  const windowWidth = useWindowDimensions().width;
  const [multiProps, updateMultiProps] = useState({key: 1});
  const numOfCols = windowWidth > 700 ? (windowWidth > 1100 ? 3 : 2) : 1;

  useEffect(() => {
    if (numOfCols > 1) {
      updateMultiProps({
        numColumns: numOfCols,
        columnWrapperStyle: styles.justifyContentSpaceBetween,
        key: numOfCols,
      });
    } else {
      updateMultiProps({key: 1});
    }
  }, [numOfCols]);

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
        {...multiProps}
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
