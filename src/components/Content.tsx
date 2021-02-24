import { ReactNode } from "react";
import ResultListTest from "../assets/resultList.json";
import ResultExplorer from "./ResultExplorer";

export default function Content() {
    const ResultList = (
        <div>
            <ResultExplorer results={ResultListTest} />
        </div>
    );

    return (
        <div id="CONTENT" className="my-8">
            <ContentElement
                title="Result Explorer"
                contentChildren={ResultList}
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
                <div className="bg-custom-ovh-sec-light h-1 rounded-t"/>
                <div className="px-5 py-3 border-b">
                    <div className="text-xl">{props.title}</div>
                </div>
                {props.contentChildren}
            </div>
        </div>
    );
}

// function ElementHeader(params:any) {
//     return (

//     );
// }
