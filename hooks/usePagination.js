import React, { useState } from 'react';

export const usePagination = (valSliced) => {
    const [page, setPage] = useState(1)
    const [dataSliced] = useState(valSliced)

    const firstSlice = (page - 1) * dataSliced
    const secondSlice = dataSliced * page 

    return {
        page, setPage, dataSliced, firstSlice, secondSlice
    }
};

