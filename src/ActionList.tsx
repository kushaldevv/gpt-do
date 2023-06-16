import {
        VStack,
        useColorModeValue,
        Heading
      } from "@chakra-ui/react";
      import ActionCard from "./ActionCard";
      
      import { Action } from './types';

      type ActionListProps = {
        actionList: Action[];
        setActionList: React.Dispatch<React.SetStateAction<Action[]>>;
      };

      export default function ActionList({actionList, setActionList }: ActionListProps) {
        return (
          <VStack
          role={"group"}
          pt ='3'
          pb={'5'}  
          w={"425px"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          overflowY={"auto"}
          maxH="70vh"
          zIndex={1}
          >
              <Heading alignSelf={'flex-start'} ml = '5' pt='1' fontSize={'2xl'}>
                      Action List
              </Heading>
              {actionList.map((toDo: { title: string;  steps: string}, index: number) => (
              <div key={index}>
                <ActionCard text={toDo.title} steps={toDo.steps} index={index + 1} actionList={actionList} setActionList={setActionList}/>
              </div>
            ))}
          </VStack>
        );
      }
      