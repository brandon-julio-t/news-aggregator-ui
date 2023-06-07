import Article from '@/lib/contracts/Article';
import Link from 'next/link';
import { ComponentProps, ComponentType } from 'react';

interface IArticlesTable {
  articles: Article[];
}

const ArticlesTable: ComponentType<ComponentProps<'section'> & IArticlesTable> = ({ articles, ...rest }) => {
  return (
    <section className="overflow-x-auto" {...rest}>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {articles.length <= 0 && (
            <tr>
              <td colSpan={999} className="text-center">
                No article
              </td>
            </tr>
          )}
          {articles.length > 0 &&
            articles.map((article, index) => (
              <tr key={article.id}>
                <th>{index + 1}</th>
                <td>{article.title}</td>
                <td>{article.author}</td>
                <td>
                  <span className="badge badge-primary badge-outline">{article.category}</span>
                </td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/articles/${article.id}`} className="btn btn-primary btn-xs">
                      View
                    </Link>
                    <a
                      href={article.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-xs"
                    >
                      Visit Source
                    </a>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

export default ArticlesTable;
