import NextLink from 'next/link';
import { ExtendedPost } from '../../lib/types/Post';
import PostCard from '../Post/PostCard';

const PortablePost: React.FunctionComponent<{ post: ExtendedPost }> = ({
  post,
}) => {
  return (
    <div className='my-12'>
      <PostCard post={post} aspect='landscape' sideBySide />
    </div>
  );
};
export default PortablePost;
