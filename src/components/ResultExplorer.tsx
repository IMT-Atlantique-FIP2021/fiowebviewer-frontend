import { Component } from "react";
import { ChevronRight, ChevronDown, Loader } from "react-feather";
import {
    LabelList,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    YAxisProps,
} from "recharts";
import testData from "../assets/testList.json";

type ResultSummaryType = { resultID: string }

var randomColor = require("randomcolor");
//Function wich implements the graphical interface for the details on a specific test
export default class ResultSummary extends Component<ResultSummaryType> {
    resultID: string;
    state: {
        fetching: boolean
        data: any
    }

    constructor(props: ResultSummaryType) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.resultID = props.resultID;
        this.state = { data: null, fetching: true }
    }

    async componentDidMount() {
        this.fetchData()
    }

    async fetchData() {
        const result_data_url = "/api/result/byId/";
        const response = await fetch(result_data_url + this.resultID);
        const data = await response.json();

        this.setState({ data: data, fetching: false })
    }

    render() {
        if (this.state.fetching) return (
            <div className="flex flex-row justify-center p-4 animate-pulse">
                <Loader className="animate-spin mr-4" />
                <div className="select-none">Fetching result {this.resultID}...</div>
            </div>
        )

        return (
            <div className="px-5 py-3">
                <div className="container mx-auto px-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-5">
                        <div className="space-y-5">
                            <Table tableName={"RESULT\: "+this.state.data["name"]} open>
                                <Table tableName="FIO user args" subMenu >
                                    {TableTestNameUserArgsValue()}
                                </Table>
                                <Table tableName="Output" subMenu >
                                    {GetDataTestOutput(this.state.data)}
                                </Table>
                                <Table tableName="CSV" subMenu >
                                    {TableTestCsvValue()}
                                </Table>
                            </Table>

                            <Table tableName="READ" open>
                                <Table tableName="OVERVIEW" subMenu >
                                    {TableRWOverview(this.state.data, "read")}
                                </Table>
                                <Table
                                    tableName="COMPLETION LATENCY PERCENTILE"
                                    subMenu
                                    open
                                >
                                    <Graph
                                        testList={ClatPercentileList}
                                        data={GetDataClatPercentile(
                                            this.state.data,
                                            "read"
                                        )}
                                        xDatakey="clat_percentile"
                                        xLabel="%"
                                        yLabel="ms"
                                        valueOnGraph={true}
                                    />
                                </Table>
                            </Table>

                            <Table tableName="WRITE" open>
                                <Table tableName="OVERVIEW" subMenu >
                                    {TableRWOverview(this.state.data, "write")}
                                </Table>
                                <Table
                                    tableName="COMPLETION LATENCY PERCENTILE"
                                    subMenu
                                    open
                                >
                                    <Graph
                                        testList={ClatPercentileList}
                                        data={GetDataClatPercentile(
                                            this.state.data,
                                            "write"
                                        )}
                                        xDatakey="clat_percentile"
                                        xLabel="%"
                                        yLabel="ms"
                                        valueOnGraph={true}
                                    />
                                </Table>
                            </Table>

                            <Table tableName="TRIM" open>
                                <Table tableName="OVERVIEW" subMenu >
                                    {TableRWOverview(this.state.data, "trim")}
                                </Table>
                                <Table
                                    tableName="COMPLETION LATENCY PERCENTILE"
                                    subMenu
                                    open
                                >
                                    <Graph
                                        testList={ClatPercentileList}
                                        data={GetDataClatPercentile(
                                            this.state.data,
                                            "trim"
                                        )}
                                        xDatakey="clat_percentile"
                                        xLabel="%"
                                        yLabel="ms"
                                        valueOnGraph={true}
                                    />
                                </Table>
                            </Table>

                            <Table tableName="IO DEPTH" open>
                                <Graph
                                    testList={IODepthList}
                                    data={GetDataIODepth(
                                        this.state.data
                                    ).filter(
                                        (dataElement) => dataElement.value != 0
                                    )}
                                    xDatakey="io_depth"
                                    xLabel="Depth Level"
                                    yLabel="%"
                                    valueOnGraph={true}
                                />
                            </Table>

                            <Table tableName="LATENCY" open>
                                <Graph
                                    testList={LatencyPercentileList}
                                    data={GetDataLatency(
                                        this.state.data
                                    ).filter(
                                        (dataElement) => dataElement.value != 0
                                    )}
                                    xDatakey="latency"
                                    xLabel="ms"
                                    yLabel="%"
                                    valueOnGraph={true}
                                />
                            </Table>

                            <Table tableName="CPU" open>
                                {TableCPU(this.state.data)}
                            </Table>
                        </div>
                        <div className="space-y-5 py-5 lg:py-0">
                            <Table tableName="Jobs" open >
                                <TableJobs />
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//Tables are menus shown as opening cells in the interface
type TableProps = {
    subMenu?: boolean;
    tableName: string;
    open?: boolean;
};

class Table extends Component<TableProps> {
    state: { isOpen: boolean };
    subMenu: boolean;
    tableName: string;

    constructor(props: TableProps) {
        super(props);
        this.onVisibilityChange = this.onVisibilityChange.bind(this);
        this.subMenu = props.subMenu || false;
        this.state = { isOpen: props.open || false };
        this.tableName = props.tableName || "";
    }

    onVisibilityChange() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        if (!this.subMenu) {
            // FIXME
            return (
                <div className="flex-none rounded shadow-lg bg-white ">
                    <div className="bg-blue-ovh-light h-1 rounded-t" />
                    <div className="font-bold py-3 border-b">
                        {TableHeader(
                            this.tableName,
                            this.state.isOpen,
                            this.onVisibilityChange
                        )}
                    </div>
                    {this.state.isOpen && <div>{this.props.children}</div>}
                </div>
            );
        } else
            return (
                <div className="py-1 border-b">
                    <div>
                        {TableHeader(
                            this.tableName,
                            this.state.isOpen,
                            this.onVisibilityChange
                        )}
                    </div>
                    {this.state.isOpen && <div>{this.props.children}</div>}
                </div>
            );
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
    );
}

function TableTestNameUserArgsValue() {
    return (
        <div className="px-5 text-xs mx-4 mb-2 bg-gray-100 rounded p-2">
            {"> Not available yet..."}
        </div>
    );
}

function GetDataTestOutput(data: any) {
    return (
        <div
            flex-none
            className="px-5 text-xs overflow-y-auto max-h-64 mx-4 mb-2 bg-gray-100 rounded whitespace-pre-wrap"
        >
            {JSON.stringify(data, null, "\t")}
        </div>
    );
}

function TableTestCsvValue() {
    return (
        <div
            flex-none
            className="px-5 text-s  text-blue-ovh-light underline hover:text-blue-ovh-dark "
        >
            <a href="https://guigui.io/">Download all as tar.gz</a>
        </div>
    );
}

//Function to show data from FIO read section into a datasheet on the interface
function TableRWOverview(data: any, rw: string) {
    const percentileData = GetDataClatPercentile(data, rw);
    const readData = data["jobs"][0][rw];

    const io = (readData["io_kbytes"] / 1000).toFixed(2) + "MB";
    const bw = (readData["bw"] / 1000).toFixed(2) + "MB/s";
    const iops = readData["iops"].toFixed(2);
    const runtime =
        Math.trunc(readData["runtime"] / 3600000) +
        "h " +
        Math.trunc((readData["runtime"] / 60000) % 60) +
        "m " +
        ((readData["runtime"] / 1000) % 60).toFixed(0) +
        "s";

    const slat = readData["slat_ns"];
    const clat = readData["clat_ns"];
    const lat = readData["lat_ns"];

    const slat_min = (slat["min"] / 1000000).toFixed(3) + " ms";
    const slat_max = (slat["max"] / 1000000).toFixed(3) + " ms";
    const slat_mean = (slat["mean"] / 1000000).toFixed(3) + " ms";
    const slat_stdev = (slat["stddev"] / 1000000).toFixed(3) + " ms";
    const clat_min = (clat["min"] / 1000000).toFixed(3) + " ms";
    const clat_max = (clat["max"] / 1000000).toFixed(3) + " ms";
    const clat_mean = (clat["mean"] / 1000000).toFixed(3) + " ms";
    const clat_stdev = (clat["stddev"] / 1000000).toFixed(3) + " ms";
    const lat_min = (lat["min"] / 1000000).toFixed(3) + " ms";
    const lat_max = (lat["max"] / 1000000).toFixed(3) + " ms";
    const lat_mean = (lat["mean"] / 1000000).toFixed(3) + " ms";
    const lat_stdev = (lat["stddev"] / 1000000).toFixed(3) + " ms";

    const bw_min = (readData["bw_min"] / 1000).toFixed(2) + " MB/s";
    const bw_max = (readData["bw_max"] / 1000).toFixed(2) + " MB/s";
    const bw_mean = (readData["bw_mean"] / 1000).toFixed(2) + " MB/s";
    const bw_stdev = (readData["bw_dev"] / 1000).toFixed(2) + " MB/s";
    const bw_agg = readData["bw_agg"].toFixed(2) + " %";

    let clatPercentileClassName =
        "grid grid-flow-col grid-cols-" + percentileData.length + "grid-rows-2";

    const clatPercentileGrid = <div>OK</div>;

    return (
        <div className="">
            <div className="grid grid-flow-col grid-cols-4 grid-rows-2 text-sm divide-y divide-x text-center">
                <div>Io</div>
                <div>{io}</div>
                <div>Bandwidth</div>
                <div>{bw}</div>
                <div>Iops</div>
                <div>{iops}</div>
                <div>Runtime</div>
                <div>{runtime}</div>
            </div>

            <div className="p-2 grid grid-flow-col grid-cols-5 grid-rows-4 text-sm  divide-y divide-x text-center">
                <div></div>
                <div>Submission Latency</div>
                <div>Competion Latency</div>
                <div>Latency</div>
                <div>Min</div>
                <div>{slat_min}</div>
                <div>{clat_min}</div>
                <div>{lat_min}</div>
                <div>Max</div>
                <div>{slat_max}</div>
                <div>{clat_max}</div>
                <div>{lat_max}</div>
                <div>Mean</div>
                <div>{slat_mean}</div>
                <div>{clat_mean}</div>
                <div>{lat_mean}</div>
                <div>Standard Deviation</div>
                <div>{slat_stdev}</div>
                <div>{clat_stdev}</div>
                <div>{lat_stdev}</div>
            </div>
            <div className="text-lg text-center">Bandwidth</div>
            <div className=" grid grid-flow-col grid-cols-5 grid-rows-2 text-sm divide-y divide-x text-center">
                <div>Min</div>
                <div>{bw_min}</div>
                <div>Max</div>
                <div>{bw_max}</div>
                <div>Mean</div>
                <div>{bw_mean}</div>
                <div>Standard Deviation</div>
                <div>{bw_stdev}</div>
                <div>Percentage</div>
                <div>{bw_agg}</div>
            </div>

            <div className={clatPercentileClassName}></div>
        </div>
    );
}

function TableCPU(data: any) {
    const jobData = data["jobs"][0];
    const cpu_usr = jobData["usr_cpu"] + " %";
    const cpu_sys = jobData["sys_cpu"] + " %";
    const cpu_ctx = jobData["ctx"];
    const cpu_majf = jobData["majf"];
    const cpu_minf = jobData["minf"];

    return (
        <div>
            <div className="grid grid-flow-col grid-cols-2 grid-rows-5 text-sm divide-y divide-x text-center">
                <div>User</div>
                <div>System</div>
                <div>Context Switches</div>
                <div>Major Fault</div>
                <div>Minor Fault</div>
                <div>{cpu_usr}</div>
                <div>{cpu_sys}</div>
                <div>{cpu_ctx}</div>
                <div>{cpu_majf}</div>
                <div>{cpu_minf}</div>
            </div>
        </div>
    );
}

//Function which limits the colors used in the graph lines
function RandomColor() {
    return randomColor({
        luminosity: "bright",
        hue: "random",
    });
}

type ClatPercentileType = {
    clat_percentile: string;
    value: number;
};

//Function to transform data from FIO into usable data array in Graph for clat percentile
function GetDataClatPercentile(data: any, rw: string) {
    const percentileData = data["jobs"][0][rw]["clat_ns"]["percentile"];

    let formatedData: ClatPercentileType[] = [];

    for (const key in percentileData) {
        formatedData.push({
            clat_percentile: Number.parseFloat(key).toString(),
            value: percentileData[key].toPrecision(3) / 1000000,
        });
    }
    // console.log(formatedData);
    return formatedData;
}

type IODepthType = {
    io_depth: string;
    value: number;
};

//Function to transform data from FIO into usable data array in Graph for IO Depth
function GetDataIODepth(data: any) {
    const Data = data["jobs"][0]["iodepth_level"];

    let formatedData: IODepthType[] = [];

    for (const key in Data) {
        formatedData.push({
            io_depth: key,
            value: Data[key].toPrecision(3),
        });
    }
    // console.log(formatedData);
    return formatedData;
}

type LatencyType = {
    latency: number;
    value: number;
};

//Function to transform data from FIO into usable data array in Graph for latency percentile
function GetDataLatency(data: any) {
    const DataUs = data["jobs"][0]["latency_us"];
    const DataMs = data["jobs"][0]["latency_ms"];

    let formatedData: LatencyType[] = [];

    for (const key in DataUs) {
        formatedData.push({
            latency: +key / 1000,
            value: DataUs[key].toPrecision(4),
        });
    }

    for (const key in DataMs) {
        formatedData.push({
            latency: +key,
            value: DataMs[key].toPrecision(3),
        });
    }

    // console.log(formatedData);
    return formatedData;
}

//Array in which the colors, names, and activation of the jobs are stored
type testListType = {
    id: string;
    color: string;
    activated: boolean;
};
const testList: testListType[] = [
    { id: "average", color: "blue", activated: true },
    { id: "uv", color: RandomColor(), activated: true },
    { id: "pv", color: RandomColor(), activated: true },
    { id: "amt", color: RandomColor(), activated: true },
];

const ClatPercentileList: testListType[] = [
    { id: "value", color: "blue", activated: true },
];

const LatencyPercentileList: testListType[] = [
    { id: "value", color: "blue", activated: true },
];

const IODepthList: testListType[] = [
    { id: "value", color: "blue", activated: true },
];

//Define the Table Jobs Content
class TableJobs extends Component {
    state: {
        data: unknown[];
        activatedValue: testListType[];
    };

    constructor(props: any) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return { data: testData, activatedValue: testList };
    }

    handleOnChange(id: string) {
        let newActivatedValue: testListType[] = this.state.activatedValue;
        newActivatedValue
            .filter((obj) => obj.id === id)
            .map((obj) => (obj.activated = !obj.activated));
        this.setState({ ...this.state, activatedValue: newActivatedValue });
    }

    render() {
        return (
            <div className="grid grid-cols-4 auto-layout">
                <div className="col-span-1 border-r-2 p-2">
                    {this.state.activatedValue.map((test) => {
                        return (
                            <div>
                                <input
                                    id={test.id}
                                    checked={test.activated}
                                    type="checkbox"
                                    className="rounded ml-2 mr-2"
                                    onChange={this.handleOnChange.bind(
                                        this,
                                        test.id
                                    )}
                                />
                                <label
                                    style={{ color: test.color }}
                                    htmlFor={test.id}
                                >
                                    {test.id}
                                </label>
                            </div>
                        );
                    })}
                </div>
                <div className="col-span-3">
                    <Graph
                        testList={this.state.activatedValue}
                        data={this.state.data}
                        xTickCount={this.state.data.length / 10 + 2}
                        xType="number"
                        xDatakey="name"
                        title="Bandwidth"
                        xLabel="t[s]"
                        yLabel="MB/s"
                    />
                    <Graph
                        testList={this.state.activatedValue}
                        data={this.state.data}
                        xTickCount={this.state.data.length / 10 + 2}
                        xType="number"
                        xDatakey="name"
                        title="IOPS"
                        xLabel="t[s]"
                        yLabel="iops"
                    />
                    <Graph
                        testList={this.state.activatedValue}
                        data={this.state.data}
                        xTickCount={this.state.data.length / 10 + 2}
                        xType="number"
                        xDatakey="name"
                        title="Latency"
                        xLabel="t[s]"
                        yLabel="ms"
                    />
                    <Graph
                        testList={this.state.activatedValue}
                        data={this.state.data}
                        xTickCount={this.state.data.length / 10 + 2}
                        xType="number"
                        xDatakey="name"
                        title="Submission Latency"
                        xLabel="t[s]"
                        yLabel="ms"
                    />
                    <Graph
                        testList={this.state.activatedValue}
                        data={this.state.data}
                        xTickCount={this.state.data.length / 10 + 2}
                        xType="number"
                        xDatakey="name"
                        title="Completion Latency"
                        xLabel="t[s]"
                        yLabel="ms"
                    />
                    <div className="p-5" />
                </div>
            </div>
        );
    }
}

