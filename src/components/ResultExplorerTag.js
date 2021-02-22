import { Tag } from "react-feather";

function ResultExplorerTag(props) {
  return (
    <div class="flex flex-row flex-none bg-gray-300 rounded-full px-2 my-1 items-center">
      <Tag className="w-4 pr-1" />
      <div class="font-bold text-black text-xs">{ props.text }</div>
    </div>
  );
}

export default ResultExplorerTag;
