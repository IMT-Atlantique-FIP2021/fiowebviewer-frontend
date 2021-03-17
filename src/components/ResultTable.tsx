import { Component } from "react";
import { Link } from "react-router-dom";
import { Tag, XCircle, PlusCircle, Loader, Coffee } from "react-feather";

interface Result {
    id: string;
    name: string;
    tags: string[];
    submitted_at: string;
}

interface ResultState extends Result {
    selected: boolean;
}

export default class Table extends Component {
    state: {
        loading: boolean;
        fetching: boolean;
        results: ResultState[];
    };
    timer: NodeJS.Timeout | null;

    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            fetching: false,
            results: [],
        };
        this.timer = null;
    }

    getCurrentResultSelectedState(id: string) {
        return (
            this.state.results.filter((sr) => sr.id === id)[0]?.selected ||
            false
        );
    }

    async fetchResults() {
        if (this.state.fetching) return;
        else this.setState({ ...this.state, isFetching: true });

        const get_result_list_url = "/api/result/";
        const response = await fetch(get_result_list_url);
        const data = await response.json();

        const results: ResultState[] = data.map((r: any) => ({
            id: r.id,
            name: r.name,
            tags: r.tags,
            submitted_at: r.time,
            selected: this.getCurrentResultSelectedState(r.id),
        }));

        this.setState({ loading: false, isFetching: false, results: results });
    }

    async componentDidMount() {
        await this.fetchResults();
        this.timer = setInterval(() => this.fetchResults(), 1000);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    isAllSelected() {
        return (
            this.state.results.filter((r) => r.selected).length ===
                this.state.results.length && this.state.results.length !== 0
        );
    }

    selectedResult() {
        return this.state.results.filter((r) => r.selected).map((r) => r.id);
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

    async handleOnDeleteClick(id: string) {
        const delete_result_url = "/api/result/" + id;
        await fetch(delete_result_url, { method: "DELETE" });
        this.fetchResults();
    }

    render() {
        const results = this.state.results;
        return (
            <div>
                <table className="table-fixed w-full">
                    {TableHeader({
                        checked: this.isAllSelected(),
                        onChange: this.handleOnCheckbox_SelectAll.bind(this),
                    })}
                    <tbody>
                        {results.map((r) => (
                            <TableLine
                                key={r.id}
                                result={r}
                                checkbox={{
                                    checked: r.selected,
                                    onChange: this.handleOnCheckbox_Select.bind(
                                        this,
                                        r.id
                                    ),
                                }}
                                actions={{
                                    onDeleteClick: this.handleOnDeleteClick.bind(
                                        this,
                                        r.id
                                    ),
                                }}
                            />
                        ))}
                    </tbody>
                </table>
                {TableContent(
                    this.state.loading,
                    this.state.results,
                    this.selectedResult()
                )}
            </div>
        );
    }
}

function TableContent(
    loading: boolean,
    results: ResultState[],
    selectedResult: string[]
) {
    if (loading) {
        // Currently fetching results
        return (
            <div className="flex flex-row justify-center p-4 animate-pulse">
                <Loader className="animate-spin mr-4" />
                <div className="select-none">Fetching results...</div>
            </div>
        );
    }

    if (results.length === 0) {
        // Currently no result to show
        return (
            <div className="flex flex-row justify-center p-4 opacity-70">
                <Coffee className="mr-4" />
                <div className="select-none">No result available...</div>
            </div>
        );
    }

    if (results) {
        // Currently with results
        return (
            <div className="flex justify-evenly p-4">
                {TableCompareButton(selectedResult)}
                {TableDeleteButton(selectedResult)}
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
    result: Result;
    checkbox: CheckboxProps;
    actions: ActionProps;
};

function TableLine(props: TableLineProps) {
    return (
        <tr className="border-b odd:bg-gray-100">
            {TableColumnCheckbox(props.result.id, props.checkbox)}
            {TableColumnJobname(props.result.name, props.result.id)}
            {TableColumnTags(props.result.tags)}
            {TableColumnSubmittedat(props.result.submitted_at)}
            {TableColumnActions(props.actions)}
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

type ActionProps = {
    onDeleteClick: () => void;
};

function TableColumnActions(props: ActionProps) {
    return (
        <td className="px-4">
            <div className="flex flex-row justify-start space-x-1">
                <button onClick={props.onDeleteClick}>
                    <XCircle size={20} className="text-red-500" />
                </button>
                <button>
                    <PlusCircle size={20} className="text-blue-500" />
                </button>
            </div>
        </td>
    );
}

function TableCompareButton(selectedResults: string[]) {
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
                className="disabled:opacity-50 disabled:bg-gray-400 bg-blue-ovh-light hover:opacity-100 opacity-80 p-2 w-64 font-semibold border rounded text-white"
            >
                Compare {selectedResults.length} result
                {selectedResults.length > 1 ? "s" : ""}
            </button>
        </Link>
    );
}

function TableDeleteButton(selectedResults: string[]) {
    const queryParams = "?".concat(
        selectedResults.map((r) => "id=" + r).join("&")
    );

    return (
        <Link
            to={{
                pathname: "/delete",
                search: queryParams,
            }}
        >
            <button
                {...{ disabled: selectedResults.length <= 0 }}
                className="disabled:opacity-50 disabled:bg-gray-400 bg-red-600 hover:opacity-100 opacity-80 p-2 w-64 font-semibold border rounded text-white"
            >
                Delete {selectedResults.length} result
                {selectedResults.length > 1 ? "s" : ""}
            </button>
        </Link>
    );
}
