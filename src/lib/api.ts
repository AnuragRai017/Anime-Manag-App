// MangaDex API service
const BASE_URL = 'https://api.mangadex.org';

export interface MangaResponse {
  result: string;
  data: MangaData[];
  limit: number;
  offset: number;
  total: number;
}

export interface MangaData {
  id: string;
  type: string;
  attributes: {
    title: Record<string, string>;
    altTitles: Record<string, string>[];
    description: Record<string, string>;
    isLocked: boolean;
    links: Record<string, string>;
    originalLanguage: string;
    lastVolume: string;
    lastChapter: string;
    publicationDemographic: string;
    status: string;
    year: number;
    contentRating: string;
    tags: {
      id: string;
      type: string;
      attributes: {
        name: Record<string, string>;
        description: Record<string, string>;
        group: string;
        version: number;
      };
      relationships: {
        id: string;
        type: string;
        related?: string;
        attributes?: {
          name?: string;
          fileName?: string;
          volume?: string | null;
        };
      }[];
    }[];
    createdAt: string;
    updatedAt: string;
    version: number;
  };
  relationships: {
    id: string;
    type: string;
    related?: string;
    attributes?: {
      name?: string;
      fileName?: string;
      volume?: string | null;
    };
  }[];
}

export interface ChapterResponse {
  result: string;
  data: ChapterData[];
  limit: number;
  offset: number;
  total: number;
}

export interface ChapterData {
  id: string;
  type: string;
  attributes: {
    volume: string | null;
    chapter: string;
    title: string;
    translatedLanguage: string;
    externalUrl: string | null;
    publishAt: string;
    readableAt: string;
    createdAt: string;
    updatedAt: string;
    pages: number;
    version: number;
  };
  relationships: {
    id: string;
    type: string;
  }[];
}

export interface AtHomeResponse {
  result: string;
  baseUrl: string;
  chapter: {
    hash: string;
    data: string[];
    dataSaver: string[];
  };
}

