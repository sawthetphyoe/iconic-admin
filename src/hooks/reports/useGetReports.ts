import { ReportsResponseDto } from "@/types/reports.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";

const getReports = async (): Promise<ReportsResponseDto> => {
  const { data } = await Axios.get(endpoints.reports);
  return data;
};

const useGetReports = () =>
  useQuery({
    queryKey: ["get-reports"],
    queryFn: getReports,
  });

export default useGetReports;
