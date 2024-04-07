"use client";

import React from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { getCookie, hasCookie } from "cookies-next";
import { DARK_THEME } from "@/lib/constants";

type MonthlyOrderChartProps = {
  dataList: number[];
  labels: string[];
};

const MonthlyOrderChart: React.FC<MonthlyOrderChartProps> = ({
  labels,
  dataList,
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const options: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        grid: {
          tickLength: 8,
          drawOnChartArea: false,
        },
        ticks: {
          font: {
            size: 14,
            weight: "normal",
          },
        },
      },
      y: {
        grid: {
          drawOnChartArea: true,
        },
        ticks: {
          callback: (label) => {
            if (Math.floor(Number(label)) === label) {
              return label;
            }
          },
        },
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        color:
          hasCookie("theme") && getCookie("theme") === DARK_THEME
            ? "#a6adbb"
            : "#161616",
        display: true,
        text: `Orders in ${dayjs(new Date()).format("MMMM")}`,
        align: "start",
        padding: {
          bottom: 30,
        },
        font: {
          size: 18,
          weight: "bold",
        },
      },
      tooltip: {
        padding: 16,
        titleMarginBottom: 8,
        boxPadding: 8,
        callbacks: {
          title(tooltipItems): string | string[] | void {
            const date = new Date();
            return dayjs(
              new Date(
                date.getFullYear(),
                date.getMonth(),
                +tooltipItems[0].label
              )
            ).format("MMMM DD");
          },
        },
      },
    },
  };

  const data: ChartJS<"line">["data"] = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: "Orders",
        data: dataList,
        borderColor:
          hasCookie("theme") && getCookie("theme") === DARK_THEME
            ? "#7480ff"
            : "#45AEEE",
        borderWidth: 2,
        pointBackgroundColor:
          hasCookie("theme") && getCookie("theme") === DARK_THEME
            ? "#7480ff"
            : "#45AEEE",
        backgroundColor: (context) => {
          const bgColor = [
            hasCookie("theme") && getCookie("theme") === DARK_THEME
              ? "rgba(29,35,42,0.7)"
              : "rgba(255, 255, 255, 0.7)",
            "rgba(91, 143, 249, 0.2)",
          ];
          if (!context.chart.chartArea) return;
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradient = ctx.createLinearGradient(0, bottom, 1, top);
          gradient.addColorStop(0, bgColor[0]);
          gradient.addColorStop(1, bgColor[1]);
          return gradient;
        },
      },
    ],
  };

  return (
    <div className={"w-full mt-4"}>
      <Line
        data={data}
        options={options}
        width={990}
        height={400}
        className={"ml-2 mr-8"}
      />
    </div>
  );
};

export default MonthlyOrderChart;
