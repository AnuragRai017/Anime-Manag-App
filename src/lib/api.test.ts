import { describe, it, expect } from 'vitest';
import { getMangaTitle, getMangaDescription, getChapterPageUrls, MangaData } from './api';

describe('MangaDex API Utils', () => {
  describe('getMangaTitle', () => {
    it('should return the English title if available', () => {
      const manga: Partial<MangaData> = {
        attributes: {
          title: {
            en: 'One Piece',
            ja: 'ワンピース',
          },
          altTitles: [],
          description: {},
          isLocked: false,
          links: {},
          originalLanguage: 'ja',
          lastVolume: '',
          lastChapter: '',
          publicationDemographic: '',
          status: '',
          year: 0,
          contentRating: '',
          tags: [],
          createdAt: '',
          updatedAt: '',
          version: 1,
        },
      } as unknown as MangaData;

      expect(getMangaTitle(manga as MangaData)).toBe('One Piece');
    });

    it('should return Japanese title (ja-ro) if English is missing', () => {
      const manga: Partial<MangaData> = {
        attributes: {
          title: {
            'ja-ro': 'Wan Pisu',
            ja: 'ワンピース',
          },
          altTitles: [],
        },
      } as unknown as MangaData;

      expect(getMangaTitle(manga as MangaData)).toBe('Wan Pisu');
    });

    it('should return the first available title if no priority language matches', () => {
      const manga: Partial<MangaData> = {
        attributes: {
          title: {
            fr: 'Un Morceau',
          },
          altTitles: [],
        },
      } as unknown as MangaData;

      expect(getMangaTitle(manga as MangaData)).toBe('Un Morceau');
    });

    it('should return title from altTitles if main title is empty but altTitles has English', () => {
         const manga: Partial<MangaData> = {
        attributes: {
          title: {},
          altTitles: [
              { 'ja': 'ワンピース' },
              { 'en': 'One Piece Alt' }
          ],
        },
      } as unknown as MangaData;

      expect(getMangaTitle(manga as MangaData)).toBe('One Piece Alt');
    });

    it('should return "Unknown Title" if no title is found', () => {
        const manga: Partial<MangaData> = {
        attributes: {
          title: {},
          altTitles: [],
        },
      } as unknown as MangaData;

      expect(getMangaTitle(manga as MangaData)).toBe('Unknown Title');
    });
  });

  describe('getMangaDescription', () => {
    it('should return the English description if available', () => {
      const manga: Partial<MangaData> = {
        attributes: {
            title: {},
          description: {
            en: 'A story about pirates.',
            ja: '海賊の物語。',
          },
        },
      } as unknown as MangaData;

      expect(getMangaDescription(manga as MangaData)).toBe('A story about pirates.');
    });

    it('should fallback to other languages if English is missing', () => {
      const manga: Partial<MangaData> = {
        attributes: {
            title: {},
          description: {
            ja: '海賊の物語。',
          },
        },
      } as unknown as MangaData;

      expect(getMangaDescription(manga as MangaData)).toBe('海賊の物語。');
    });

    it('should return "No description available." if description is empty', () => {
      const manga: Partial<MangaData> = {
        attributes: {
            title: {},
          description: {},
        },
      } as unknown as MangaData;

      expect(getMangaDescription(manga as MangaData)).toBe('No description available.');
    });
  });

  describe('getChapterPageUrls', () => {
    const baseUrl = 'https://uploads.mangadex.org';
    const hash = '123456hash';
    const files = ['1.jpg', '2.jpg'];

    it('should construct URLs for data saver mode', () => {
      const urls = getChapterPageUrls(baseUrl, hash, files, true);
      expect(urls).toEqual([
        'https://uploads.mangadex.org/data-saver/123456hash/1.jpg',
        'https://uploads.mangadex.org/data-saver/123456hash/2.jpg',
      ]);
    });

    it('should construct URLs for high quality mode', () => {
      const urls = getChapterPageUrls(baseUrl, hash, files, false);
      expect(urls).toEqual([
        'https://uploads.mangadex.org/data/123456hash/1.jpg',
        'https://uploads.mangadex.org/data/123456hash/2.jpg',
      ]);
    });

    it('should use fallback base URL if baseUrl is invalid (does not start with http)', () => {
        const invalidBaseUrl = '/local/path';
        const urls = getChapterPageUrls(invalidBaseUrl, hash, files, true);
         expect(urls).toEqual([
        'https://uploads.mangadex.org/data-saver/123456hash/1.jpg',
        'https://uploads.mangadex.org/data-saver/123456hash/2.jpg',
      ]);
    });
  });
});
