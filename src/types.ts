export type ModuleProps = {
  loading: boolean;
  label: string;
  error: boolean;
  errorMessage: string;
  errorName: string;
  onChangeLabel: (label: string) => void;
  dataMovie: ItemFormat[];
  totalResults: number;
  currentPage: number;
  onChangePage: (page: number) => void;
  guestSessionId: number;
};

export type SearchProps = {
  onChangeRating: (id: number, value: number) => void;
  rating: { [key: string]: number };
  guestSessionId: number;
};

export type ItemFormat = {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  genre_ids: Array<number>;
};

export type CardListProps = {
  dataMovie: ItemFormat[];
  guestSessionId: number;
  onChangeRating: (id: number, value: number) => void;
  rating: { [key: string]: number };
};
