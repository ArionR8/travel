import { useEffect, useState } from 'react';
import { Aranzhimi } from '../models/Aranzhimi';
import { AranzhimiService } from '../services/AranzhimiService';

export const useAranzhimiViewModel = () => {
    const [aranzhimet, setAranzhimet] = useState<Aranzhimi[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const loadAranzhimet = async () => {
        setLoading(true);
        const data = await AranzhimiService.getAll();
        setAranzhimet(data);
        setLoading(false);
    };

    useEffect(() => {
        loadAranzhimet();
    }, []);

    return { aranzhimet, loading, reload: loadAranzhimet };
};
