'use client';

import LikeOrDislikeUserArticlePreferenceButton from '@/components/user-article-preference/LikeOrDislikeUserArticlePreferenceButton';
import axios from '@/lib/common/axios';
import Article from '@/lib/contracts/Article';
import { ComponentType } from 'react';
import useSWR from 'swr';
import ArticleBody from './components/ArticleBody';
import ArticleSkeleton from './components/ArticleSkeleton';

interface IArticleDetailPage {
  params: {
    articleId: string;
  };
}

const ArticleDetailPage: ComponentType<IArticleDetailPage> = ({ params }) => {
  const { data: article, isLoading: isArticleLoading } = useSWR(`/api/articles/${params.articleId}`, path =>
    axios.get<Article>(path).then(r => r.data)
  );

  return (
    <div className="max-w-screen-lg w-full mx-auto">
      {isArticleLoading ? (
        <ArticleSkeleton />
      ) : !article ? (
        <p>Article not found.</p>
      ) : (
        <>
          <header className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold mb-2">{article.title}</h1>

            <div className="flex flex-wrap items-center gap-2">
              <p>
                Category: <span className="badge badge-outline badge-primary">{article.category}</span>
              </p>
              <LikeOrDislikeUserArticlePreferenceButton type="category" value={article.category} />
            </div>

            <p className="flex items-center gap-2 flex-wrap">
              <small>Written by {article.author}</small>
              <LikeOrDislikeUserArticlePreferenceButton type="author" value={article.author} />
            </p>

            <p>
              <small>Posted on {new Date(article.created_at).toString()}</small>
            </p>

            <p className="flex flex-wrap items-center gap-2">
              <small>
                Source:{' '}
                <a href={article.source} target="_blank" rel="noopener noreferrer" className="link">
                  {article.source}
                </a>{' '}
              </small>
              <LikeOrDislikeUserArticlePreferenceButton type="source" value={article.source} />
            </p>
          </header>

          <div className="divider my-4"></div>

          <article className="my-2">
            <ArticleBody article={article} />
          </article>
        </>
      )}
    </div>
  );
};

export default ArticleDetailPage;
