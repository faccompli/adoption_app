import { Routes, Route, Link } from 'react-router-dom';
import SearchParams from './SearchParams';
import Details from './Details';

const App = () => {
    return (
        <>
            <header>
                <h1><Link to="/">Adopt A Pet</Link></h1>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<SearchParams/>} />
                    <Route path="details/:id" element={<Details />} />
                </Routes>
            </main>
        </>
    )
};

export default App;