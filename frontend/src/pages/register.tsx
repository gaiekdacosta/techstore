import { Button, Flex, FormLabel , Input, 
    Radio, RadioGroup, Stack, Text, useToast } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import api from "../api/api";
import ModalTips from "../components/modalTips";

const Register = () => {
    const [name, setName] = useState<string>('')
    const [birthday, setBirthday] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const toast = useToast()

    const navigate = useNavigate()

    const changeShowPassword = () => setShowPassword(!showPassword)

    const iconShowPassword = () => {
        if(showPassword) { 
            return <AiFillEye style={{ fontSize:'17px' }} /> 
        } else {
            return <AiFillEyeInvisible style={{ fontSize:'17px' }} />
        }
    }

    const createChangeHandler = (setStateFunction: React.Dispatch<React.SetStateAction<string>>) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => setStateFunction(e.target.value);

    const handlePassword = createChangeHandler(setPassword);
    const handleName = createChangeHandler(setName);
    const handleBirthday = createChangeHandler(setBirthday);
    const handleEmail = createChangeHandler(setEmail);

    const handleGenderChange = (selectedGender: string) => setGender(selectedGender);

    const verifyPassword = (password: string) => {
        const minimalLength = 8;
        const lowerCase = /[a-z]/.test(password);
        const upperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    
        const validPassword =
        password.length >= minimalLength &&
        lowerCase &&
        upperCase &&
        hasNumber &&
        hasSpecialCharacter;
    
        if (password === '') {
            return '';
        }
        
        return !validPassword && 'Por favor, escolha uma senha mais forte.';
    }

    const createAccount = () => {
        if (!name || !birthday || !email || !gender || !password) {
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
            birthday: birthday,
            email: email,
            gender: gender,
            password: password
        }
    
        api.post('/createUser', { userInfo: userInfo })
            .then(() => {
                toast({
                    title: 'Usuário criado com sucesso',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                });
                navigate('/')
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
            justifyContent='center' 
            alignItems='center'
            mt='5%'>
            <Flex alignItems='center'>
                <FaUserPlus style={{ fontSize:'30px' }} />
                <Text fontWeight='bold' fontSize='28px'>criar seu usuário</Text>
            </Flex>
            <Text w='25%' textAlign='center'>
                Registre-se e adquira seus gadgets de maneira conveniente e ágil!
            </Text>
            <Flex flexDirection='column'>
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
                    placeholder="digite seu nome" />
                <FormLabel>Data de nascimento</FormLabel>
                <Input 
                    value={birthday}
                    onChange={handleBirthday}
                    _focus={{ 
                        borderColor: '#02d693', 
                        boxShadow: '0 0 0 0.2rem rgba(2, 214, 147, 0.25)' 
                    }}
                    borderColor='#aaaaaa'
                    w='350px'
                    type='date' 
                    bg='white' />
                <FormLabel>Gênero</FormLabel>
                <RadioGroup value={gender} onChange={handleGenderChange}>
                    <Stack direction='row'>
                        <Radio 
                            value='feminino' 
                            bg='white' 
                            colorScheme='green'>
                            feminino
                        </Radio>
                        <Radio 
                            value='masculino' 
                            bg='white' 
                            colorScheme='green'>
                            masculino
                        </Radio>
                        <Radio 
                            value='não informar' 
                            bg='white' 
                            colorScheme='green'>
                            não informar
                        </Radio>
                    </Stack>
                </RadioGroup>
                <FormLabel>Email</FormLabel>
                <Input 
                    value={email}
                    onChange={handleEmail}
                    _focus={{ 
                        borderColor: '#02d693', 
                        boxShadow: '0 0 0 0.2rem rgba(2, 214, 147, 0.25)' 
                    }}
                    borderColor='#aaaaaa'
                    w='350px'
                    bg='white'
                    placeholder="digite seu email" />
                <Flex alignItems='center'>
                    <Flex flexDirection='column'>
                        <FormLabel mb='0'>Senha <ModalTips /></FormLabel>
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
                                w='350px'
                                bg='white'
                                placeholder="digite sua senha"
                            />
                            <Button variant='link' color='black' onClick={changeShowPassword}>
                                {iconShowPassword()}
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
                <Text color='red'>{verifyPassword(password)}</Text>
                <Button 
                    onClick={createAccount}
                    boxShadow='md'
                    mt='3%' 
                    bg='#02d693' 
                    color='white'
                    w='350px'
                    _hover={{ backgroundColor:'#2cdba4', transition: 'transform 0.3s' }}>
                    Criar seu usuário
                </Button>
                <Flex justifyContent='center'>
                    <Text mr='1%'>Já tem cadastro?</Text>
                    <Link to="/login" style={{ fontWeight:'600', textDecoration: 'underline' }}>
                        Entrar
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Register;