import Post from './Post';

const Feed = ({ posts }) => {
  //mapping each post in posts
  
  return (
    <>
        {posts.map(post => (
        <Post key={post.id} post={post} />
        ))}
    </>
  )
}

export default Feed