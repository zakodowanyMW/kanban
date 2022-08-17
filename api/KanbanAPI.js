export default class KanbanAPI {
    static getItems(columnId) {
        const column = read().find(column => column.id == columnId);
        if(!column) return [];
        return column.items;
    }

    static insertItem(columnID, content) {
        const data = read(); //zwraca referencję do obiektu, bo zwracana jest tablica czyli obiekt
        const column = data.find(column => column.id == columnID); // zwraca referencję do obiektu bo zwracany jest obiekt, możemy dzięki temu go nadpisać od razu
        const item = {
            idRandom: Math.floor(Math.random() * 10000),
            content : content,
        };    
        if(!column) {
            throw new Error("Column does not exit")
        }
        column.items.push(item);
        save(data);
        return item;
    }

    static updateItem(itemID, newProps) {
        const data = read();
        const [item, currentColumn] =(() => {
            for(const column of data) {
                const item = column.items.find( item => item.idRandom === itemID)
                if(item) {
                    return [item, column];
                }
            }
        })();
        if(!item) {
            throw new Error("Item not found");
        }
        item.content = newProps.content === undefined ? item.content : newProps.content;

        // update column and position
        if(newProps.columnId !== undefined && newProps.position !== undefined) {
            const targetColumn = data.find(column => column.id == newProps.columnId);
            console.log(targetColumn)
        }
    }
}


function read() {
    const json = localStorage.getItem("kanban-data");

    if(!json) {
        return [
            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            }
        ];
    }
    return JSON.parse(json);
}

function save(data) {
    localStorage.setItem("kanban-data", JSON.stringify(data))
}