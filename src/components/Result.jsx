import ResultListTest from "../assets/resultList.json";
import ResultExplorer from './ResultExplorer'
import { Component } from "react";
import { ChevronRight, ChevronDown } from "react-feather";
import { isConstructorTypeNode } from "typescript";

export default function Result() {
    return (
        <div className="mt-5">
            <div className="container mx-auto px-5">
                <div className="flex flex-row space-x-5">
                    <TableTestname />
                    <TableTestname />
                </div>
            </div>
        </div>
    );
}

// function TableTestname() {
//     if(ChevronToggle.isOpen)
//         return (
//         <table className="shadow-md bg-white flex-auto ">
//             <TableTestnameHeader />
//             <TableTestnameUserArgs />
//         </table> 
//         )

//     else
//         return (
//         <table className="shadow-md bg-white flex-auto ">
//             <TableTestnameHeader />
//         </table>
//     )
// }

class TableTestname extends Component {
    constructor(props) {
        super(props);
        this.dropdownTableHandler = this.dropdownTableHandler.bind(this);
        this.state = { isOpen: false };
    }

    dropdownTableHandler() {
        const previousIsOpen = this.state.isOpen;
        console.log("CLICK IN TABLE");
        this.setState({ isOpen: !previousIsOpen });
    }

    render() {
        const dropdownState = { 
            isOpen: this.state.isOpen, 
            onClickHandler: this.dropdownTableHandler
        }

        return (
            <table className="shadow-md bg-white flex-auto">
                <TableTestnameHeader dropdownState={dropdownState} />
                { this.state.isOpen && <TableTestnameUserArgs /> }
            </table> 
        )
    }
}

function TableTestnameHeader(props) {
    return (
        <tr className="bg-green-600 text-white text-left border">
            <th className="text-center">
                <ChevronToggle dropdownState={props.dropdownState} />
            </th>
            <th className="py-4 px-4 w-64">Job Name</th>
            <th className="py-4 px-4">Tags</th>
        </tr>
    )
}

function TableTestnameUserArgs() {
    return (
        <tr className="bg-white-600 text-black text-left border">
            <th className="text-center"><ChevronToggle />
            </th>
            <th className="py-4 px-4 w-64">Job Name</th>
            <th className="py-4 px-4">Tags</th>
        </tr>
    )
}



function TableJobs() {
    return (
        <table className="shadow-md bg-white flex-auto ">
            <TableJobsHeader />
        </table>
    )
}

function TableJobsHeader() {
    return (
        <tr className="bg-green-600 text-white text-left border">
            <th className="w-10 text-center">
                <input type="checkbox" className="h-4 w-4" />
            </th>
            <th className="py-4 px-4 w-64">JOBS</th>
        </tr>
    );
}


// function ChevronToggle(props) {
//     const btnClass = "p-2 text-white opacity-80 hover:opacity-100 focus:outline-none";
//     if (props.dropdownState.isOpen) {
//         return (
//             <button onClick={props.dropdownState.onClickHandler} className={btnClass}>
//                 <ChevronDown/>
//             </button>
//         );
//     } else {
//         return (
//             <button onClick={props.onClick} className={btnClass}>
//                 <ChevronRight/>
//             </button>
//         );
//     }
// }

// <ChevronToggle dropdownState={...} />
// dropdownState = { isOpen, dropdownTableHandler }
class ChevronToggle extends Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this)
    }

    onClickHandler() {
        console.log("CLICK ON BUTTO");
        this.props.dropdownState.dropdownTableHandler();
    }

    render() {
        const btnClass = "p-2 text-white opacity-80 hover:opacity-100 focus:outline-none";
        const isToggled = this.props.dropdownState.isOpen

        if (isToggled) {
            return (
                <button onClick={this.onClickHandler} className={btnClass}>
                    <ChevronDown/>
                </button>
            );
        } else {
            return (
                <button onClick={this.onClickHandler} className={btnClass}>
                    <ChevronRight/>
                </button>
            );
        }
    }
}