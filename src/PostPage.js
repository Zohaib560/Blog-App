import { useParams, Link } from 'react-router-dom';

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);

  //shows the full post if it exists else shows post not found page
  return (
    <main className='PostPage'>
      <article className='post'>
        {post ? 
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className='editBtn'>Edit Post</button></Link>
            <button className='deleteBtn' onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
          :
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to='/'>Go Back To Homepage</Link>
            </p>
          </>
        }
      </article>
    </main>
  )
}
  
export default PostPage