import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  //displaying every individual post and only displays
  //full body if body <= 25 characters else displays a preivew instead
  //and users will have to click on the link to see full post

  return (
    <article className='post'>
        <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
        </Link>
        <p className='postBody'>{
            (post.body).length <= 25 ? post.body : 
            `${(post.body).slice(0, 25)}...`
        }
        </p>
    </article>
  )
}

export default Post