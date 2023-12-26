import { useState, useEffect } from 'react'
import Navbar from './Navbar';
import ShortPost from './ShortPost';
import "../styles/profile.css"
import "../styles/shortpost.css"

import parseJwt from "../utils/parseJwt";

const Profile = () => {

  const [profileData, setProfileData] = useState()
  const [userPosts, setUserPosts] = useState("")

  useEffect(() => {
    const fetchData = async () => {

      const authToken = localStorage.getItem("auth_token")
      const tokenInformation = parseJwt(authToken)
      const userid = tokenInformation.id

      try {
        // Perform your data fetching here (e.g., using fetch, axios, etc.)
        const response = await fetch('http://localhost:5000/profile/'+userid);
        const result = await response.json();

        // Update the state with the fetched data
        console.log(result)
        setProfileData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        // Perform your data fetching here (e.g., using fetch, axios, etc.)
        const allPosts = await fetch('http://localhost:5000/profile/'+userid+"/posts");
        const allPostsResult = await allPosts.json();

        // Update the state with the fetched data
        console.log(allPostsResult)
        setUserPosts(allPostsResult);
      } catch (error) {
        console.error('Error fetching all posts of a user:', error);
      }

    };

    fetchData(); // Call the fetchData function

    // If you have cleanup logic, you can return a function from useEffect
    // This function will be called when the component is unmounted or when the dependency array changes
    // For example, if you have other dependencies, add them to the array like [dependency1, dependency2]
    // eslint-disable-next-line react-hooks/exhaustive-deps



  }, []); // Empty dependency array means the effect runs only once (on mount)

  return (
    <div>
      <Navbar></Navbar>
      {profileData ? (
        // Render content when data exists
        <div className="profile-container">
          <h1>{profileData.user.username}</h1>
          <div className="profile-inner-container">
            <h2>Bio:</h2>
            <p>{profileData.user.profileSummary}</p>
          </div>
          <div className="profile-inner-container">
            <p>Creation date: {profileData.user.createdAt}</p>
          </div>
          
        </div>
      ) : (
        // Render content or perform action when data doesn't exist
        <div>
          <h2>Loading profile data....</h2>
        </div>
      )}
      <div className="shortpost-outer-wrapper" style={{marginTop: "40px"}}>
        {userPosts.length > 0 ? (
          // Map over the data array and render properties for each item
          userPosts.map((item, index) => (
            <ShortPost
              key={index}
              post_id={item._id}
              title={item.title}
              creationDate={item.createdAtFormatted}
            />
          ))
        ) : (
          // Render loading or placeholder content while data is being fetched
          <p>Loading posts...</p>
        )}
      </div>
    </div>
  );

};


export default Profile;