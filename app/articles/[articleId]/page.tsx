'use client';

import axios from '@/lib/common/axios';
import Article from '@/lib/contracts/Article';
import { ComponentType } from 'react';
import useSWR from 'swr';

interface IArticleDetailPage {
  params: {
    articleId: string;
  };
}

const ArticleDetailPage: ComponentType<IArticleDetailPage> = ({ params }) => {
  const { data, isLoading } = useSWR(`/api/articles/${params.articleId}`, path =>
    axios.get<Article>(path).then(r => r.data)
  );

  console.log({ data });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Article not found.</p>;
  }

  return (
    <>
      <header>
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <div>
          <span className="badge badge-outline badge-primary">{data.category}</span>
        </div>
        <p>
          <small>Written by {data.author}</small>
        </p>
        <p>
          <small>Posted on {data.created_at}</small>
        </p>

        <article className="my-2">
          <section>{data.description}</section>
        </article>

        <p>
          <small>
            Source:{' '}
            <a href={data.source} target="_blank" rel="noopener noreferrer" className="link">
              {data.source}
            </a>
          </small>
        </p>
      </header>
    </>
  );
};

export default ArticleDetailPage;
