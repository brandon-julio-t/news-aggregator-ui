import { mutate as gMutate } from 'swr';
import axios from '@/lib/common/axios';
import ErrorResponse from '@/lib/contracts/ErrorResponse';
import UserArticlePreference from '@/lib/contracts/UserArticlePreference';
import useUser from '@/lib/hooks/useUser';
import useUserArticlePreferences from '@/lib/hooks/useUserArticlePreferences';
import { HandThumbUpIcon as HandThumbUpIconSolid } from '@heroicons/react/24/solid';
import { HandThumbUpIcon as HandThumbUpIconOutline } from '@heroicons/react/24/outline';
import { AxiosError, AxiosResponse } from 'axios';
import { ComponentType } from 'react';
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
  const { data, isLoading, mutate } = useUserArticlePreferences();

  const attribute = typeToAttrMapping.get(type);
  const isLiked = attribute && data && data[attribute].some(v => v === value || v.includes(value) || value.includes(v));

  const onClick = async () => {
    if (!user || !data || !attribute) return;

    const action = isLiked ? 'dislike' : 'like';

    mutate(
      axios
        .put<UserArticlePreference, AxiosResponse<UserArticlePreference>, IPayload>(
          `/api/users/${user.id}/user-article-preferences/${data.id}`,
          { action, attribute, value }
        )
        .then(r => {
          toast.success(`${value} ${type} ${action}d!`);
          return r.data;
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          console.error(error);
          toast.error(error.response?.data.message ?? 'Like/dislike error.');
          return undefined;
        }),
      {
        optimisticData: () => {
          gMutate('/api/articles/for-you?');

          const clone = { ...data };
          clone[attribute] = isLiked
            ? clone[attribute].filter(v => v !== value && !v.includes(value) && !value.includes(v))
            : [...clone[attribute], value];

          return clone;
        },
        populateCache: true,
        revalidate: false,
        rollbackOnError: true,
      }
    );
  };

  return (
    <button onClick={onClick} disabled={isLoading} className="btn btn-outline btn-xs btn-secondary">
      {isLoading && <span className="loading loading-spinner loading-xs"></span>}
      {!isLoading && isLiked ? (
        <HandThumbUpIconSolid className="w-5 h-5" />
      ) : (
        <HandThumbUpIconOutline className="w-5 h-5" />
      )}
    </button>
  );
};

export default LikeOrDislikeUserArticlePreferenceButton;
