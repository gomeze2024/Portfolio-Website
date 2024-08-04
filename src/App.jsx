import { createBrowserRouter, Route, RouterProvider, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import styled from "styled-components";

const StyledDiv = styled.div `
  width: 100vw;
  color: #242222;
`;

const startColor = [247, 247, 240];
const endColor = [36, 34, 34];
const delayScroll = 25;

document.body.style.backgroundColor = `rgb(startColor)`;

//ChatGPT helped with the linear interpolation between start color + end color, and making sure it only changed colors
//on the about me page.
const updateBackgroundColor = () => {
    const scrollPosition = window.scrollY;
    const normalizedScroll = Math.min(1, Math.max(0, (scrollPosition - delayScroll) / (window.innerHeight - delayScroll) * 1.25));
    const y = normalizedScroll > 1 ? 1 : normalizedScroll;

    const interpolateColor = (start, end) => {
        const interpolatedValue = start + (end - start) * y;
        return Math.round(interpolatedValue);
    };

    const interpolatedColor = startColor.map((start, index) => interpolateColor(start, endColor[index]));
    const [r, g, b] = interpolatedColor;

    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
};

function Root() {
    const location = useLocation();
    const [isHomePage, setIsHomePage] = useState(location.pathname === '/');

    useEffect(() => {
        setIsHomePage(location.pathname === '/');
    }, [location.pathname]);

    useEffect(() => {
        if (isHomePage) {
            window.addEventListener('scroll', updateBackgroundColor);
        } else {
            window.removeEventListener('scroll', updateBackgroundColor);
        }
        return () => {
            window.removeEventListener('scroll', updateBackgroundColor);
        };
    }, [isHomePage]);

    return (
        <StyledDiv>
            <Header/>
            <Routes>
                <Route path='/' element={<Profile userName='gomeze2024' />} />
                <Route path='/projects' element={<Projects userName='gomeze2024' />} />
                <Route path='/projects/:name' element={<ProjectDetail userName='gomeze2024' />} />
            </Routes>
        </StyledDiv>
    );
}

const router = createBrowserRouter([
    { path: "*", Component: Root }
]);

export default function App() {
    return (
        <RouterProvider router={router}/>
    );
}
