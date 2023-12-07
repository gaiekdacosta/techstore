import { Route, Routes } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import Home from '../pages/home';
import Login from '../pages/login';
import Bag from '../pages/bag'
import SideBar from '../components/sideBar';import Register from '../pages/register';

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/catalogo/:user"
                element={
                    <Flex>
                        <SideBar />
                        <Home />
                    </Flex>
                }
            />
            <Route
                path="/bolsa/:user"
                element={
                    <Flex>
                        <SideBar />
                        <Bag />
                    </Flex>
                }
            />
        </Routes>
    );
};

export default RoutesComponent;
