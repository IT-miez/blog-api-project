import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import ShortPost from './components/ShortPost';

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Perform your data fetching here (e.g., using fetch, axios, etc.)
        const response = await fetch('http://localhost:5000/post/get');
        const result = await response.json();

        // Update the state with the fetched data
        setPosts(result.posts);
        console.log(result.posts)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function

    // If you have cleanup logic, you can return a function from useEffect
    // This function will be called when the component is unmounted or when the dependency array changes
    // For example, if you have other dependencies, add them to the array like [dependency1, dependency2]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means the effect runs only once (on mount)


  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      
      <div className="shortpost-outer-wrapper">
      {posts.length > 0 ? (
        // Map over the data array and render properties for each item
        posts.map((item, index) => (
          <ShortPost
            key={index}
            post_id={item._id}
            author={item.author.username}
            creationDate={item.createdAtFormatted}
            title={item.title}
          />
        ))
      ) : posts.length === 0 ? (
        // Render a paragraph with the text "No posts found" if the array is empty
        <p>No posts found.</p>
      ) : (
        // Render loading or placeholder content while data is being fetched
        <p>Loading posts...</p>
      )}
    </div>
    </>
  )
}

export default App
