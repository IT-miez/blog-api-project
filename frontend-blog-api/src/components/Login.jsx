import '../index.css'

function Login() {

    function fetchUserData(event) {
        event.preventDefault()
        console.log("test user data")
        console.log(document.querySelector('input[name="username"]').value)
        console.log(document.querySelector('input[name="password"]').value)

        let givenUsername = document.querySelector('input[name="username"]').value
        let givenPassword = document.querySelector('input[name="password"]').value
        

        fetch("http://localhost:5000/user/login",
        {
          method: "POST",
          body: {
            username: givenUsername,
            password: givenPassword
          }
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }

    return (
    <div className="login-container">
        <h1>Log In</h1>
        <hr />
        <div >
        <form className="login-information"  onSubmit={fetchUserData}> 
        <div>
            <label>Username
                <input type="text" name="username" id="username" required/>
            </label>
        </div>
        <br></br>
        <div>
            <label>Password</label>
        <input type="text" name="password" id="password" required/>
        </div>
        <input type="submit"/>
        </form>
        </div>
        
    </div>
    );
}

export default Login;