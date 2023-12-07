import { Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = () => {
    return ( 
        <InputGroup boxShadow='md' mt='3%' w='35%'>
            <Input 
                _focus={{ 
                    borderColor: 'black', 
                    boxShadow: '0 0 0 0.2rem rgba(2, 214, 147, 0)' 
                }}
                w='420px'
                placeholder="Busque aqui seu produto"
                bg='white'
                border='none' />
            <InputRightAddon border='none' bg='white'>
                <IoSearchSharp />
            </InputRightAddon>
        </InputGroup>
    );
}

export default SearchBar;