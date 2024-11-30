import { Link } from "react-router-dom";
import "../styles/shortpost.css";

const ShortPost = ({
	postId, author, creationDate, title,
}) => (
	<div className="shortpost-master">
		<Link
			to={{ pathname: `/post/${postId}` }}
			className="linkclass"
		>
			<div className="shortpost-wrapper" id={postId}>
				<div className="shortpost-left">
					<div className="shortpost-left-inner">
						<p className="title-text">{title}</p>
						<p className="author-text">{author}</p>
					</div>
					<div />
				</div>
				<div className="shortpost-right">
					<p className="date-text">{creationDate}</p>
				</div>
			</div>
		</Link>
	</div>
);

export default ShortPost;
