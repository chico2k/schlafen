import NextLink from 'next/link';
import { ExtendedPost } from '../../lib/types/Post';
import PostList from '../PostList';

const PortablePost: React.FunctionComponent<{ post: ExtendedPost }> = ({
  post,
}) => {
  return (
    <div className='my-12'>
      <PostList post={post} aspect='landscape' sideBySide />
    </div>
  );
};
export default PortablePost;