//Graph defines the different graphs in the Result details interface
type GraphProps = {
    title?: string;
    xLabel: YAxisProps["label"];
    yLabel: YAxisProps["label"];
    xDatakey: string;
    data: any; // FIXME
    testList: any; // FIXME
    valueOnGraph?: boolean;
    xTickCount?: number;
    xType?: any;
    //domainMax: number;
};

function Graph(props: GraphProps) {
    var valueOnGraph = props.valueOnGraph || false;
    return (
        <div className="h-60 p-5">
            <div className="text-lg text-center">{props.title}</div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={props.data}
                    margin={{
                        top: 15,
                        right: 15,
                        left: 10,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey={props.xDatakey}
                        type={props.xType || "category"}
                        tickCount={props.xTickCount || 5}
                        allowDecimals={true}
                        label={{ value: props.xLabel, position: "bottom" }}
                    />
                    <YAxis
                        label={{
                            value: props.yLabel,
                            angle: -90,
                            position: "left",
                        }}
                    />
                    <Tooltip />
                    {props.testList.map((testName: any) => {
                        if (testName.activated) {
                            return (
                                <Line
                                    type="linear"
                                    dataKey={testName.id}
                                    stroke={testName.color}
                                    activeDot={{ r: 5 }}
                                >
                                    {valueOnGraph ? (
                                        <LabelList
                                            dataKey={testName.id}
                                            position="top"
                                            offset={10}
                                            className="text-xs"
                                        />
                                    ) : (
                                        ""
                                    )}
                                </Line>
                            );
                        }
                    })}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
