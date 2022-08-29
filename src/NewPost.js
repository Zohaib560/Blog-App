const NewPost = ({ 
  handleSubmit, postTitle, setPostTitle, postBody, setPostBody 
}) => {
  //Note: forms handleSubmit function automatically recieves e as an input because it is a form
  //you couls also write it traditonally as onSubmit={(e) => handleSubmit(e)}
  return (
    <main className='NewPost'>
        <h2>New Post</h2>
        <form className='newPostForm' onSubmit={handleSubmit}>
          <label htmlFor='postTitle'>Title</label>
          <input 
          id='postTitle' 
          type='text' 
          required 
          value={postTitle} 
          onChange={(e) => setPostTitle(e.target.value)} 
          />
          <label htmlFor='postBody'>Body</label>
          <textarea 
            id='postBody'
            required
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
          <button type='submit'>Create Post</button>
        </form>
    </main>
  )
}

export default NewPost