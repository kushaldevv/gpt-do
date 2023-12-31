import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Button,
  Icon
} from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'

type textProp = {
        text: string;
        index : number;
        isDragging: boolean;
        setList: React.Dispatch<React.SetStateAction<string[]>>;
        toDoArray: string[];
}

export default function ToDoCard({text, index, isDragging, toDoArray, setList}: textProp) {
  
  function handleDelete() {
    const newList = [...toDoArray]; 
    newList.splice(index - 1, 1); 
    setList(newList); 
  }

  return (
    <Center py={3}>
      <Box
        role={"group"}
        p={6}
        w={"375px"}
        bg={useColorModeValue( isDragging ? "gray.100" : "white", isDragging ? "gray.500" : "gray.600")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Stack  align={"center"}>
          <Heading fontSize={'medium'} fontFamily={"body"} fontWeight={500}>
            {text}
          </Heading>
          <Text color={"gray.500"} fontSize={"sm"}>
            {`Priority: ${index}`}
          </Text>
          <Button
            px={3}
            fontSize={"sm"}
            rounded={"full"}
            bg={"red.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(255 1 1 / 48%), 0 10px 10px -5px rgb(255 1 1 / 43%)"
            }
            _hover={{
              bg: "red.500",
            }}
            _focus={{
              bg: "red.500",
            }}
            alignSelf={'flex-end'}
            onClick={() => handleDelete()}
          >
            <Icon as={DeleteIcon} boxSize={3} />
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
