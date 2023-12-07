import { Button, Flex, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    const changeShowPassword = () => setShowPassword(!showPassword)

    const iconShowPassword = () => {
        if(showPassword) { 
            return <AiFillEye style={{ fontSize:'17px' }} /> 
        } else {
            return <AiFillEyeInvisible style={{ fontSize:'17px' }} />
        }
    }

    const navigate = useNavigate()

    const toast = useToast()

    const loginAccount = () => {
        if (!name || !password ) {
            toast({
                title: 'Por favor, preencha todos os campos',
                status: 'error',
                duration: 1500,
                isClosable: true,
            });
            return;
        }
    
        const userInfo = {
            name: name,
            password: password
        }
    
        api.post('/loginUser', userInfo)
            .then(() => {
                toast({
                    title: 'Usuário conectado com sucesso',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
                navigate(`/catalogo/${name}`);
            }).catch((err) => {
                console.log(err)
                toast({
                    title: err.response.data.message,
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                });
            })
    }

    return ( 
        <Flex 
            flexDirection='column'
            alignItems='center'
            mt='12%'>
            <Flex alignItems='center'>
                <FaUser style={{ fontSize:'25px' }} />
                <Text fontWeight='bold' fontSize='28px'>login do cliente</Text>
            </Flex>
            <Text>Conecte a sua conta na Tech Store!</Text>
            <Flex ml='5%' flexDirection='column'>
                <FormLabel>Nome</FormLabel>
                <Input 
                    value={name}
                    onChange={handleName}
                    _focus={{ 
                        borderColor: '#02d693', 
                        boxShadow: '0 0 0 0.2rem rgba(2, 214, 147, 0.25)' 
                    }}
                    borderColor='#aaaaaa'
                    w='350px'
                    bg='white'
                    placeholder="digite seu name" />
                <Flex flexDirection='column' w='100%'>
                    <FormLabel mb='0'>Senha</FormLabel>
                    <Flex>
                        <Input 
                            onChange={handlePassword}
                            value={password}
                            type={showPassword ? 'text' : 'password'}
                            _focus={{ 
                                borderColor: '#02d693', 
                                boxShadow: '0 0 0 0.2rem rgba(2, 214, 147, 0.25)' 
                            }}
                            borderColor='#aaaaaa'
                            bg='white'
                            w='350px'
                            placeholder="digite sua senha"
                        />
                        <Button variant='link' color='black' onClick={changeShowPassword}>
                            {iconShowPassword()}
                        </Button>
                    </Flex>
                    </Flex>
                <Button 
                    onClick={loginAccount}
                    boxShadow='md'
                    mt='3%' 
                    w='350px'
                    bg='#02d693' 
                    color='white'
                    _hover={{ backgroundColor:'#2cdba4', transition: 'transform 0.3s' }}>
                    Continuar
                </Button>
                <Flex justifyContent='center'  w='350px'>
                    <Text mr='1%'>Não tem cadastro?</Text>
                    <Link to="/register" style={{ fontWeight:'600', textDecoration: 'underline' }}>
                        Cadastre-se
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Login;
