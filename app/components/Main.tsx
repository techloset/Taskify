// import React, { useContext } from "react";
// import { MoreHorizontal, UserPlus, Edit2 } from "react-feather";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { BoardContext } from "@/context/BoardContext";
// import AddList from "./AddList";
// import CardAdd from "./AddCard";
// import utils from "@/utils/utils";

// const Main = () => {
//   const { allboard, setAllBoard } = useContext(BoardContext);
//   const bdata = allboard.boards[allboard.active];

//   function onDragEnd(res: any) {
//     if (!res.destination) {
//       console.log("No Destination");
//       return;
//     }
//     const newList = [...bdata.list];
//     const s_id = parseInt(res.source.droppableId);
//     const d_id = parseInt(res.destination.droppableId);
//     const [removed] = newList[s_id - 1].items.splice(res.source.index, 1);
//     newList[d_id - 1].items.splice(res.destination.index, 0, removed);

//     let board_ = { ...allboard };
//     board_.boards[board_.active].list = newList;
//     setAllBoard(board_);
//   }

//   const cardData = (e: any, ind: any) => {
//     let newList = [...bdata.list];
//     newList[ind].items.push({ id: utils.makeid(5), title: e });

//     let board_ = { ...allboard };
//     board_.boards[board_.active].list = newList;
//     setAllBoard(board_);
//   };

//   const listData = (e: any) => {
//     let newList = [...bdata.list];
//     newList.push({ id: newList.length + 1 + "", title: e, items: [] });

//     let board_ = { ...allboard };
//     board_.boards[board_.active].list = newList;
//     setAllBoard(board_);
//   };

//   return (
//     <div
//       className="flex flex-col w-full"
//       style={{ backgroundColor: `${bdata.bgcolor}` }}
//     >
//       <div className="p-3 bg-black flex justify-between w-full bg-opacity-50">
//         <h2 className="text-lg font-semibold">{bdata.name}</h2>
//         <div className="flex items-center justify-center">
//           <button className="bg-gray-200 h-8 text-gray-800 px-2 py-1 mr-2 rounded flex justify-center items-center">
//             <UserPlus size={16} className="mr-2"></UserPlus>
//             Share
//           </button>
//           <button className="hover:bg-gray-500 px-2 py-1 h-8 rounded">
//             <MoreHorizontal size={16}></MoreHorizontal>
//           </button>
//         </div>
//       </div>
//       <div className="flex flex-col w-full flex-grow relative">
//         <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden">
//           <DragDropContext onDragEnd={onDragEnd}>
//             {bdata.list &&
//               bdata.list.map((x: any, ind: any) => {
//                 return (
//                   <div
//                     key={ind}
//                     className="mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0"
//                   >
//                     <div className="list-body">
//                       <div className="flex justify-between p-1">
//                         <span className="text-slate-400">{x.title}</span>
//                         <button className="hover:bg-gray-500 p-1 rounded-sm">
//                           <MoreHorizontal size={16}></MoreHorizontal>
//                         </button>
//                       </div>
//                       <Droppable droppableId={x.id}>
//                         {(provided, snapshot) => (
//                           <div
//                             className="py-1"
//                             ref={provided.innerRef}
//                             style={{
//                               backgroundColor: snapshot.isDraggingOver
//                                 ? "#222"
//                                 : "transparent",
//                             }}
//                             {...provided.droppableProps}
//                           >
//                             {x.items &&
//                               x.items.map((item: any, index: any) => {
//                                 return (
//                                   <Draggable
//                                     key={item.id}
//                                     draggableId={item.id}
//                                     index={index}
//                                   >
//                                     {(provided, snapshot) => (
//                                       <div
//                                         ref={provided.innerRef}
//                                         {...provided.draggableProps}
//                                         {...provided.dragHandleProps}
//                                       >
//                                         <div className="item flex justify-between items-center  py-3 bg-[#2b2d42] cursor-pointer rounded-md hover:border-gray-500">
//                                           <span className="text-slate-400">
//                                             {item.title}
//                                           </span>
//                                           <span className="flex justify-start items-start">
//                                             <button className="hover:bg-gray-600 p-1 rounded-sm">
//                                               <Edit2 size={16}></Edit2>
//                                             </button>
//                                           </span>
//                                         </div>
//                                       </div>
//                                     )}
//                                   </Draggable>
//                                 );
//                               })}

//                             {provided.placeholder}
//                           </div>
//                         )}
//                       </Droppable>

