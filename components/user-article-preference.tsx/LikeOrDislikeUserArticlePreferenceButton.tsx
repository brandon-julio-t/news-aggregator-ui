import axios from '@/lib/common/axios';
import ErrorResponse from '@/lib/contracts/ErrorResponse';
import UserArticlePreference from '@/lib/contracts/UserArticlePreference';
import useUser from '@/lib/hooks/useUser';
import useUserArticlePreferences from '@/lib/hooks/useUserArticlePreferences';
import { AxiosError } from 'axios';
import React, { ComponentType } from 'react';
import { toast } from 'react-hot-toast';

type IType = 'author' | 'category' | 'source';
type IAttr = 'liked_authors' | 'liked_categories' | 'liked_sources';

interface IAddOrRemoveUserArticlePreferenceButton {
  type: IType;
  value: string;
}

interface IPayload {
  attribute: IAttr;
  action: 'like' | 'dislike';
  value: string;
}

const typeToAttrMapping = new Map<IType, IAttr>([
  ['author', 'liked_authors'],
  ['category', 'liked_categories'],
  ['source', 'liked_sources'],
]);

const LikeOrDislikeUserArticlePreferenceButton: ComponentType<IAddOrRemoveUserArticlePreferenceButton> = ({
  type,
  value,
}) => {
  const { data: user } = useUser();
  const { data, isLoading, mutate, isValidating } = useUserArticlePreferences();

  const attr = typeToAttrMapping.get(type);
  const isLiked = !!attr && !!data && data[attr].includes(value);

  const onClick = async () => {
    try {
      if (!user || !data || !attr) return;

      const payload: IPayload = {
        action: isLiked ? 'dislike' : 'like',
        attribute: attr,
        value,
      };

      mutate(
        axios
          .put<UserArticlePreference>(`/api/users/${user.id}/user-article-preferences/${data.id}`, payload)
          .then(r => r.data),
        {
          optimisticData: () => {
            const clone = { ...data };
            clone[attr] = isLiked ? clone[attr].filter(v => v !== value) : [...clone[attr], value];
            return clone;
          },
          populateCache: true,
          revalidate: false,
          rollbackOnError: true,
        }
      );
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      toast.error(error.response?.data.message ?? 'Like/dislike error.');
    }
  };

  return (
    <button onClick={onClick} disabled={isLoading} className="btn btn-outline btn-xs btn-secondary">
      {isLoading && <span className="loading loading-spinner loading-xs"></span>}
      {isLiked ? 'dislike' : 'like'} {type}
    </button>
  );
};

export default LikeOrDislikeUserArticlePreferenceButton;
