import React from "react";
import PropTypes from "prop-types";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { ChartCanvas, Chart, ZoomButtons } from "react-stockcharts";
import { BarSeries, CandlestickSeries, LineSeries, RSISeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } from "react-stockcharts/lib/coordinates";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {OHLCTooltip, RSITooltip} from "react-stockcharts/lib/tooltip";
import { ema, rsi } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";
import { last } from "react-stockcharts/lib/utils";

const dateFormat = timeFormat("%Y-%m-%d");
const numberFormat = format(".4f");

function tooltipContent() {
	return ({ currentItem, xAccessor }) => {
		return {
			x: dateFormat(xAccessor(currentItem)),
			y: [
				{
					label: "open",
					value: currentItem.open && numberFormat(currentItem.open)
				},
				{
					label: "high",
					value: currentItem.high && numberFormat(currentItem.high)
				},
				{
					label: "low",
					value: currentItem.low && numberFormat(currentItem.low)
				},
				{
					label: "close",
					value: currentItem.close && numberFormat(currentItem.close)
				}
			]
		};
	};
}

export class CandleStickChartWithZoomPan extends React.Component {
	constructor(props) {
		super(props);
		this.saveNode = this.saveNode.bind(this);
		this.resetYDomain = this.resetYDomain.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}
	componentWillMount() {
		this.setState({
			suffix: 1
		});
	}
	saveNode(node) {
		this.node = node;
	}
	resetYDomain() {
		this.node.resetYDomain();
	}
	handleReset() {
		this.setState({
			suffix: this.state.suffix + 1
		});
	}
	render() {
		const ema26 = ema()
			.id(0)
			.options({ windowSize: 26 })
			.merge((d, c) => {d.ema26 = c;})
			.accessor(d => d.ema26);

		const rsiCalculator = rsi()
			.options({ windowSize: 21 })
			.merge((d, c) => {d.rsi = c;})
			.accessor(d => d.rsi);

		const { type, width, ratio } = this.props;
		const { mouseMoveEvent, panEvent, zoomEvent, zoomAnchor } = this.props;
		const { clamp } = this.props;

		const { data: initialData } = this.props;

		const calculatedData = ema26(rsiCalculator(initialData));
		const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(calculatedData);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];

		const margin = { left: 70, right: 70, top: 20, bottom: 30 };
		const height = 600;
		const gridHeight = height - margin.top - margin.bottom;
		const gridWidth = width - margin.left - margin.right;

		const showGrid = false;
		const yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 } : {};
		const xGrid = showGrid ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 } : {};

		return (
			<ChartCanvas ref={this.saveNode} height={height}
				ratio={ratio}
				width={width}
				margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
				mouseMoveEvent={mouseMoveEvent}
				panEvent={panEvent}
				zoomEvent={zoomEvent}
				clamp={clamp}
				zoomAnchor={zoomAnchor}
				type={type}
				seriesName={`MSFT_${this.state.suffix}`}
				data={data}
				xScale={xScale}
				xExtents={xExtents}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor} >

				<Chart id={1} height={400}
					yExtents={[d => [d.high, d.low], ema26.accessor()]}
					padding={{ top: 10, bottom: 20 }} >
					<XAxis axisAt="bottom" orient="bottom" zoomEnabled={zoomEvent} {...xGrid} />
					<YAxis axisAt="right" orient="right" ticks={5} zoomEnabled={zoomEvent} {...yGrid} />

					<MouseCoordinateY at="right" orient="right" displayFormat={format(".2f")} />
					<CandlestickSeries />
					<LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()}/>
					<OHLCTooltip origin={[-40, 0]}/>
					<ZoomButtons onReset={this.handleReset} />
					<HoverTooltip tooltipContent={tooltipContent()} fontSize={15} />
				</Chart>

				<Chart id={2} yExtents={d => d.volume}
					   height={150}
					   origin={(w, h) => [0, h - 310]} >
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")} zoomEnabled={zoomEvent} />
					<MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY at="left" orient="left" displayFormat={format(".4s")} />
					<BarSeries yAccessor={d => d.volume} fill={(d) => d.close > d.open ? "#6BA583" : "#FF0000"} />
				</Chart>

				<Chart id={3} yExtents={[0, 100]}
					   height={200}
					   origin={(w, h) => [0, h-100]}
					   padding={{ top: 10, bottom: 10 }} >
					<XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} />
					<YAxis axisAt="right" orient="right" tickValues={[30, 50, 70]} />
					<MouseCoordinateY at="right" orient="right" displayFormat={format(".2f")} />
					<RSISeries yAccessor={d => d.rsi} />
					<RSITooltip origin={[-38, 15]} yAccessor={d => d.rsi} options={rsiCalculator.options()} />
				</Chart>

				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}

CandleStickChartWithZoomPan.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	//type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
	type: "svg",
};

CandleStickChartWithZoomPan.defaultProps = {
	type: "svg",
	mouseMoveEvent: true,
	panEvent: true,
	zoomEvent: true,
	clamp: false,
};

CandleStickChartWithZoomPan = fitWidth(CandleStickChartWithZoomPan);