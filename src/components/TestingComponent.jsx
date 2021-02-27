import { Component } from "react";
import { ChevronRight, ChevronDown } from "react-feather";

export default function TestingComponent() {
    return (
        <div className="mt-5">
            <div className="container mx-auto px-5">
                <div className="flex flew-row space-x-5">
                    <div className="flex-auto space-y-5">

                        <Table tableHeader={<TableTestName />}>
                            <Table tableName="Sous Menu1" subMenu={true} tableHeader={<TableTestNameUserArgs />}>{TableTestNameUserArgsValue()}</Table>
                            <Table tableName="Sous Menu2" subMenu={true} tableHeader={<TableTestName />}>LINE2</Table>
                            <Table tableName="Sous Menu2" subMenu={true} tableHeader={<TableTestName />}>LINE3</Table>
                        </Table>

                        <Table tableHeader={<TableTestName />}></Table>

                    </div>
                    <div className="flex-auto">

                        <Table tableHeader={<TableJobsName />}>
                            <div>
                                BIG GRAPH
                            </div>
                        </Table>
                    </div>
                </div>

            </div>
        </div >
    );
}

class Table extends Component {
    constructor(props) {
        super(props);
        this.onVisibilityChange = this.onVisibilityChange.bind(this)
        this.state = { isReduced: true }
    }

    onVisibilityChange() {
        this.setState({ isReduced: !this.state.isReduced });
    }

    render() {
        const subMenu = this.props.subMenu

        if (!subMenu) {
            return (

                <div className="rounded shadow-lg bg-white">
                    <div className="bg-blue-ovh-light h-1 rounded-t" />
                    <div className="font-bold py-3 border-b">
                        <TableHeader tableHeader={this.props.tableHeader} isReduced={this.state.isReduced} callbackHandler={this.onVisibilityChange} />
                    </div>
                    {
                        !this.state.isReduced &&
                        <div className=" w-full">
                            {this.props.children}
                        </div>
                    }
                </div>
            )
        }
        else
            return (

                <div className="py-1 border-b">
                    <div>
                        <TableHeader tableHeader={this.props.tableHeader} isReduced={this.state.isReduced} callbackHandler={this.onVisibilityChange} />
                    </div>
                    {
                        !this.state.isReduced &&
                        <div className="">
                            {this.props.children}
                        </div>
                    }
                </div>
            )
    }
}

class TableHeader extends Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this)
    }

    onClickHandler() {
        this.props.callbackHandler();
    }

    render() {
        const btnClass = "align-bottom";
        const isReduced = this.props.isReduced;

        if (isReduced) {
            return (
                <div className="flex px-5">
                    <button onClick={this.onClickHandler} className={btnClass}>
                        <ChevronRight />
                    </button>
                    {this.props.tableHeader}
                </div>
            );
        } else {
            return (
                <div className="flex px-5">
                    <button onClick={this.onClickHandler} className={btnClass}>
                        <ChevronDown />
                    </button>
                    {this.props.tableHeader}
                </div>
            );
        }

    }
}


function TableTestName(props) {
    return (
        <div>{props.title || "Default Header"}</div>
    );
}

function TableTestNameUserArgs(props) {
    return (
        <div>{props.title || "User Args"}</div>
    );
}

function TableTestNameUserArgsValue() {
    return (
        <div className="px-5 text-xs">
            ./fio-webviewer.sh --webviewer-tag FIO-READ-WRITE --webviewer-name FIO-TESTRW --name=randwrite --iodepth=1 --rw=randwrite --bs=4k --direct=0 --size=512M --numjobs=2 --runtime=240 --output=~/fioviewer/test.txt
        </div>
    );
}

function TableJobsName(props) {
    return (
        <div>{props.title || "Jobs"}</div>
    );
}