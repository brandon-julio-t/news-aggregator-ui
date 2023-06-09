'use client';

import Card from '@/components/common/Card';
import Skeleton from '@/components/common/Skeleton';
import LikeOrDislikeUserArticlePreferenceButton from '@/components/user-article-preference/LikeOrDislikeUserArticlePreferenceButton';
import useUserArticlePreferences from '@/lib/hooks/useUserArticlePreferences';
import React from 'react';

type IType = 'author' | 'category' | 'source';
type IAttr = 'liked_authors' | 'liked_categories' | 'liked_sources';

const attrToTypeMapping = new Map<IAttr, IType>([
  ['liked_authors', 'author'],
  ['liked_categories', 'category'],
  ['liked_sources', 'source'],
]);

const PersonalizeForYouPage = () => {
  const { data } = useUserArticlePreferences();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Personalize For You</h1>

      <p>Like more authors/categories/sources for better For You page!</p>

      {!data && (
        <>
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </>
      )}

      {data && (
        <div className="flex flex-col gap-4 divide-y">
          {Object.entries(data)
            .filter(([k, _]) => k.startsWith('liked_'))
            .map(([key, value]: [string, string[]]) => (
              <section key={key} className="py-4">
                <h2 className="capitalize mb-2 text-xl font-medium">{key.replace('_', ' ')}</h2>

                <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                  {value.length <= 0 && <p>No data.</p>}

                  {value.length > 0 &&
                    value.map(v => (
                      <Card key={`${key}|${v}`}>
                        <div>{v}</div>

                        <LikeOrDislikeUserArticlePreferenceButton
                          type={attrToTypeMapping.get(key as IAttr) ?? 'author'}
                          value={v}
                        />
                      </Card>
                    ))}
                </div>
              </section>
            ))}
        </div>
      )}
    </div>
  );
};

export default PersonalizeForYouPage;
