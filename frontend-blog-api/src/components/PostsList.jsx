import ShortPost from './ShortPost';
import useQuery from '../hooks/useQuery';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function PostsList() {
    const { data, loading } = useQuery('/post/get');

    if (loading) {
        return (
            <div className="shortpost-outer-wrapper">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="shortpost-master">
                        <div className="shortpost-wrapper">
                            <div className="shortpost-left">
                                <div className="shortpost-left-inner">
                                    <p className="title-text">
                                        <Skeleton height={28} width={200} />
                                    </p>{' '}
                                    <p className="author-text">
                                        <Skeleton height={18} width={150} />
                                    </p>{' '}
                                </div>
                            </div>
                            <div className="shortpost-right">
                                <p className="date-text">
                                    <Skeleton height={18} width={100} />
                                </p>{' '}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!data?.posts) {
        return (
            <div>
                <p>
                    Please refresh - free hosting of the backend is working
                    slowly.
                </p>
            </div>
        );
    }

    return (
        <div className="shortpost-outer-wrapper">
            {data.posts.map((item) => (
                <ShortPost
                    key={item._id} // Using _id instead of crypto.randomUUID() for consistency
                    postId={item._id}
                    author={item.author.username}
                    creationDate={item.createdAtFormatted}
                    title={item.title}
                />
            ))}
        </div>
    );
}

export default PostsList;
