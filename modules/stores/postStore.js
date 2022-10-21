import { makeAutoObservable } from "mobx";
import { db } from "../../firebase";

class PostStore {
  postsRegistery = new Map();
  selectedPost = null;
  postsLimit = 10;
  hasMore = false;
  lastPostTimestamp = null;

  constructor() {
    makeAutoObservable(this);
  }

  reset = () => {
    this.postsRegistery.clear();
    this.selectedPost = null;
    this.postsLimit = 10;
    this.hasMore = false;
    this.lastPostTimestamp = null;

    this.unsubscribePosts && this.unsubscribePosts();
    this.unsubscribePosts = undefined;
  };

  get posts() {
    return Array.from(this.postsRegistery.values()).sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }

  loadPosts = () => {
    if (this.postsRegistery.size !== 0) {
      return;
    }

    this.unsubscribePosts = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .limit(this.postsLimit)
      .onSnapshot((snapshot) => {
        this.setPostsFromSnapshot(snapshot);
      });
  };

  loadMore = async () => {
    if (!this.hasMore) {
      return;
    }

    const snapshot = await db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .startAfter(this.lastPostTimestamp)
      .limit(this.postsLimit)
      .get();

    this.setPostsFromSnapshot(snapshot);
  };

  setPostsFromSnapshot = (snapshot) => {
    if (snapshot.size < this.postsLimit) {
      this.hasMore = false;
    } else {
      this.hasMore = true;
    }

    snapshot.docs.forEach((doc) => {
      // @ts-ignore
      const lastTimestamp = new Date(
        this.lastPostTimestamp?.toDate()
      ).getTime(); // @ts-ignore
      const currentTimestamp = new Date(
        doc.data().timestamp?.toDate()
      ).getTime();

      if (currentTimestamp < lastTimestamp) {
        this.lastPostTimestamp = doc.data().timestamp;
      }

      const post = {
        id: doc.id,
        ...doc.data(),
        timestamp: new Date(doc.data().timestamp?.toDate()),
      };

      this.postsRegistery.set(post.id, post);
    });
  };

  selectPost = (id) => {
    if (!this.postsRegistery.has(id)) {
      return false;
    }

    const post = this.postsRegistery.get(id);

    if (post.read) {
      return false;
    }

    this.selectedPost = { ...post, read: true };

    void db.collection("posts").doc(id).set(
      {
        read: true,
      },
      { merge: true }
    );

    return true;
  };
}

export default PostStore;
