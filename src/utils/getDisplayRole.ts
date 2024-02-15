import { StaffRole } from "@/lib/enums";

const getDisplayRole = (role: StaffRole): string => {
  switch (role) {
    case StaffRole.SuperAdmin:
      return "Super Admin";
    case StaffRole.Admin:
      return "Admin";
    default:
      return "Unknown";
  }
};

export default getDisplayRole;
