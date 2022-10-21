import React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { observer } from "mobx-react-lite";

import { useStore } from "../../stores/store";
import PostsListItem from "./PostsListItem";

const PostsList = () => {
  const { posts, postsLimit, hasMore, loadMore, selectPost } =
    useStore().postStore;
  const navigation = useNavigation();

  const handleSelect = (id) => {
    const success = selectPost(id);

    if (success) {
      navigation.navigate("PostsView");
    }
  };

  return (
    <FlatList
      className="flex-1"
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PostsListItem post={item} handleSelect={handleSelect} />
      )}
      initialNumToRender={postsLimit}
      onEndReachedThreshold={0.5}
      onEndReached={loadMore}
      ListFooterComponent={() =>
        hasMore ? <ActivityIndicator size="large" color="black" /> : null
      }
    />
  );
};

export default observer(PostsList);
