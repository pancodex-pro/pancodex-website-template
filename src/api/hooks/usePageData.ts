import {useContext} from 'react';
import {PageDataContext} from '../../features/PageDataProvider';
import {PageData} from '../types';

export const usePageData = (): PageData => {
    return useContext(PageDataContext);
};
