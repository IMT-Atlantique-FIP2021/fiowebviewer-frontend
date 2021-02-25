import { Component } from "react";
import { ChevronRight, ChevronDown } from "react-feather";

export default function TestingComponent() {
    return (
        <div className="mt-5">
            <div className="container mx-auto px-5">
                <div className="flex flex-row space-x-5">
                    {/* <Table className="w-full flex-auto" tableName="Menu 1" tableLines={TableMenu1Lines()}/> */}
                    <Table className="w-full flex-auto" tableHeader={<TableHeader1/>}>
                        <Table tableName="Sous Menu1" subMenu={true} tableHeader={<TableHeader1/>}>LINE1</Table>
                        <Table tableName="Sous Menu2" subMenu={true} tableHeader={<TableHeader1/>}>LINE2</Table>
                    </Table>
                </div>
            </div>
        </div>
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
        const classTableHeader = (this.props.subMenu ? "bg-green-500" : "bg-red-500") + "w-full";
        
        return (
            <div className="flex flex-col">
                <div className={classTableHeader} >
                    <TableHeader tableHeader={this.props.tableHeader} isReduced={this.state.isReduced} callbackHandler={this.onVisibilityChange} />
                </div>
                {
                    !this.state.isReduced && 
                    <div className="bg-blue-500 w-full">
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
                <div className="flex">
                <button onClick={this.onClickHandler} className={btnClass}>
                    <ChevronRight/>
                </button>
                {this.props.tableHeader}
                </div>
            );
        } else {
            return (
                <div className="flex">
                    <button onClick={this.onClickHandler} className={btnClass}>
                        <ChevronDown/>
                        {this.props.tableHeader}
                    </button>
                </div>
            );
        }

    }
}


function TableHeader1(props) {
    return(
        <div>{props.title || "Default Header"}</div>
    );
}


class TableLine extends Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this)
    }

    onClickHandler() {
        this.setState({ isReduced: !this.state.isReduced });
    }

    render() {
        const btnClass = "align-bottom";
        const isReduced = this.props.isReduced;

        if (isReduced) {
            return (
                <div>
                <button onClick={this.onClickHandler} className={btnClass}>
                    <ChevronRight/>
                </button>
                {this.props.lineName}
                </div>
            );
        } else {
            return (
                <div>
                <button onClick={this.onClickHandler} className={btnClass}>
                    <ChevronDown/>
                </button>
                {this.props.lineName}
                </div>
            );
        }

        
    }
}

