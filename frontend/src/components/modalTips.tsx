import { Button, Flex, Modal, ModalBody, ModalCloseButton, 
    ModalContent, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { FaCircleInfo } from "react-icons/fa6";

const ModalTips = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return ( 
        <>
            <Button variant='unstyled' color='black' onClick={onOpen}>
                <FaCircleInfo />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                <ModalCloseButton />
                    <ModalBody>
                        <Flex p='6%' flexDirection='column'>
                            <Flex fontSize='20px' alignItems='center'>
                                <FaCircleInfo style={{ marginRight:'2px' }} />  
                                <Text fontWeight='semibold'>
                                    Dicas para criar uma senha segura
                                </Text>
                            </Flex>
                            <Text w='100%' lineHeight='1.4'>
                                - Combine letras maiúsculas, minúsculas, números e caracteres especiais.
                                <br />
                                - Evite usar palavras comuns, sequências óbvias ou informações pessoais.
                                <br />
                                - Use uma senha com pelo menos 8 caracteres.
                                <br />
                                - Altere suas senhas regularmente.
                            </Text>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalTips;