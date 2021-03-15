import { Component, FC, PureComponent, ReactNode } from "react";
import { ChevronRight, ChevronDown } from "react-feather";
import { LabelList,LineChart,ReferenceLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, YAxisProps, Label } from 'recharts';
import testData from "../assets/testList.json"
import testClatPercentile from "../assets/testClatPercentileList.json"
import testLatencyPercentile from "../assets/testLatencyPercentileList.json"

var randomColor = require('randomcolor');
//Function wich implements the graphical interface for the details on a specific test
export default function ResultSummary() {
    return (
        <div className="px-5 py-3">
            <div className="container mx-auto px-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-5">
                    <div className="space-y-5">
                        <Table tableName="FIO Test Name">
                            <Table tableName="FIO user args" subMenu>{TableTestNameUserArgsValue()}</Table>
                            <Table tableName="Output" subMenu>{TableTestNameOutputValue()}</Table>
                            <Table tableName="CSV" subMenu>{TableTestCsvValue()}</Table>
                        </Table>

                        <Table tableName="READ">
                            <Table tableName="Overview" subMenu>{TableTestNameOutputValue()}</Table>
                            <Table tableName="Clat Percentiles" subMenu>
                            <Graph testList={ClatPercentileList} data={testClatPercentile} xDatakey="clatpercentile" title="" xLabel="%" yLabel="ms" valueOnGraph={true}/>
                            </Table>
                        </Table>

                        <Table tableName="WRITE">
                            <Table tableName="Overview" subMenu>{TableTestNameOutputValue()}</Table>
                            <Table tableName="Clat Percentiles" subMenu>
                            <Graph testList={ClatPercentileList} data={testClatPercentile} xDatakey="clatpercentile" title="" xLabel="%" yLabel="ms" valueOnGraph={true}/>
                            </Table>
                        </Table>

                        <Table tableName="IO Depth">
                            TABLE CONTENT IO DEPTH
                        </Table>

                        <Table tableName="Latency">
                        <Graph testList={LatencyPercentileList} data={testLatencyPercentile.filter(dataElement => dataElement.value!=0)} xDatakey="latencypercentile" title="" xLabel="%" yLabel="ms" valueOnGraph={true}/>
                        </Table>

                        <Table tableName="CPU">
                            TABLE CONTENT CPU
                        </Table>
                    </div>
                    <div className="space-y-5 py-5 lg:py-0">
                        <Table tableName="Jobs" open >
                            <TableJobs />
                        </Table>
                    </div>
                </div>

            </div>
        </div >
    );
}


//Tables are menus shown as opening cells in the interface
type TableProps = {
    subMenu?: boolean,
    tableName: string,
    open?: boolean,
}

class Table extends Component<TableProps> {
    state: { isOpen: boolean };
    subMenu: boolean;
    tableName: string;

    constructor(props: TableProps) {
        super(props);
        this.onVisibilityChange = this.onVisibilityChange.bind(this);
        this.subMenu = props.subMenu || false;
        this.state = { isOpen: props.open || false };
        this.tableName = this.props.tableName || "";

    }

    onVisibilityChange() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        if (!this.subMenu) {  // FIXME
            return (
                <div className="flex-none rounded shadow-lg bg-white ">
                    <div className="bg-blue-ovh-light h-1 rounded-t" />
                    <div className="font-bold py-3 border-b">
                        {TableHeader(this.tableName, this.state.isOpen, this.onVisibilityChange)}
                    </div>
                    {
                        this.state.isOpen &&
                        <div>
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
                        {TableHeader(this.tableName, this.state.isOpen, this.onVisibilityChange)}
                    </div>
                    {
                        this.state.isOpen &&
                        <div>
                            {this.props.children}
                        </div>
                    }
                </div>
            )
    }
}

function TableHeader(tableName: string, isOpen: boolean, callbackHandler: any) {
    return (
        <div className="flex px-5">
            <button onClick={callbackHandler} className="align-bottom">
                {isOpen ? <ChevronDown /> : <ChevronRight />}
            </button>
            {tableName}
        </div>
    )
}


function TableTestNameUserArgsValue() {
    return (
        <div className="px-5 text-xs">
            ./fio-webviewer.sh --webviewer-tag FIO-READ-WRITE --webviewer-name FIO-TESTRW --name=randwrite --iodepth=1 --rw=randwrite --bs=4k --direct=0 --size=512M --numjobs=2 --runtime=240 --output=~/fioviewer/test.txt
        </div>
    );
}


function TableTestNameOutputValue() {
    return (
        <div flex-none className="px-5 text-xs ">
            randread: (g=0): rw=randread, bs=(R) 4096B-4096B, (W) 4096B-4096B, (T) 4096B-4096B, ioengine=psync, iodepth=16
            ...
            fio-3.8
            Starting 4 processes
            randread: Laying out IO file (1 file / 512MiB)
            randread: Laying out IO file (1 file / 512MiB)
            randread: Laying out IO file (1 file / 512MiB)
            randread: Laying out IO file (1 file / 512MiB)

        </div>
    );
}

function TableTestCsvValue() {
    return (
        <div flex-none className="px-5 text-s  text-blue-ovh-light underline hover:text-blue-ovh-dark ">
            <a href="https://guigui.io/" >Download all as tar.gz</a>
        </div>
    );
}

//Function which limits the colors used in the graph lines
function RandomColor() {
    return randomColor({
        luminosity: 'bright',
        hue: 'random',
    })
}


//Array in which the colors, names, and activation of the jobs are stored
type testListType = {
    id: string
    color: string,
    activated: boolean
}
const testList: testListType[] = [
    { id: "average", color: RandomColor(), activated: true },
    { id: "uv", color: RandomColor(), activated: true },
    { id: "pv", color: RandomColor(), activated: true },
    { id: "amt", color: RandomColor(), activated: true }
];

const ClatPercentileList: testListType[] = [
    { id: "value", color: "blue", activated: true }
];

const LatencyPercentileList: testListType[] = [
    { id: "value", color: "blue", activated: true }
];


//Define the Table Jobs Content
class TableJobs extends Component {
    state: {
        data: unknown[],
        activatedValue: testListType[],
    }

