import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";
import request from "../../utils/request";
import { useNavigate } from "react-router-dom";

interface Items {
  title: string;
  id: string;
}

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [suggestionItems, setSuggestionItems] = useState<String[]>();
  const [informationItems, setInformationItems] = useState<Items[]>([]);
  const [countDown, setCountDown] = useState({ value: 0 });

  useEffect(() => {
    if (!countDown.value) return;

    const timeId = setTimeout(() => {
      request("/course/search", "GET", { name: searchValue }).then((ret) => {
        if (ret) {
          const items = ret.map(
            (item: any, index: any) => item.title + "#" + index
          );
          setInformationItems(ret);
          setSuggestionItems(items);
        }
      });
    }, countDown.value);

    return () => clearTimeout(timeId);
  }, [countDown]);

  function searchItems(event: { query: string }) {
    const name = event.query;
    setSearchValue(name);
    let count = { value: 3000 };
    setCountDown({ ...count });
  }

  return (
    <AutoComplete
      placeholder="Type a course name"
      style={{ justifyContent: "center" }}
      value={searchValue}
      suggestions={suggestionItems}
      completeMethod={searchItems}
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
      onSelect={(e) => {
        const index = e.value.split("#")[1];
        const details = informationItems[index];
        return navigate(`/course-details/${details?.id}`);
      }}
    />
  );
}
