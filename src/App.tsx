import {
  ChakraProvider,
  Box,
  Center,
  Wrap,
  WrapItem,
  Button,
  Icon,
  Text,
  extendTheme,
} from "@chakra-ui/react";
import Header from "./Header";
import ToDoList from "./ToDo";
import ActionList from "./ActionList";
import { ChatIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { openai } from "./openaiClient";
import { Action } from "./types";

export const App = () => {
  const [list, setList] = useState<string[]>([]);
  const [actionList, setActionList] = useState<Action[]>([
    // {
    //   title: "Do homework",
    //   steps: `<ul>
    //   <li>Start with a light warm up of stretching for the upper body such as arm circles and shoulder shrugs.</li>
    //   <li>Perform exercises such as push-ups, crunches, tricep dips, and pull-ups, using 3-4 sets of increasing body weight or dumbbells with 8-10 reps.</li>
    //   <li>Finish with light stretching and breath work to relax the muscles.</li>
    //   </ul>`,
    // },
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  async function requestSteps() {
    if (list.length !== 0){
      console.log(list);
      var newActionList = []
      setLoading(true);
      for (const todo of list){
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Generate 3 <ul> bullets detailed and efficient action steps for the task. The task is "${todo}".`,
          temperature: 0.9,
          max_tokens: 150,
          top_p: 1,
          frequency_penalty: 0.0,
          presence_penalty: 0.6,
        });
        console.log(response)
        let responseText = response.data.choices[0].text
        if (responseText)
          newActionList.push({title: todo, steps: responseText})
      }
      setActionList(newActionList)
      setLoading(false);
    }
  }

  return (
    <ChakraProvider
      theme={extendTheme({
        initialColorMode: "dark",
        useSystemColorMode: false,
      })}
    >
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
            isLoading={loading}
            onClick={requestSteps}
          >
            <Icon as={ChatIcon} boxSize={4} />
            <Text mx="2">Generate</Text>
          </Button>
        </Center>
        <Center>
          <Wrap justify="center" spacing="8">
            <WrapItem>
              <ToDoList toDoArray={list} setList={setList} />
            </WrapItem>
            <WrapItem>
              <ActionList
                actionList={actionList}
                setActionList={setActionList}
              />
            </WrapItem>
          </Wrap>
        </Center>
      </Box>
    </ChakraProvider>
  );
};


// " \n\nDo Stat Homework:\n• Brainstorm topics and create an outline\n• Research the material for each topic\n• Write paper and cite sources\n\nDo Chem Homework:\n• Read the instructions and look at the examples given\n• Complete the practice problems for the assignment\n• Check over the answers to make sure they are correct\n\nDo Upperbody Workout:\n• Research exercises that target the upper body muscles\n• Purchase any needed equipment for the workout\n• Perform the exercises 2-3 times a week"