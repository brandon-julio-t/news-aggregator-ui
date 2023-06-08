import useSWR from 'swr';
import useUser from './useUser';
import axios from '../common/axios';
import UserArticlePreference from '../contracts/UserArticlePreference';

export default function useUserArticlePreferences() {
  const { data: user } = useUser();

  return useSWR(user ? `/api/users/${user.id}/user-article-preferences` : null, path =>
    axios.get<UserArticlePreference>(path).then(r => r.data)
  );
}
