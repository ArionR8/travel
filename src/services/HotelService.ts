import { Hotel } from '../models/Hotel';

const hotelMock: Hotel[] = [
    { id: '1', emri: 'Hotel A', vendndodhja: 'Prishtine', yje: 4 },
    { id: '2', emri: 'Hotel B', vendndodhja: 'Prizren', yje: 3 },
];

export const HotelService = {
    getAll: async (): Promise<Hotel[]> => {
        return new Promise(resolve => {
            setTimeout(() => resolve(hotelMock), 500);
        });
    },
};
