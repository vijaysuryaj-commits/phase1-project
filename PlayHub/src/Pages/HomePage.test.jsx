import { render, screen } from "@testing-library/react";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

jest.mock("../Components/AllGamesSection", () => () => <div data-testid="all-games-stub" />);

jest.mock('../context/AuthContext', () => ({
    useAuth: () => ({
        user: {
            name: 'Vijay'
        },
        login: jest.fn(),
        logout: jest.fn()
    })
}));

jest.mock("../redux/games/gameActions", () => ({
    fetchPopularGames: jest.fn(() => ({ type: 'MOCK_FETCH_POPULAR' })),
    fetchGames: jest.fn(() => ({ type: 'MOCK_FETCH_GAMES' })),
    doSearch: jest.fn(() => ({ type: 'MOCK_DO_SEARCH' })),
    clearSearchResults: jest.fn(() => ({ type: 'MOCK_CLEAR_SEARCH_RESULTS' })),
    clearSearchQuery: jest.fn(() => ({ type: 'MOCK_CLEAR_SEARCH_QUERY' })),
}));

import HomePageDefault from './HomePage';

const initialState = {
    gamesState: {
        popular: [],
        games: [],
        filteredGames: [],
        loading: false,
        error: null,
        searchResults: [],
        searchQuery: "",
    },
    filtersState: {
        selectedGenre: "",
        platform: "",
        sortBy: "release-date",
    }
};

describe('HomePage (connected)', () => {
    
    const mockStore = configureStore([]);

    beforeEach(() => jest.clearAllMocks());

    test('connected - dispatches lifecycle actions on mount', () => {
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <HomePageDefault />
                </MemoryRouter>
            </Provider>
        );

        const actions = require('../redux/games/gameActions');
        expect(actions.fetchPopularGames).toHaveBeenCalled();
        expect(actions.fetchGames).toHaveBeenCalled();

        
        const dispatched = store.getActions();
        expect(dispatched).toEqual(expect.arrayContaining([
            { type: 'MOCK_FETCH_POPULAR' },
            { type: 'MOCK_FETCH_GAMES' }
        ]));
    });

    test('connected - renders loading when store says loading', () => {
        const store = mockStore({
            ...initialState,
            gamesState: { ...initialState.gamesState, loading: true }
        });

        const { getByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <HomePageDefault />
                </MemoryRouter>
            </Provider>
        );

        expect(getByTestId('loading')).toHaveTextContent('🎮 Loading Popular Games...');
    });

    test('connected - renders error from store', () => {
        const store = mockStore({
            ...initialState,
            gamesState: { ...initialState.gamesState, error: 'Error fetching games' }
        });

        const { getByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <HomePageDefault />
                </MemoryRouter>
            </Provider>
        );

        expect(getByTestId('error')).toHaveTextContent('Error fetching games');
    });

    test('connected - renders search branch when searchQuery present', () => {
        const store = mockStore({
            ...initialState,
            gamesState: { ...initialState.gamesState, searchQuery: 'pubg', searchResults: [] }
        });

        const { getByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <HomePageDefault />
                </MemoryRouter>
            </Provider>
        );

        expect(getByTestId('search-results')).toHaveTextContent('🔍 Search Results for “pubg”');
    });
});