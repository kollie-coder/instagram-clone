import {create} from "zustand";

const useUserProfileStore = create((set) => ({
    userProfile: null,
    setUserProfile:(userProfile) => set({userProfile}),

    // To update the number of posts in the profile page: we get the newly created post and calls the set header function by taking the previous state, and in the post array it only adds one more Id  and then we return an object in which the user profile state is just spreading all the previous state and for the posts, we add the newly created posts which we have the postId and the prev posts 
    addPost: (post) =>
		set((state) => ({
			userProfile: { ...state.userProfile, posts: [post.id, ...state.userProfile.posts] },
		})),

    // delete post function
    deletePost: (postId) => set((state) => ({
      userProfile: {
        ...state.userProfile,
        // it only updates the posts array and will filter the post we just deleted
      posts: state.userProfile.posts.filter((id) => id !== postId)
      },
      
    }))

}));

export default useUserProfileStore;