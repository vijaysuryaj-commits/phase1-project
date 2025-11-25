import React from 'react';
import { render, screen, fireEvent, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../redux/games/gameActions', () => ({
    fetchFilteredGames: jest.fn(() => ({ type: 'MOCK_FETCH_FILTERED' })),
    fetchGames: jest.fn(() => ({ type: 'MOCK_FETCH_GAMES' })),
}));


jest.mock('./CreateCard', () => () => <div data-testid="mock-card">MockCard</div>);

import AllGamesSection from './AllGamesSection';

const mockStore = configureStore([]);

const initialState = {
    gamesState: {
        popular: [],
        games: [],
        filteredGames: [],
        loading: false,
        error: null,
        searchResults: [],
        searchQuery: '',
    },
    filtersState: {
        selectedGenre: '',
        platform: '',
        sortBy: 'release-date',
    },
};

describe('AllGamesSection', () => {
    beforeEach(() => jest.clearAllMocks());

    test('displays skeletons when loading', () => {
        const store = mockStore({
            ...initialState,
            gamesState: {
                ...initialState.gamesState,
                loading: true
            },
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AllGamesSection />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.queryAllByTestId('skeleton').length).toBe(8);
    });

    test('shows error message when error', () => {
        const store = mockStore({
            ...initialState,
            gamesState: {
                ...initialState.gamesState,
                error: 'Failed to load'
            },
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AllGamesSection />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByText('Failed to load')).toBeInTheDocument();
    });

    test('renders games and pagination', () => {
        const games =[]
        for(let i=0;i<15;i++){
            const game = {
                id:i+1,
                game:`Game ${i+1}`
            }
            games.push(game)
        }
        const store = mockStore({
            ...initialState,
            gamesState: {
                ...initialState.gamesState,
                filteredGames: games
            },
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AllGamesSection />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getAllByTestId('mock-card').length).toBe(12);

        expect(screen.getByRole('button', { name: /2/i })).toBeInTheDocument();
    });

    test('shows active filters and clear all', () => {
        const store = mockStore({
            ...initialState,
            filtersState: {
                selectedGenre: 'Shooter',
                platform: 'pc',
                sortBy: 'popularity',
            },
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AllGamesSection />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByText('Shooter')).toBeInTheDocument();
        expect(screen.getByText('PC')).toBeInTheDocument();
        expect(screen.getByText('Popularity')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /clear all/i })).toBeInTheDocument();
    });

    test('opens filter menu and applies filter', () => {
        const store = mockStore(initialState);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AllGamesSection />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', { name: /filters/i }));
        expect(screen.getByText('Filter Options')).toBeInTheDocument();

        const selects = screen.getAllByRole('combobox');

        fireEvent.mouseDown(selects[0]);
        fireEvent.click(screen.getByText('Shooter'));

        fireEvent.click(screen.getByRole('button', { name: /apply filters/i }));
        expect(screen.getByRole('button', { name: /filters/i })).toBeInTheDocument();
    });
});