    constructor(props: any) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return { data: testData, activatedValue: testList };
    }

    handleOnChange(id: string) {
        let newActivatedValue: testListType[] = this.state.activatedValue;
        newActivatedValue.filter((obj) => (obj.id === id)).map((obj) => (obj.activated = !obj.activated))
        this.setState({ ...this.state, activatedValue: newActivatedValue })
    }

    render() {
        return (
            <div className="grid grid-cols-4 auto-layout">
                <div className="col-span-1 border-r-2 p-2">

                    {this.state.activatedValue.map((test) => {
                        const id_input = "RE_TestResult_Cb_" + test.id;
                        return (
                            <div>
                                <input id={test.id} checked={test.activated} type="checkbox" className="rounded ml-2 mr-2" onChange={this.handleOnChange.bind(this, test.id)} />
                                <label style={{color: test.color}} htmlFor={test.id}>{test.id}</label>
                            </div>
                        );
                    })
                    }
                </div>
                <div className="col-span-3">
                    <Graph testList={this.state.activatedValue} data={this.state.data} tickCount={10} xType="number" xDatakey="name" title="bw" xLabel="t[s]" yLabel="MB/s" />
                    <Graph testList={this.state.activatedValue} data={this.state.data} tickCount={10} xType="number" xDatakey="name" title="iops" xLabel="t[s]" yLabel="iops" />
                    <Graph testList={this.state.activatedValue} data={this.state.data} tickCount={10} xType="number" xDatakey="name" title="lat" xLabel="t[s]" yLabel="ms" />
                    <Graph testList={this.state.activatedValue} data={this.state.data} tickCount={10} xType="number" xDatakey="name" title="slat" xLabel="t[s]" yLabel="ms" />
                    <Graph testList={this.state.activatedValue} data={this.state.data} tickCount={10} xType="number" xDatakey="name" title="clat" xLabel="t[s]" yLabel="ms" />
                </div>
            </div>
        );
    }

}


//Graph defines the different graphs in the Result details interface
type GraphProps = {
    title: string;
    xLabel: YAxisProps["label"];
    yLabel: YAxisProps["label"];
    xDatakey: string;
    data: any;          // FIXME
    testList: any;      // FIXME
    valueOnGraph?: boolean;
    tickCount?: number;
    xType? : any;
    //domainMax: number;
}

function Graph(props: GraphProps) {
    var valueOnGraph = props.valueOnGraph || false;
    return (
        <div className="h-60 p-5" >
            <div className="text-lg text-center">
                {props.title}
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={props.data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 10,
                        bottom: 35,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"  />
                    <XAxis dataKey={props.xDatakey} type={props.xType || "category"} tickCount={props.tickCount || 0} allowDecimals={true} label={{ value: props.xLabel , position: 'bottom' }} />
                    <YAxis label={{ value: props.yLabel, angle: -90, position: 'left' }} />
                    <Tooltip />
                    {props.testList.map((testName: any) => {
                        if (testName.activated) {
                            return (
                                <Line type="linear" dataKey={testName.id} stroke={testName.color} activeDot={{ r: 5 }}>
                                {valueOnGraph? <LabelList dataKey={testName.id} position="top" offset={10} className="text-sm"/> : ""}
                                </Line>);
                        }
                    })}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
