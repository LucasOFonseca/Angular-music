import { ImageObject } from './image-object.model';
import { PaginatedData } from './paginated-data.model';

export interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images?: ImageObject[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export type ArtistPaginatedResponse = PaginatedData<Artist>;
