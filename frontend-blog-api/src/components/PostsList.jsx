
import ShortPost from "./ShortPost";

import useQuery from "../hooks/useQuery";

// Testing imports

export function PostsList() {
	const { data, loading, error, refetch} = useQuery("/post/get")
    

	if (loading) {
		return <div><p>Loading posts...</p></div>;
	}

	if (!data?.posts) {
		return <div><p>Please refresh - free hosting of the backend is working slowly.</p></div>;
	}

	return (
			<div className="shortpost-outer-wrapper">
				{data.posts.map((item) => (
						<ShortPost
							key={crypto.randomUUID()}
							postId={item._id}
							author={item.author.username}
							creationDate={item.createdAtFormatted}
							title={item.title}
						/>
					))}
			</div>
	);
}


export default PostsList