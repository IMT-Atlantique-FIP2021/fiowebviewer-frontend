import { Tag } from "react-feather";

type TagProps = {
  key: string;
  text: string;
};

function ResultTag(props: TagProps) {
  return (
    <div className="flex flex-row flex-none bg-gray-300 rounded-full px-2 my-1 items-center">
      <Tag className="w-4 pr-1" />
      <div className="font-bold text-black text-xs">{props.text}</div>
    </div>
  );
}

export default ResultTag;