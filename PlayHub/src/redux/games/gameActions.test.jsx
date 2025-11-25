import axios from "axios";
import * as types from './gamesTypes'
import { fetchPopularGames, fetchGames, fetchFilteredGames, doSearch } from "./gameActions";
import { configureStore } from "redux-mock-store";
import { thunk } from "redux-thunk";

import MockAxiosAdapter from 'axios-mock-adapter'

const mockStore = configureStore([thunk])

describe('Game Actions', () => {
    let store;
    let mockAxios;
    beforeEach(() => {
        store = mockStore([]);
        mockAxios = new MockAxiosAdapter(axios)
        
    });
    afterEach(() => {
        mockAxios.reset();
    })

    describe('fetchPopularGames', () => {
        test('dispatches success when api returns data', async () => {
            const mockData = [{
                id: 1,
                title: 'pubg'
            }];
            mockAxios.onGet('/api/games?sort-by=popularity')
                .reply(200, mockData)
            await store.dispatch(fetchPopularGames())
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: types.FETCH_POPULAR_GAMES_REQUEST
            })
            expect(actions[1]).toEqual({
                type: types.FETCH_POPULAR_GAMES_SUCCESS,
                payload: mockData
            })
        })

        test('dispatches failure when api fails', async () => {
            mockAxios.onGet('/api/games?sort-by=popularity').reply(500)
            await store.dispatch(fetchPopularGames())
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: types.FETCH_POPULAR_GAMES_REQUEST
            })
            expect(actions[1]).toEqual({
                type: types.FETCH_POPULAR_GAMES_FAILURE,
                payload: "Request failed with status code 500"
            })
        })

    })

    describe('fetchGames', () => {
        test.only('dispatches succes when api returns data', async () => {
            const mockData = [{
                id: 1,
                title: 'Pubg'
            }]
            mockAxios.onGet('/api/games').reply(200, mockData)
            await store.dispatch(fetchGames());
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: types.FETCH_GAMES_REQUEST
            })
            expect(actions[1]).toEqual({
                type: types.FETCH_GAMES_SUCCESS,
                payload: mockData
            })
        })
        test.only('dispatches failure when api fails', async () => {
            mockAxios.onGet('/api/games').reply(500);
            await store.dispatch(fetchGames());
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: types.FETCH_GAMES_REQUEST
            })
            expect(actions[1]).toEqual({
                type: types.FETCH_GAMES_FAILURE,
                payload: 'Request failed with status code 500'
            })
        })
    })

    describe('fetchFilteredGames', () => {

        const expectedUrl = 'api/games?category=shooter&platform=pc&sort-by=release-date'
        const filters = {
            selectedGenre: "shooter",
            platform: "pc",
            sortBy: "release-date",
        }

        const mockData = [{
            id: 1,
            title: 'Pubg'
        }]
        test.only('bulids correct url and fetch success', async () => {
            mockAxios.onGet(expectedUrl).reply(200, mockData)
            await store.dispatch(fetchFilteredGames(filters));
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: types.FETCH_FILTERED_GAMES_REQUEST
            })
            expect(actions[1]).toEqual({
                type: types.FETCH_FILTERED_GAMES_SUCCESS,
                payload: mockData
            })
        })
        test.only('builds correct url and renders error when api fails', async () => {
            mockAxios.onGet(expectedUrl).reply(500);
            await store.dispatch(fetchFilteredGames());
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: types.FETCH_FILTERED_GAMES_REQUEST
            })
            expect(actions[1]).toEqual({
                type: types.FETCH_FILTERED_GAMES_FAILURE,
                payload: 'Request failed with status code 404'
            })
        })

        describe('Do search', () => {
            const searchQuery = 'pubg'
            test.only('dispatches doSearch', async () => {
                await store.dispatch(doSearch(searchQuery))
                const actions = store.getActions();
                expect(actions[0]).toEqual({
                    type: types.FETCH_GAMES_REQUEST
                })
                expect(actions[1]).toEqual({
                    type: types.FETCH_GAMES_FAILURE,
                    payload: "Cannot read properties of undefined (reading 'games')"
                })
            })

        })
    })
})