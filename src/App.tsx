import {
  ChakraProvider,
  Box,
  theme,
  Center,
  Wrap,
  WrapItem,
  Button,
  Icon,
  Text,
} from "@chakra-ui/react";
import Header from "./Header";
import ToDoList from "./ToDo";
import ActionList from "./ActionList";
import { ChatIcon } from "@chakra-ui/icons";
import  { useState } from "react";

export const App = () => {
  const [list, setList] = useState<string[]>([
    "Finish to do app project and submit on github and send link to recruiter" ,
    "Second object",
    "Third object",
    "Fourth object"
  ]);
  return (
  <ChakraProvider theme={theme}>
    <Box>
      <Header />
      <Center>
        <Button
          w="150px"
          my="6"
          fontSize={"sm"}
          rounded={"full"}
          bg={"blue.400"}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: "blue.500",
          }}
          _focus={{
            bg: "blue.500",
          }}
          alignSelf={"flex-end"}
          isLoading={false}
        >
          <Icon as={ChatIcon} boxSize={4} />
          <Text mx="2">
            Generate
          </Text>
        </Button>
      </Center>
      <Center>
        <Wrap justify="center" spacing="8">
          <WrapItem>
            <ToDoList toDoArray={list} setList = {setList}/>
          </WrapItem>
          <WrapItem>
            <ActionList />
          </WrapItem>
        </Wrap>
      </Center>
    </Box>
  </ChakraProvider>
  );
};
