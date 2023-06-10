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

  const attr = typeToAttrMapping.get(type);
  const isLiked = !!attr && !!data && data[attr].some(v => v === value || v.includes(value) || value.includes(v));

  const onClick = async () => {
    if (!user || !data || !attr) return;

    mutate(
      axios
        .put<UserArticlePreference, AxiosResponse<UserArticlePreference>, IPayload>(
          `/api/users/${user.id}/user-article-preferences/${data.id}`,
          {
            action: isLiked ? 'dislike' : 'like',
            attribute: attr,
            value,
          }
        )
        .then(r => r.data)
        .catch((error: AxiosError<ErrorResponse>) => {
          console.error(error);
          toast.error(error.response?.data.message ?? 'Like/dislike error.');
          return undefined;
        }),
      {
        optimisticData: () => {
          const clone = { ...data };
          clone[attr] = isLiked
            ? clone[attr].filter(v => v !== value && !v.includes(value) && !value.includes(v))
            : [...clone[attr], value];

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
