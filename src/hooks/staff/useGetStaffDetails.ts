import { StaffDetailsResponseDto } from "@/types/staff.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";

const getStaffDetails = async (
  id: string
): Promise<StaffDetailsResponseDto> => {
  const { data } = await Axios.get(endpoints.staff + `/${id}`);
  return data;
};

const useGetStaffDetails = (id: string) => {
  return useQuery({
    queryKey: ["get-staff-details", id],
    queryFn: getStaffDetails.bind(null, id),
  });
};

export default useGetStaffDetails;
