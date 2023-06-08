'use client';

import LikeOrDislikeUserArticlePreferenceButton from '@/components/user-article-preference.tsx/LikeOrDislikeUserArticlePreferenceButton';
import axios from '@/lib/common/axios';
import Article from '@/lib/contracts/Article';
import useUser from '@/lib/hooks/useUser';
import useUserArticlePreferences from '@/lib/hooks/useUserArticlePreferences';
import { ComponentType } from 'react';
import useSWR from 'swr';

interface IArticleDetailPage {
  params: {
    articleId: string;
  };
}

const ArticleDetailPage: ComponentType<IArticleDetailPage> = ({ params }) => {
  const { data: article, isLoading: isArticleLoading } = useSWR(`/api/articles/${params.articleId}`, path =>
    axios.get<Article>(path).then(r => r.data)
  );

  if (isArticleLoading) {
    return <p>Loading...</p>;
  }

  if (!article) {
    return <p>Article not found.</p>;
  }

  return (
    <>
      <header>
        <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
        <div>
          Category: <span className="badge badge-outline badge-primary">{article.category}</span>{' '}
          <LikeOrDislikeUserArticlePreferenceButton type="category" value={article.category} />
        </div>
        <p>
          <small>
            Written by {article.author}{' '}
            <LikeOrDislikeUserArticlePreferenceButton type="author" value={article.author} />
          </small>
        </p>
        <p>
          <small>Posted on {new Date(article.created_at).toString()}</small>
        </p>

        <article className="my-2">
          <section>{article.description}</section>
        </article>

        <p>
          <small>
            Source:{' '}
            <a href={article.source} target="_blank" rel="noopener noreferrer" className="link">
              {article.source}
            </a>{' '}
            <LikeOrDislikeUserArticlePreferenceButton type="source" value={article.source} />
          </small>
        </p>
      </header>
    </>
  );
};

export default ArticleDetailPage;
