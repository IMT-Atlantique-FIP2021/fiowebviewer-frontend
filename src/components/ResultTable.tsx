import { Component } from "react";
import { Tag, XCircle, PlusCircle } from "react-feather";
import { Link } from "react-router-dom";
import ResultListExamples from "../assets/resultList.json";

var _ = require("lodash");

interface ResultType {
    id: string;
    name: string;
    tags: string[];
    submitted_at: string;
}

interface ResultState extends ResultType {
    selected: boolean;
}

export default class Table extends Component {
    state: {
        results: ResultState[];
    };

    constructor(props: any) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        const resultList: ResultType[] = ResultListExamples || [];
        const resultStateList: ResultState[] = resultList.map((r) => ({
            ...r,
            selected: false,
        }));
        return { results: resultStateList };
    }

    isAllSelected() {
        return (
            this.state.results.filter((r) => r.selected).length ===
            this.state.results.length
        );
    }

    handleOnCheckbox_SelectAll() {
        const newSelectedState = !this.isAllSelected();

        this.setState(
            this.state.results.map((r) => (r.selected = newSelectedState))
        );
    }

    handleOnCheckbox_Select(id: string) {
        const newState = this.state.results
            .filter((r) => r.id === id)
            .map((r) => (r.selected = !r.selected));
        this.setState(newState);
    }

    // TODO: Add empty list visual
    render() {
        const tableHeader = TableHeader({
            checked: this.isAllSelected(),
            onChange: this.handleOnCheckbox_SelectAll.bind(this),
        });

        const tableLines = this.state.results.map((result) => (
            <TableLine
                key={result.id}
                result={result}
                checkbox={{
                    checked: result.selected,
                    onChange: this.handleOnCheckbox_Select.bind(
                        this,
                        result.id
                    ),
                }}
            />
        ));

        const selectedResult = this.state.results
            .filter((r) => r.selected)
            .map((r) => r.id);

        return (
            <div>
                <table className="table-fixed w-full">
                    {tableHeader}
                    <tbody>{tableLines}</tbody>
                </table>
                <div className="flex justify-center p-4">
                    {TableCompareButton(selectedResult, () =>
                        console.log("Clicked!")
                    )}
                </div>
            </div>
        );
    }
}

function TableHeader(checkbox: CheckboxProps) {
    return (
        <thead>
            <tr className="text-left border-b">
                <th className="w-14">
                    <div className="flex content-center justify-center">
                        <input
                            {...checkbox}
                            type="checkbox"
                            className="rounded"
                        />
                    </div>
                </th>
                <th className="py-4 px-4 w-64">Job Name</th>
                <th className="py-4 px-4">Tags</th>
                <th className="py-4 w-32 text-center">Submitted at</th>
                <th className="w-20 text-center"></th>
            </tr>
        </thead>
    );
}

type TableLineProps = {
    result: ResultType;
    checkbox: CheckboxProps;
};

function TableLine(props: TableLineProps) {
    return (
        <tr className="border-b odd:bg-gray-100">
            {TableColumnCheckbox(props.result.id, props.checkbox)}
            {TableColumnJobname(props.result.name, props.result.id)}
            {TableColumnTags(props.result.tags)}
            {TableColumnSubmittedat(props.result.submitted_at)}
            {TableColumnActions()}
        </tr>
    );
}

type CheckboxProps = {
    checked: boolean;
    onChange: () => void;
};

function TableColumnCheckbox(resultId: string, checkbox: CheckboxProps) {
    const formattedProps = {
        ...checkbox,
        id: "checkbox_" + resultId,
    };

    return (
        <td>
            <div className="flex content-center justify-center">
                <input
                    {...formattedProps}
                    type="checkbox"
                    className="rounded"
                />
            </div>
        </td>
    );
}

function TableColumnJobname(name: string, id: string) {
    return (
        <td className="px-4 truncate">
            <Link
                to={{
                    pathname: "/result",
                    search: "?id=" + id,
                }}
                className="text-blue-ovh-light hover:text-blue-ovh-dark underline text-base"
            >
                {name}
            </Link>
        </td>
    );
}

function TableColumnTags(tags: string[]) {
    function createTagBadge(text: string) {
        return (
            <div className="flex flex-row flex-none bg-gray-300 rounded-full px-2 my-1 items-center">
                <Tag size={18} className="pr-1" />
                <div className="text-xs font-semibold">{text}</div>
            </div>
        );
    }

    return (
        <td className="px-4">
            <div className="flex flex-row justify-start space-x-2 overflow-x-auto scrollbar-thin">
                {tags.map((tag, index) => createTagBadge(tag))}
            </div>
        </td>
    );
}

function TableColumnSubmittedat(submitted_at: string) {
    return <td className="px-4 text-xs text-center">{submitted_at}</td>;
}

function TableColumnActions() {
    return (
        <td className="px-4">
            <div className="flex flex-row justify-start space-x-1">
                <button>
                    <XCircle size={20} className="text-red-500" />
                </button>
                <button>
                    <PlusCircle size={20} className="text-blue-500" />
                </button>
            </div>
        </td>
    );
}

function TableCompareButton(selectedResults: string[], onClick: () => void) {
    const queryParams = "?".concat(
        selectedResults.map((r) => "id=" + r).join("&")
    );

    return (
        <Link
            to={{
                pathname: "/compare",
                search: queryParams,
            }}
        >
            <button
                {...{ disabled: selectedResults.length <= 1 }}
                onClick={onClick}
                className="disabled:opacity-50 disabled:bg-gray-400 bg-blue-ovh-light hover:opacity-100 opacity-80 p-2 w-64 font-semibold border rounded text-white"
            >
                Compare {selectedResults.length} result
                {selectedResults.length > 1 ? "s" : ""}
            </button>
        </Link>
    );
}