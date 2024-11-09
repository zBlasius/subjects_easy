import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";
import request from "../../utils/request";

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('')
    const [filteredItems, setFilteredItems] = useState<String[]>([])
    const [countDown, setCountDown] = useState({value: 0})
    
    const items = [
        { name: "Brazil", code: 1 },
        { name: "Angola", code: 2 },
        { name: "Romenia", code: 3 },
        { name: "França", code: 4 },
        { name: "Inglaterra", code: 5 },
        { name: "Irlanda", code: 6 },
        { name: "Rússia", code: 7 },
        { name: "EUA", code: 8 },
        { name: "Canadá", code: 9 },
        { name: "Alemanha", code: 10 },
        { name: "Portugal", code: 11 }
    ]

    useEffect(()=>{
        if(!countDown.value) return

        const timeId = setTimeout(()=>{
            
            request("/course/search", "GET", { name: searchValue }).then((ret) => {
                
                if (ret) {
                    const items = ret.map((item: any)=> item.title);
                    setFilteredItems(items);
                }
              });
        },countDown.value)

        return ()=> clearTimeout(timeId)
    },[countDown])



    function searchItems(event: { query: string }){
        const name = event.query;
        setSearchValue(name);
        let count = {value: 3000}
        setCountDown({...count});
    }

  return (
    <div>
      <AutoComplete
        value={searchValue}
        suggestions={filteredItems}
        completeMethod={searchItems}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}
