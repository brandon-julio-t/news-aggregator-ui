'use client';

import Articles from '../components/Articles';

const ForYouPage = () => {
  return (
    <>
      <h1 className="my-2 text-2xl font-bold">For You</h1>

      <p>Enhance For You page by exploring articles and like the author/category/source.</p>

      <Articles baseApiPath="/api/articles/for-you" />
    </>
  );
};

export default ForYouPage;
