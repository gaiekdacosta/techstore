import { Flex } from "@chakra-ui/react";
import SearchBar from "../components/searchBar";


const Home = () => {
    return ( 
        <Flex flexDirection='column' w='100%' align='center'>
            <SearchBar />
        </Flex>
    );
}

export default Home;