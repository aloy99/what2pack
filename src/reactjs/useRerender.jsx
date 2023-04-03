import { useState } from 'react';

function useRerender(){
    const [, forceRerender ]= useState();  
    function rerenderACB(){ forceRerender(new Object()); }

    return rerenderACB;
}

export default useRerender;