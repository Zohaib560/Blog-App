import Feed from './Feed';

const Home = ({ posts, fetchError }) => {
    return (
      <main className='Home'>
        {fetchError ? <p style={{color: 'red'}}>{`Error: ${fetchError}`}</p> 
        :
        posts.length ? 
        <Feed posts={posts} /> 
        : 
        <p style={{marginTop: '2rem'}}>No Posts to Display</p>
        }
      </main>
    )
  }
  
  export default Home