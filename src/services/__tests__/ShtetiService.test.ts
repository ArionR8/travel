// src/services/__tests__/ShtetiService.test.ts

import * as ShtetiService from '../ShtetiService';
import api from '../api';

// Mock Axios instance
jest.mock('../api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe('ShtetiService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchShtetet returns data from API', async () => {
    const mockData = [{ id: '1', name: 'Kosova' }];
    (api.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await ShtetiService.fetchShtetet();

    expect(api.get).toHaveBeenCalledWith('/api/shtetet');
    expect(result).toEqual(mockData);
  });

  it('addShteti posts data to API', async () => {
    const payload = { emri: 'Shqipëria' };
    (api.post as jest.Mock).mockResolvedValue({});

    await ShtetiService.addShteti(payload);

    expect(api.post).toHaveBeenCalledWith('/api/add-shtetin', payload);
  });

  it('updateShteti sends put request and returns updated shteti', async () => {
    const id = '123';
    const payload = { emri: 'Maqedonia e Veriut' };
    const updated = { id, ...payload };
    (api.put as jest.Mock).mockResolvedValue({ data: updated });

    const result = await ShtetiService.updateShteti(id, payload);

    expect(api.put).toHaveBeenCalledWith(`/api/shtetin-update/${id}`, payload);
    expect(result).toEqual(updated);
  });

  it('deleteShtet sends delete request', async () => {
    const id = '123';
    (api.delete as jest.Mock).mockResolvedValue({});

    await ShtetiService.deleteShtet(id);

    expect(api.delete).toHaveBeenCalledWith(`/api/shtetin-delete/${id}`);
  });
});
