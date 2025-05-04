import { GRAVATAR_API_KEY } from '@env';
import md5 from 'md5';

interface GravatarProfile {
  entry: Array<{
    id: string;
    hash: string;
    requestHash: string;
    profileUrl: string;
    preferredUsername: string;
    thumbnailUrl: string;
    photos: Array<{
      value: string;
      type: string;
    }>;
    name: {
      formatted: string;
    };
    displayName: string;
    aboutMe: string;
    currentLocation: string;
    emails: Array<{
      value: string;
    }>;
  }>;
}

/**
 * Get a user's Gravatar profile or default avatar URL
 * @param email The user's email address
 * @param size Optional size for the avatar (default is 200)
 * @returns Promise<string | null> The URL to the user's Gravatar or default avatar
 */
export const getGravatarProfile = async (email: string, size: number = 200): Promise<string | null> => {
  try {
    // Create MD5 hash of the email
    const emailHash = md5(email.toLowerCase().trim());

    // First check if the email has a Gravatar profile
    const response = await fetch(
      `https://secure.gravatar.com/${emailHash}.json?api_key=${GRAVATAR_API_KEY}`
    );

    if (!response.ok) {
      // If no profile exists, return the default Gravatar URL
      return `https://www.gravatar.com/avatar/${emailHash}?s=${size}&d=identicon`;
    }

    const data: GravatarProfile = await response.json();

    if (data.entry && data.entry[0] && data.entry[0].photos && data.entry[0].photos[0]) {
      // Return the first photo URL with the requested size
      const photoUrl = data.entry[0].photos[0].value;
      return photoUrl.includes('?')
        ? `${photoUrl}&s=${size}`
        : `${photoUrl}?s=${size}`;
    }

    // If no photo is found, return the default Gravatar URL
    return `https://www.gravatar.com/avatar/${emailHash}?s=${size}&d=identicon`;
  } catch (error) {
    console.error('Error fetching Gravatar profile:', error);
    return null;
  }
};
