// ROUTE TEMPLATE FORMAT 

exports.post_creation_template = asyncHandler(async (req, res, next) => {
  

    // IF CHECK FOR DELETIONS AND EDITS
    // OTHERWISE NOT NEEDED
    if(authorization_header == id_to_check) {
        try {
            // Mongoose code

        if(successful) {
            res.status(200).json()  //send datahere
        }

        if(not_found){
            res.status(404).json() // send not found status
        }
      
        } catch (givenError) {
        console.error('Error deleting post:', givenError);
        res.status(500).json({ message: 'Internal Server Error', error: givenError });
        }
    } else {
        // user not authorized
    }


    
  
  });
  