import { ReactNode } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import ResultTable from "./ResultTable";
import ResultExplorer from "./ResultExplorer";
import ResultCompare from "./ResultCompare";
import ResultDelete from "./ResultDelete";

export default function Content() {
    let query = useQuery();

    return (
        <div id="CONTENT" className="my-8 flex flex-col space-y-5">
            <Switch>
                <Route path="/result">
                    <ResultExplorer />
                </Route>

                <Route path="/compare">
                    <ContentElement
                        title={
                            "Compare " + query.getAll("id").join(" & ") ||
                            "Unkown result"
                        }
                    >
                        <ResultCompare />
                    </ContentElement>
                </Route>

                <Route path="/delete">
                    <ContentElement
                        title={
                            "Delete " + query.getAll("id").join(" & ") ||
                            "Unkown result"
                        }
                    >
                        <ResultDelete />
                    </ContentElement>
                </Route>

                <Route path="/">
                    <ContentElement title="Result Table">
                        <ResultTable />
                    </ContentElement>
                </Route>
            </Switch>
        </div>
    );
}

type ContentElementProps = {
    title: string;
    children: ReactNode;
};

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ContentElement(props: ContentElementProps) {
    return (
        <div className="container mx-auto px-5">
            <div className="rounded shadow-lg bg-white">
                <div className="bg-blue-ovh-light h-1 rounded-t" />
                <div className="px-5 py-3 border-b">
                    <div className="text-xl">{props.title}</div>
                </div>
                <div>{props.children}</div>
            </div>
        </div>
    );
}
