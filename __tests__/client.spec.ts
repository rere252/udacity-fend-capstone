import axios from 'axios';
import 'reflect-metadata';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Client-side services', () => {});
