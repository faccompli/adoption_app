import { Routes, Route, Link } from 'react-router-dom';
import Main from './Main';
import Details from './Details';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="details/:id" element={<Details />} />
            </Routes>
        </>
    )
};

export default App;