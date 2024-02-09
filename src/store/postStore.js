import {create} from "zustand";

const usePostStore = create((set) => ({
   // the post will be an empty array initially
   posts:[],
   // CeatePost: the create post takes the post and calling the set header function, prev state and returns an object and updating the posts by getting the first post at the top so we can see the post and spread the other post   
   createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
    
   // deletePost
   deletePost: (id) => set((state) => ({posts: state.posts.filter(post => post.id !== id)})),

   // setPosts
   setPosts: (posts) => set({ posts }),

      //addComment
      // we send the postId and the comment first, we are setting our state which is the posts and we are mapping all posts and once we find the post we are commenting, we are updating the comment array with that new comments. if this is not the post we return the other posts as they were and 
      addComment: (postId,comment) => set(state => ({
         posts: state.posts.map(post => {
            if (post.id === postId) {
               return {
                  ...post,
                  // the reason we add the comment to the very end is because we want to see the new comment at the bottom of the other ones 
                  comments: [...post.comments, comment]
               }
            }
          return post;
         })
      }))

}))

export default usePostStore;