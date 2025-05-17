import { Fluturimi } from '../models/Fluturimi';

const fluturimeMock: Fluturimi[] = [
    { id: '1', kompania: 'AirKosova', prej: 'Prishtine', deri: 'Zyrih', cmimi: 150 },
    { id: '2', kompania: 'Lufthansa', prej: 'Frankfurt', deri: 'New York', cmimi: 550 },
];

export const FluturimiService = {
    getAll: async (): Promise<Fluturimi[]> => {
        return new Promise(resolve => {
            setTimeout(() => resolve(fluturimeMock), 500);
        });
    },
};
