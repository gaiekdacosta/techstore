import { Button, Flex } from "@chakra-ui/react";
import { FaUser, FaStoreAlt } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";

const SideBar = () => {

    const actualPath = window.location.pathname.split('/')[1];

    const { user } = useParams()

    return ( 
        <>
            <Flex 
                flexDirection='column' 
                alignItems='center'
                borderRadius='10px'
                bg='white' 
                boxShadow='md'
                maxWidth='5%'
                h='95vh'
                p='1%' 
                m='1.2%'>
                <BiSolidPurchaseTag style={{ fontSize:'28px', color:'#02d693' }} />
                <Flex 
                    mt='1vh' 
                    flexDirection='column' 
                    justifyContent='space-around' 
                    h='15vh'>
                    <Button 
                        p='-1'
                        _hover={{  }}
                        as={Link} 
                        to={`/catalogo/${user}`}
                        variant={actualPath === 'catalogo' ? 'solid' : 'link'}
                        bg={actualPath === 'catalogo' ? 'black' : ''}
                        color={actualPath === 'catalogo' ? 'white' : 'black'}>
                        <FaStoreAlt style={{ fontSize:'23px' }} />
                    </Button>
                    <Button
                        p='-1'
                        _hover={{  }}
                        as={Link} 
                        to={`/bolsa/${user}`}
                        variant={actualPath === 'bolsa' ? 'solid' : 'link'}
                        bg={actualPath === 'bolsa' ? 'black' : ''}
                        color={actualPath === 'bolsa' ? 'white' : 'black'}>
                        <IoBagHandle style={{ fontSize:'23px' }} />
                    </Button>
                </Flex>
                <Button 
                    as={Link} 
                    to={`/login`}
                    color='black'
                    variant='link'
                    mt='68vh'>
                    <FaUser style={{ fontSize:'21px' }} />
                </Button>
            </Flex>
        </>
    );
}

export default SideBar;