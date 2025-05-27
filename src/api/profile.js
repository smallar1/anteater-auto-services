import { getToken } from '@clerk/clerk-react';

export const fetchUserProfile = async () => {
  const token = await getToken();

  const res = await fetch('/api/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`Failed to fetch profile: ${message}`);
  }

  return res.json();
};
