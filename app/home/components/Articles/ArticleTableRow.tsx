import React, { ComponentProps, ComponentType } from 'react';
import Article from '@/lib/contracts/Article';
import PaginationResponse from '@/lib/contracts/PaginationResponse';
import Link from 'next/link';
import LikeOrDislikeUserArticlePreferenceButton from '@/components/user-article-preference/LikeOrDislikeUserArticlePreferenceButton';

interface IArticleTableRow {
  article: Article;
  index: number;
  pagination: PaginationResponse<Article>;
}

const ArticleTableRow: ComponentType<ComponentProps<'tr'> & IArticleTableRow> = ({
  article,
  index,
  pagination,
  ...rest
}) => {
  return (
    <tr key={article.id} {...rest}>
      <th>{(pagination.current_page - 1) * pagination.per_page + (index + 1)}</th>
      <td>{article.title}</td>
      <td>
        <div className="flex flex-nowrap gap-2 items-center">
          {article.author}
          <LikeOrDislikeUserArticlePreferenceButton noLabel type="author" value={article.author} />
        </div>
      </td>
      <td>
        <div className="flex flex-nowrap gap-2 items-center">
          <span className="badge badge-primary badge-outline whitespace-nowrap">{article.category}</span>
          <LikeOrDislikeUserArticlePreferenceButton noLabel type="category" value={article.category} />
        </div>
      </td>
      <td>{new Date(article.created_at).toString()}</td>
      <td>
        <div className="flex flex-wrap gap-2">
          <Link href={`/articles/${article.id}`} className="btn btn-primary btn-xs">
            View
          </Link>
          <a href={article.source} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-xs">
            Visit Source
          </a>
        </div>
      </td>
    </tr>
  );
};

export default ArticleTableRow;
