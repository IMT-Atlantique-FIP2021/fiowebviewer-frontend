import { Component } from "react";
import { Tag, XCircle, PlusCircle, Loader } from "react-feather";
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
        isFetching: boolean;
        results: ResultState[];
    };
    // timer: NodeJS.Timeout | null;

    constructor(props: any) {
        super(props);
        this.fetchResults = this.fetchResults.bind(this);
        this.state = {
            isFetching: false,
            results: [],
        };
        // this.timer = null;
    }

    fetchResults() {
        if (this.state.isFetching) return;

        this.setState({ ...this.state, isFetching: true });
        fetch("/results")
            .then((response) => response.json())
            .catch((e) => {
                console.log(e);
                this.setState({ ...this.state, isFetching: false });
                return ResultListExamples;
            })
            .then((resultList: ResultType[]) =>
                resultList.map((r: ResultType) => ({ ...r, selected: false }))
            )
            .then((resultList: ResultState[]) => {
                this.setState({ results: resultList, isFetching: false });
            });
    }

    componentDidMount() {
        this.fetchResults();
        // this.timer = setInterval(() => this.fetchResults(), 1000);
    }

    // componentWillUnmount() {
    //     if (this.timer) {
    //         clearInterval(this.timer);
    //         this.timer = null;
    //     }
    // }

    isAllSelected() {
        return (
            this.state.results.filter((r) => r.selected).length ===
                this.state.results.length && this.state.results.length !== 0
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
                {tableFooter(selectedResult, _.isEmpty(tableLines))}
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

function TableLoadingLine() {
    return (
        <div className="flex flex-row justify-center p-4 animate-pulse">
            <Loader className="animate-spin mr-4" />
            <div className="select-none">Fetching results...</div>
        </div>
    );
}

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
                {tags.map((tag) => createTagBadge(tag))}
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

function tableFooter(selectedResult: string[], isEmpty: boolean) {
    if (!isEmpty) {
        return (
            <div className="flex justify-center p-4 space-x-44">
                {TableCompareButton(selectedResult)}
                {TableDeleteButton(selectedResult, () =>
                    console.log("Clicked!")
                )}
            </div>
        );
    } else {
        return (
            <div className="flex justify-center p-4">
                <TableLoadingLine />
            </div>
        );
    }
}

// TODO: Factorize TableButton
function TableCompareButton(selectedResults: string[]) {
    const queryParams = "?".concat(
        selectedResults.map((r) => "id=" + r).join("&")
    );

    return (
        <div className="flex justify-center p-4">
            <Link
                to={{
                    pathname: "/compare",
                    search: queryParams,
                }}
            >
                <button
                    {...{ disabled: selectedResults.length <= 1 }}
                    className="disabled:opacity-50 disabled:bg-gray-400 bg-blue-ovh-light hover:opacity-100 opacity-80 p-2 w-64 font-semibold border rounded text-white"
                >
                    Compare {selectedResults.length} result
                    {selectedResults.length > 1 ? "s" : ""}
                </button>
            </Link>
        </div>
    );
}

// TODO: Factorize TableButton
function TableDeleteButton(selectedResults: string[], onClick: () => void) {
    const queryParams = "?".concat(
        selectedResults.map((r) => "id=" + r).join("&")
    );

    return (
        <div className="flex justify-center p-4">
            <Link
                to={{
                    pathname: "/delete",
                    search: queryParams,
                }}
            >
                <button
                    {...{ disabled: selectedResults.length <= 1 }}
                    onClick={onClick}
                    className="disabled:opacity-50 disabled:bg-gray-400 bg-red-500 hover:opacity-100 opacity-80 p-2 w-64 font-semibold border rounded text-white"
                >
                    Delete {selectedResults.length} result
                    {selectedResults.length > 1 ? "s" : ""}
                </button>
            </Link>
        </div>
    );
}