//                       <CardAdd getcard={(e: any) => cardData(e, ind)}></CardAdd>
//                     </div>
//                   </div>
//                 );
//               })}
//           </DragDropContext>

//           <AddList getlist={(e: any) => listData(e)}></AddList>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;

import React, { useContext } from "react";
import { MoreHorizontal, UserPlus, Edit2 } from "react-feather";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BoardContext } from "@/context/BoardContext";
import AddList from "./AddList";
import CardAdd from "./AddCard";
import utils from "@/utils/utils";

const Main = () => {
  const { allboard, setAllBoard } = useContext(BoardContext);
  const bdata = allboard.boards[allboard.active];

  function onDragEnd(res: any) {
    if (!res.destination) {
      console.log("No Destination");
      return;
    }

    const { source, destination, type } = res;

    if (type === "list") {
      const newListOrder = [...bdata.list];
      const [removed] = newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, removed);

      let board_ = { ...allboard };
      board_.boards[board_.active].list = newListOrder;
      setAllBoard(board_);
    } else if (type === "card") {
      const sourceListIndex = parseInt(source.droppableId);
      const destListIndex = parseInt(destination.droppableId);

      const newList = [...bdata.list];
      const [removed] = newList[sourceListIndex].items.splice(source.index, 1);
      newList[destListIndex].items.splice(destination.index, 0, removed);

      let board_ = { ...allboard };
      board_.boards[board_.active].list = newList;
      setAllBoard(board_);
    }
  }

  const cardData = (e: any, ind: any) => {
    let newList = [...bdata.list];
    newList[ind].items.push({ id: utils.makeid(5), title: e });

    let board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
  };

  const listData = (e: any) => {
    let newList = [...bdata.list];
    newList.push({ id: newList.length + "", title: e, items: [] });

    let board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
  };

  return (
    <div
      className="flex flex-col w-full"
      style={{ backgroundColor: `${bdata.bgcolor}` }}
    >
      <div className="p-3 bg-black flex justify-between w-full bg-opacity-50">
        <h2 className="text-lg font-semibold">{bdata.name}</h2>
        <div className="flex items-center justify-center">
          <button className="bg-gray-200 h-8 text-gray-800 px-2 py-1 mr-2 rounded flex justify-center items-center">
            <UserPlus size={16} className="mr-2"></UserPlus>
            Share
          </button>
          <button className="hover:bg-gray-500 px-2 py-1 h-8 rounded">
            <MoreHorizontal size={16}></MoreHorizontal>
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full flex-grow relative">
        <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board" type="list" direction="horizontal">
              {(provided) => (
                <div
                  className="flex"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {bdata.list &&
                    bdata.list.map((list: any, listIndex: any) => (
                      <Draggable
                        key={list.id}
                        draggableId={list.id}
                        index={listIndex}
                      >
                        {(provided) => (
                          <div
                            className="mr-3 w-[300px] rounded-md h-fit p-2 bg-black flex-shrink-0"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <div className="list-body">
                              <div
                                className="flex justify-between p-1"
                                {...provided.dragHandleProps}
                              >
                                <span className="text-slate-400">
                                  {list.title}
                                </span>
                                <button className="hover:bg-gray-500 p-1 rounded-sm">
                                  <MoreHorizontal size={16}></MoreHorizontal>
                                </button>
                              </div>
                              <Droppable
                                droppableId={`${listIndex}`}
                                type="card"
                              >
                                {(provided, snapshot) => (
                                  <div
                                    className="py-1"
                                    ref={provided.innerRef}
                                    style={{
                                      backgroundColor: snapshot.isDraggingOver
                                        ? "#222"
                                        : "transparent",
                                    }}
                                    {...provided.droppableProps}
                                  >
                                    {list.items &&
                                      list.items.map(
                                        (item: any, index: any) => (
                                          <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                          >
                                            {(provided, snapshot) => (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                              >
                                                <div className="item flex justify-between items-center py-3 mt-2 h-[60px] bg-[#2b2d42] cursor-pointer rounded-md hover:border-gray-500">
                                                  <span className="text-slate-400">
                                                    {item.title}
                                                  </span>
                                                  <span className="flex justify-start items-start">
                                                    <button className="hover:bg-gray-600 p-1 rounded-sm">
                                                      <Edit2 size={16}></Edit2>
                                                    </button>
                                                  </span>
                                                </div>
                                              </div>
                                            )}
                                          </Draggable>
                                        )
                                      )}
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                              <CardAdd
                                getcard={(e: any) => cardData(e, listIndex)}
                              ></CardAdd>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  <AddList getlist={listData}></AddList>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Main;
