import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import EditPost from './EditPost';
import apiRequest from './apiRequests';
import { Route, Routes, useNavigate } from 'react-router-dom';
//in new version of react-router-dom switch and useHistory are replaced with Routes and useNavigate respectively
import { useState, useEffect } from 'react';
import { format } from 'date-fns';


function App() {
  //these posts are temporarily hardcoded but we will use api to get them later on
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [fetchError, setFetchError] = useState(null);
  //navigate is used to send user to a certain directory
  const navigate = useNavigate();
  const API_URL = 'http://localhost:3500/posts';

  //fetch data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not recieve expected data');
        const postList = await response.json();
        setPosts(postList);
        setFetchError(null);
      } catch (err) {
        //console.log(err.stack);
        setFetchError(err.message); 
      } 
    }
    fetchPosts();
  }, [])

  //make sure the posts are displaying in terms of recency and search results
  useEffect (() => {
    const filteredResults = posts.filter(post => (
      (post.body).toLowerCase().includes(search.toLowerCase())
      ||
      (post.title).toLowerCase().includes(search.toLowerCase())
    ))
    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = async (e) => {
    //stop page from auto reloading
    e.preventDefault();
    //find last id and create a new id that is 1 geater than last
    //if posts empty start id count at 1
    //create date for post creation and create new post and add it to posts
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id: id, title: postTitle, datetime: datetime, body: postBody};
    try {
      const postOp = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      };
      const result = await apiRequest(API_URL, postOp);
      if (result) setFetchError(result);
      setPosts([...posts, newPost]); //response.data should be same as newPost if no errors occured
      //set text fields back to empty and send user back to homepage
      setPostBody('');
      setPostTitle('');
      navigate('/');
    } catch (err) {
      //console.log(err.stack);
      setFetchError(err.message); 
    }
  }

  //edits a post content
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id: id, title: editTitle, datetime: datetime, body: editBody };
    try {
      const updateOp = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: editTitle, datetime: datetime, body: editBody})
      };
      const result = await apiRequest(`${API_URL}/${id}`, updateOp);
      if (result) setFetchError(result);
      //if post id is the one being updated change its atributes to new data else just use default post data
      setPosts(posts.map(post => post.id === id ? { ...updatedPost } : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      //console.log(err.stack);
      setFetchError(err.message); 
    }
  }

  //deletes the post with same id
  const handleDelete = async (id) => {
    try {
      const deleteOp = { method: 'DELETE'};
      const result = await apiRequest(`${API_URL}/${id}`, deleteOp);
      if (result) setFetchError(result);
      //filter out specific post
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList);
      //send user back to homepage
      navigate('/');
    } catch (err) {
      //console.log(err.stack);
      setFetchError(err.message); 
    }
  }

  return (
    <div className="App">
      <Header title='React JS Blog'/>
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route exact path='/' element={
          <Home posts={searchResults} fetchError={fetchError} />
        } />
        <Route exact path='/post' element={
          <NewPost 
          handleSubmit={handleSubmit} 
          postTitle={postTitle} 
          setPostTitle={setPostTitle} 
          postBody={postBody} 
          setPostBody={setPostBody} 
          />
        } />
        <Route exact path='/edit/:id' element={
          <EditPost 
          posts={posts}
          handleEdit={handleEdit} 
          editTitle={editTitle} 
          setEditTitle={setEditTitle} 
          editBody={editBody} 
          setEditBody={setEditBody} 
          />
        } />
        <Route exact path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route exact path='/about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
