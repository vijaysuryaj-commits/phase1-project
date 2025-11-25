import { render, screen, waitForElement } from '@testing-library/react'
import LoginPage from './LoginPage'
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'

const mock = new AxiosMockAdapter(axios)

const mockLogin = jest.fn((username, password) => {
    if (username == 'testuser' && password == 'testpassword')
        return true;
    else
        return false
})

const mockAuthError = ''
const mockAuth = {
    login: mockLogin,
    error: mockAuthError
}

jest.mock('../context/AuthContext', () => ({
    useAuth: () => mockAuth,
}))

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}))


describe('Login Page', () => {
    beforeEach(()=>{
        mockLogin.mockClear();
        mockNavigate.mockClear();
    })
    test('renders correctly', () => {
        render(<LoginPage />)
        const userNameElement = screen.getByRole('heading', {
            name:/login/i
        })

        expect(userNameElement).toBeInTheDocument();
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    })
})