import { WP_BACK_URL, AUTH_SECRET } from '@/utils/constants';
import { getToken } from 'next-auth/jwt';

export const getAccessToken = async ({ req }) => {
  const token = await getToken({ req, secret: AUTH_SECRET });

  if (!token) {
    return null;
  }

  return token.accessToken;
};

export const wpAuth = async ({ email, password }) => {
  const respUser = await fetch(`${WP_BACK_URL}/wp-json/jwt-auth/v1/token`, {
    method: 'post',
    body: JSON.stringify({ username: email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  const user = await respUser.json();

  if (user.token) {
    const respProfile = await fetch(`${WP_BACK_URL}/wp-json/wp/v2/users/me`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const profile = await respProfile.json();

    return {
      accessToken: user.token,
      name: user.user_display_name,
      email: user.user_email,
      image: profile.avatar_urls,
      nick: user.user_nicename,
    };
  } else {
    return null;
  }
};

export default wpAuth;
