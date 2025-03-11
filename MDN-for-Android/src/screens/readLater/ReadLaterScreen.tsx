import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SavedPageList } from '../../components/saved';
import { useReadLater } from '../../hooks/useReadLater';
import { Loading } from '../../components/common';
import { colors } from '../../styles/colors';

const ReadLaterScreen: React.FC = () => {
  const { readLaterPages, loadReadLater } = useReadLater();

  useEffect(() => {
    loadReadLater();
  }, []);

  if (!readLaterPages) return <Loading />;

  return (
    <View style={styles.container}>
      <SavedPageList 
        pages={readLaterPages}
        emptyMessage="No pages saved for later reading"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
});

export default ReadLaterScreen;