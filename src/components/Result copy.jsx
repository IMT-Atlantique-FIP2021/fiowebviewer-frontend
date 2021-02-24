import ResultListTest from "../assets/resultList.json";
import ResultExplorer from './ResultExplorer'
import { Component } from "react";
import { ChevronRight, ChevronDown } from "react-feather";
import { isConstructorTypeNode } from "typescript";

export default function TestingComponent() {
    return (
        <div className="mt-5">
            <div className="container mx-auto px-5">
                <div className="flex flex-row space-x-5">
                    <TableTestname />
                </div>
            </div>
        </div>
    );
}

