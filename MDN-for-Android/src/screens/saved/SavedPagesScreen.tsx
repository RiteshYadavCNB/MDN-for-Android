import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useStorage } from '../../hooks/useStorage';
import { colors } from '../../styles/colors';
import SavedPageList from '@/src/components/saved/SavedPageList';
import Loading from '@/src/components/common/Loading';

const SavedPagesScreen: React.FC = () => {
  const { savedPages, loadSavedPages } = useStorage();

  useEffect(() => {
    loadSavedPages();
  }, []);

  if (!savedPages) return <Loading />;

  return (
    <View style={styles.container}>
      <SavedPageList pages={savedPages} />
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

export default SavedPagesScreen;