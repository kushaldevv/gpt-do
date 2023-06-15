import {
  Button,
  Icon,
  VStack,
  useColorModeValue,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import ToDoCard from "./ToDoCard";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";

type ToDoListProps = {
        toDoArray: string[];
        setList: React.Dispatch<React.SetStateAction<string[]>>;

}
const finalSpaceCharacters = [
        {
          id: 'gary',
          name: 'Gary Goodspeed',
          thumb: '/images/gary.png'
        },
        {
          id: 'cato',
          name: 'Little Cato',
          thumb: '/images/cato.png'
        },
        {
          id: 'kvn',
          name: 'KVN',
          thumb: '/images/kvn.png'
        },
        {
          id: 'mooncake',
          name: 'Mooncake',
          thumb: '/images/mooncake.png'
        },
        {
          id: 'quinn',
          name: 'Quinn Ergon',
          thumb: '/images/quinn.png'
        }
      ]
export default function ToDoList({ toDoArray, setList }: ToDoListProps) {
        const [text, setText] = useState("");
        const [characters, updateCharacters] = useState(finalSpaceCharacters);

        
        let handleInputChange = (e: { target: { value: string; }; }) => {
                let inputValue = e.target.value
                setText(inputValue)
        }

        function handleOnDragEnd(result : any) {
                if (!result.destination) return;
            
                const items = Array.from(characters);
                const [reorderedItem] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedItem);
            
                updateCharacters(items);
              }

  const { isOpen, onOpen, onClose } = useDisclosure()
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
    zIndex={1}
    overflowY={'auto'}
    maxH='70vh'
    >
        <Heading alignSelf={'flex-start'} ml = '5' pt='1' fontSize={'2xl'}>
                To-Do
        </Heading>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul  {...provided.droppableProps} ref={provided.innerRef}>
                {toDoArray.map((str, index) => (
                    <Draggable key={index} draggableId={index.toString()} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                           <ToDoCard text={str} index={index + 1}/>
                        </li>
                      )}
                    </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>


      <Button
      style={{
        position: "sticky",
        bottom: "0px",
        zIndex: 2
      }}
        p={7}
        rounded={"full"}
        bg={"green.400"}
        color={"white"}
        boxShadow={
          "0px 1px 25px -5px rgb(1 200 1 / 48%), 0 10px 10px -5px rgb(1 200 1 / 43%)"
        }
        _hover={{
          bg: "green.500",
        }}
        alignSelf={'flex-end'}
        mx = '20px'
        onClick={onOpen}
      >
        <Icon as={AddIcon} boxSize={6} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new To-Do</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                <Textarea
                        value={text}
                        onChange={handleInputChange}
                >

                </Textarea>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button  colorScheme='green' onClick={() => setList([...toDoArray, text])}>Post To-Do</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
