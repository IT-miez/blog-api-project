import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import ShortPost from './components/ShortPost';

function App() {
  const [count, setCount] = useState(0)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Perform your data fetching here (e.g., using fetch, axios, etc.)
        const response = await fetch('http://localhost:5000/post/get');
        const result = await response.json();

        // Update the state with the fetched data
        setPosts(result.posts);
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
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
      {posts.length > 0 ? (
        // Map over the data array and render properties for each item
        posts.map((item, index) => (
          <ShortPost
            key={index}
            post_id={item._id}
            author={item.author.username}
            creationDate={item.createdAt}
            title={item.title}
          />
        ))
      ) : (
        // Render loading or placeholder content while data is being fetched
        <p>Loading posts...</p>
      )}
    </div>
    </>
  )
}

export default App
