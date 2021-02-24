import { ReactNode } from "react";
import ResultListTest from "../assets/resultList.json";
import ResultExplorer from "./ResultExplorer";

export default function Content() {
    return (
        <div id="CONTENT" className="my-8 flex flex-col space-y-5">
            <ContentElement
                title="Result Explorer"
                contentChildren={<ResultExplorer results={ResultListTest} />}
            />
        </div>
    );
}

type ContentElementProps = {
    title: string;
    contentChildren: ReactNode;
};

function ContentElement(props: ContentElementProps) {
    return (
        <div className="container mx-auto px-5">
            <div className="rounded shadow-lg bg-white">
                <div className="bg-blue-ovh-light h-1 rounded-t" />
                <div className="px-5 py-3 border-b">
                    <div className="text-xl">{props.title}</div>
                </div>
                <div className="pb-10">{props.contentChildren}</div>
            </div>
        </div>
    );
}
