import { useLoaderData } from 'react-router-dom';

import PostList from '../components/PostList';

function BlogPage() {
  const posts = useLoaderData();
  console.log('Posts:');
  console.log(posts);
  return <PostList posts={posts} />;
}

export default BlogPage;

export async function loader() {
  console.log('Posts loader:');
  return fetch('https://jsonplaceholder.typicode.com/posts');
}
