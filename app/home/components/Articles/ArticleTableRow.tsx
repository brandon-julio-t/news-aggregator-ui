import React, { ComponentProps, ComponentType } from 'react';
import Article from '@/lib/contracts/Article';
import PaginationResponse from '@/lib/contracts/PaginationResponse';
import Link from 'next/link';

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
      <td>{article.author}</td>
      <td>
        <span className="badge badge-primary badge-outline whitespace-nowrap">{article.category}</span>
      </td>
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
