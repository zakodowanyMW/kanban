import KanbanAPI from "./api/KanbanAPI.js";
 
console.log(KanbanAPI.getItems(1));

KanbanAPI.updateItem(8960, {
    columnId: 1,
    position: 0,
    content: "I've changed."
})