export class MangaDexAPI {
  // Fetch manga list
  static async getMangaList(offset = 0, limit = 10): Promise<MangaResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/manga?limit=${limit}&offset=${offset}&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=cover_art&includes[]=author&order[latestUploadedChapter]=desc`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch manga list:', error);
      throw error;
    }
  }

  // Fetch manga by ID
  static async getMangaById(id: string): Promise<{ data: MangaData }> {
    try {
      const response = await fetch(
        `${BASE_URL}/manga/${id}?includes[]=cover_art&includes[]=author&includes[]=artist`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch manga with ID ${id}:`, error);
      throw error;
    }
  }

  // Fetch chapters by manga ID
  static async getChaptersByMangaId(
    mangaId: string, 
    offset = 0, 
    limit = 100, 
    translatedLanguage = 'en'
  ): Promise<ChapterResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/manga/${mangaId}/feed?limit=${limit}&offset=${offset}&translatedLanguage[]=${translatedLanguage}&order[volume]=desc&order[chapter]=desc&includes[]=scanlation_group`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch chapters for manga ID ${mangaId}:`, error);
      throw error;
    }
  }

  // Fetch single chapter by ID
  static async getChapter(chapterId: string): Promise<ChapterData> {
    try {
      const response = await fetch(
        `${BASE_URL}/chapter/${chapterId}?includes[]=scanlation_group`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Failed to fetch chapter with ID ${chapterId}:`, error);
      throw error;
    }
  }

  // Fetch pages for reading a chapter
  static async getChapterPages(chapterId: string): Promise<AtHomeResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/at-home/server/${chapterId}`,
        {
          method: 'GET',
          cache: 'no-cache',
          next: { revalidate: 0 },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch pages for chapter ID ${chapterId}:`, error);
      throw error;
    }
  }

  /**
   * Fetches a list of manga with pagination and optional parameters.
   * @param offset - The number of manga to skip.
   * @param limit - The maximum number of manga to return (max 100).
   * @param params - Optional additional query parameters (e.g., sorting, filtering).
   */  static async getAllManga(offset: number = 0, limit: number = 20, params: Record<string, string> = {}): Promise<MangaResponse> {
    // Create URLSearchParams object for query parameters
    const queryParams = new URLSearchParams();
    
    // Add basic parameters
    queryParams.append('limit', limit.toString());
    queryParams.append('offset', offset.toString());
    
    // Handle special parameters that may need to be repeated
    for (const [key, value] of Object.entries(params)) {
      if (key.includes('[]')) {
        // If it's an array parameter and contains comma-separated values
        if (value.includes(',')) {
          // Split and add each value separately
          const values = value.split(',');
          values.forEach(v => queryParams.append(key, v.trim()));
        } else {
          // Just add the single value
          queryParams.append(key, value);
        }
      } else {
        // Regular parameter
        queryParams.append(key, value);
      }
    }
    
    // Make sure we always include cover_art if not specified
    if (!params['includes[]'] || !params['includes[]'].includes('cover_art')) {
      queryParams.append('includes[]', 'cover_art');
    }
    
    // Fetch with constructed query string
    const response = await fetch(`${BASE_URL}/manga?${queryParams.toString()}`);
    
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch manga list: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Fetch all chapters by manga ID with improved error handling and logging
  static async getAllChaptersByMangaId(
    mangaId: string, 
    translatedLanguage = 'en'
  ): Promise<ChapterData[]> {
    try {
      let allChapters: ChapterData[] = [];
      let offset = 0;
      const limit = 100; // Maximum allowed by API
      let total = Infinity; // Start with Infinity until we get the actual total
      
      console.log(`Fetching all chapters for manga ID ${mangaId}`);
      
      // Keep fetching until we've got all chapters
      while (offset < total) {
        console.log(`Fetching chapters: offset=${offset}, limit=${limit}`);
        const response = await this.getChaptersByMangaId(mangaId, offset, limit, translatedLanguage);
        
        if (!response.data || !Array.isArray(response.data)) {
          console.error('Invalid response format from API:', response);
          throw new Error('Invalid chapter data received from API');
        }
        
        allChapters = [...allChapters, ...response.data];
        total = response.total;
        
        console.log(`Fetched ${response.data.length} chapters. Total available: ${total}, Current count: ${allChapters.length}`);
        
        // Break if we received fewer items than requested (end of data)
        if (response.data.length < limit) {
          break;
        }
        
        offset += limit;
      }
      
      console.log(`Completed fetch of all ${allChapters.length} chapters`);
      return allChapters;
    } catch (error) {
      console.error(`Failed to fetch all chapters for manga ID ${mangaId}:`, error);
      throw error;
    }
  }
}

// Helper function to get cover art URL
export const getCoverImage = (manga: MangaData): string => {
  const coverArt = manga.relationships.find(rel => rel.type === 'cover_art');
  if (coverArt && coverArt.attributes && coverArt.attributes.fileName) {
    try {
      // Make sure the manga ID is valid
      if (!manga.id || manga.id === '') {
        console.warn('Invalid manga ID for cover image');
        return '/manga/placeholder.png';
      }
      
      // Make sure the filename is valid
      const fileName = coverArt.attributes.fileName;
      if (!fileName || fileName === '') {
        console.warn(`Invalid filename for manga ${manga.id}`);
        return '/manga/placeholder.png';
      }
        // Create and validate the cover URL
      const coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${fileName}`;
      
      // Return the URL
      return coverUrl;
    } catch (error) {
      console.error('Error generating cover URL:', error);
      return '/manga/placeholder.png';
    }
  }
  return '/manga/placeholder.png'; // Fallback placeholder
};

// Helper function to get manga description with proper language fallback
export const getMangaDescription = (manga: MangaData): string => {
  // Language preference order: same as title
  const languagePriority = ['en', 'ja-ro', 'ja', 'ko-ro', 'ko', 'zh-hk', 'zh'];
  
  // Check for descriptions in order of language priority
  for (const lang of languagePriority) {
    if (manga.attributes.description[lang]) {
      return manga.attributes.description[lang];
    }
  }
  
  // If no priority language description found, get first available
  const descriptions = Object.entries(manga.attributes.description);
  if (descriptions.length > 0) {
    return descriptions[0][1]; // Return the description value, not the language key
  }
  
  return 'No description available.';
};

// Helper function to get manga title with proper language fallback and special character handling
export const getMangaTitle = (manga: MangaData): string => {
  // Language preference order: en, ja-ro (romanized Japanese), ja, ko-ro, ko, zh-hk, zh, then any other available language
  const languagePriority = ['en', 'ja-ro', 'ja', 'ko-ro', 'ko', 'zh-hk', 'zh'];
  
  // Check for titles in order of language priority
  for (const lang of languagePriority) {
    if (manga.attributes.title[lang]) {
      return manga.attributes.title[lang];
    }
  }
  
  // If English title and priority languages not available, get first available title
  const titles = Object.entries(manga.attributes.title);
  if (titles.length > 0) {
    return titles[0][1]; // Return the title value, not the language key
  }
  
  // If there are alternative titles, try those as fallback
  if (manga.attributes.altTitles && manga.attributes.altTitles.length > 0) {
    // Try to find an English alt title first
    for (const altTitle of manga.attributes.altTitles) {
      for (const lang of languagePriority) {
        if (altTitle[lang]) {
          return altTitle[lang];
        }
      }
    }
    
    // If no priority language found in alt titles, use the first alt title
    const firstAltTitle = manga.attributes.altTitles[0];
    const firstAltTitleLanguage = Object.keys(firstAltTitle)[0];
    if (firstAltTitleLanguage) {
      return firstAltTitle[firstAltTitleLanguage];
    }
  }
  
  return 'Unknown Title';
};

// Helper function to get chapter pages URLs
export const getChapterPageUrls = (
  baseUrl: string, 
  chapterHash: string, 
  pageFilenames: string[], 
  dataSaver = true,
  fallbackBaseUrl = "https://uploads.mangadex.org"
): string[] => {
  // Ensure we have a valid base URL
  const effectiveBaseUrl = baseUrl.startsWith('http') ? baseUrl : fallbackBaseUrl;
  const quality = dataSaver ? 'data-saver' : 'data';
  
  return pageFilenames.map(filename => {
    const url = `${effectiveBaseUrl}/${quality}/${chapterHash}/${filename}`;
    // Validate URL to ensure it's properly formed
    try {
      new URL(url);
      return url;    } catch {
      console.warn(`Invalid URL generated for page, falling back to default server: ${filename}`);
      return `${fallbackBaseUrl}/${quality}/${chapterHash}/${filename}`;
    }
  });
};

// Helper function to get author information
export const getAuthorName = (manga: MangaData): string => {
  const author = manga.relationships.find(rel => rel.type === "author");
  if (author?.attributes?.name) {
    return author.attributes.name;
  }
  return "Unknown Author";
};

// Helper function to get artist information
export const getArtistName = (manga: MangaData): string => {
  const artist = manga.relationships.find(rel => rel.type === "artist");
  if (artist?.attributes?.name) {
    return artist.attributes.name;
  }
  return "Unknown Artist";
};

// Helper function to get all genres/tags as a formatted string
export const getGenres = (manga: MangaData): string => {
  const genreTags = manga.attributes.tags
    .filter(tag => tag.attributes.group === "genre")
    .map(tag => {
      // Try to get English tag name first, fall back to first available
      const tagName = tag.attributes.name.en || Object.values(tag.attributes.name)[0];
      return tagName || "Unknown";
    });
    
  return genreTags.join(", ") || "N/A";
};
