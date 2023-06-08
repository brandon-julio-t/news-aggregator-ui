import Skeleton from '@/components/common/Skeleton';
import axios from '@/lib/common/axios';
import Article from '@/lib/contracts/Article';
import React, { ComponentProps, ComponentType, useEffect, useState } from 'react';
import useSWR from 'swr';

interface IArticleBody {
  article: Article;
}

const ArticleBody: ComponentType<ComponentProps<'section'> & IArticleBody> = ({ article, ...rest }) => {
  const { data, isLoading } = useSWR(`/api/articles/${article.id}/html`, path =>
    axios
      .get<string>(path)
      .then(r => r.data)
      .then(htmlBody => {
        let paragraphs = [] as string[];

        const parser = new DOMParser().parseFromString(htmlBody, 'text/html');
        const source = article.source;

        if (source.includes('techcrunch')) {
          paragraphs = parseTechCrunchParagraphs(parser);
        } else if (source.includes('theguardian')) {
          paragraphs = parseTheGuardianParagraphs(parser);
        } else if (source.includes('nytimes')) {
          paragraphs = parseNYTimesParagraphs(parser);
        }

        return paragraphs;
      })
  );

  return (
    <section {...rest} className="flex flex-col gap-4">
      {isLoading && <Skeleton className="w-full h-96" />}

      {!isLoading && data && (
        <>
          {data.length <= 0 && 'No data.'}
          {data.length > 0 &&
            data.map((sentence, index) => <p key={index} dangerouslySetInnerHTML={{ __html: sentence }}></p>)}
        </>
      )}
    </section>
  );
};

function parseTechCrunchParagraphs(parser: Document): string[] {
  return [...parser.querySelectorAll('.article-content > p')].map(e => e.innerHTML);
}

function parseTheGuardianParagraphs(parser: Document): string[] {
  return [...parser.querySelectorAll('#maincontent p')].map(e => e.innerHTML);
}

function parseNYTimesParagraphs(parser: Document): string[] {
  return [...parser.querySelectorAll('section[name="articleBody"] p')].map(e => e.innerHTML);
}

export default ArticleBody;
