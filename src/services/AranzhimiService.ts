import { Aranzhimi } from '../models/Aranzhimi';

const aranzhimetMock: Aranzhimi[] = [
    { id: '1', emri: 'Aranzhimi A', pershkrimi: 'Pershkrimi A', cmimi: 300 },
    { id: '2', emri: 'Aranzhimi B', pershkrimi: 'Pershkrimi B', cmimi: 450 },
];

export const AranzhimiService = {
    getAll: async (): Promise<Aranzhimi[]> => {
        return new Promise(resolve => {
            setTimeout(() => resolve(aranzhimetMock), 500);
        });
    },
};
