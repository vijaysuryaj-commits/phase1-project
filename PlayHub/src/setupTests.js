import '@testing-library/jest-dom';

// JSDOM / Node environment sometimes doesn't provide TextEncoder/TextDecoder
// (react-router or other libs expect them). Provide simple shims from Node's util
// so tests run reliably in CI and locally.
// See: ReferenceError: TextEncoder is not defined in Jest
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = global.TextEncoder || TextEncoder;
global.TextDecoder = global.TextDecoder || TextDecoder;
