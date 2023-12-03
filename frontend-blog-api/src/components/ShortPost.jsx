
import { Link } from "react-router-dom";
import "../styles/shortpost.css"

const ShortPost = ({ post_id, author, creationDate, title }) => {


  return (
    <div className="shortpost-master">
      <Link to={{pathname: `/post/${post_id}`,}}
      className="linkclass"
    >
        <div className="shortpost-wrapper" id={post_id}>
            <div className="shortpost-left">
              <div className="shortpost-left-inner">
                  <p className="author-text">{author}</p>
                  <p className="title-text">{title}</p>
              </div>
               <div></div>
            </div>
            <div className="shortpost-right">
                <p className="date-text">{creationDate}</p>
            </div>
        </div>
      </Link>
    </div>
    
  );
};

export default ShortPost;